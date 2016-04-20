'use strict';

function RoundManager(game, bulletManager, enemyManager, weaponManager, powerupManager)
{

var self = this;

// Variables related to managing game mechanics

var players = {};
var playerGroup = game.add.group();
playerGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
playerGroup.enableBody = true;

var minPlayerSpawnDistance = 10;

var scoreTable = [];
var scoreText = game.add.text(game.camera.x + 16, game.camera.y + 16, '', { fontSize: '32px', fill: '#000' });

var roundRunning = false;

var qr = game.add.image(game.camera.x + game.camera.width, game.camera.y + game.camera.height, 'qr_niko'); //or: 'qr_janika'
qr.scale.x = 0.5*scalingFactors.x;
qr.scale.y = 0.5*scalingFactors.y;
qr.anchor.setTo(1,1);

var fpsText = game.add.text(game.camera.x, game.camera.y + game.camera.height, '', { fontSize: '12px', fill: '#f00'});
fpsText.anchor.setTo(0, 1);
fpsText.stroke = '#000000';
fpsText.strokeThickness = 1;

// Variables related to map functioning

var currentRound;
var currentDirection;
var currentSpeed;
var rooms = [];
var roomGroup = game.add.group();
var nextRoom;


var lastPaused = 0;
var pauseTime = 500;

var speedDict = [];
speedDict["slow"] = 0.25;
speedDict["normal"] = 0.5;
speedDict["fast"] = 1;
speedDict["stop"] = null;

self.roundOver = false;
self.lastRoomTimeout = 600000; //600s
self.lastRoomTimer = 0;



self.loadRound = function (roundData)
	{

	// Set camera in the middle of the stage
	game.camera.x = Math.floor(game.world.width/2 - game.camera.width/2);
	game.camera.y = Math.floor(game.world.height/2 - game.camera.height/2);
	currentRound = roundData;

	rooms[0] = null;

	// Load first two rooms;
	for (var i = 0; i < Math.min(2, currentRound.rooms.length); i++)
		{
		rooms[i + 1] = new Room(game,
														currentRound.rooms[i].roomBg,
														currentRound.rooms[i].tileset,
														currentRound.rooms[i].roomJSON,
														currentRound.rooms[i].moveDirection,
														currentRound.rooms[i].moveSpeed);
		rooms[i + 1].preload(instantiateRound);
		}

	nextRoom = 2;
	};

var instantiateRound = function ()
	{

	// Position the two loaded rooms correctly
	if (rooms[2] != undefined)
		{
		rooms[1].moveTo(game.camera.x, game.camera.y);
		switch (rooms[1].moveDirection)
			{
			case "north":
				rooms[2].moveTo(game.camera.x, game.camera.y, - game.camera.height);
				break;
			case "east":
				rooms[2].moveTo(game.camera.x + game.camera.width, game.camera.y);
				break;
			case "south":
				rooms[2].moveTo(game.camera.x, game.camera.y + game.camera.height);
				break;
			case "west":
				rooms[2].moveTo(game.camera.x - game.camera.width, game.camera.y);
				break;
			default:
				rooms[2] = null;
			}
		startRound();
		}
	};

var startRound = function ()
	{
	roundRunning = true;
	currentDirection = rooms[1].moveDirection;
	currentSpeed = rooms[1].moveSpeed;

	};

// Client data parsing

self.setPlayerInput = function (id, input)
	{
	if (players[id] != undefined)
		{
		players[id].setInput(input);
		}
	};
	
self.newPlayer = function (id)
	{
	var spawnPosition = getPosMinDPlayers(game, players, minPlayerSpawnDistance, null);
	game.effectManager.createSpawnEffect(spawnPosition);
	players[id] = new Player(game, spawnPosition.x, spawnPosition.y, bulletManager, id, weaponManager, enemyManager);
	players[id].sprite.scale.x = scalingFactors.x;
	players[id].sprite.scale.y = scalingFactors.y;
	playerGroup.add(players[id].sprite);
	};

self.disconnectPlayer = function (id)
	{
	if (players[id] != undefined)
		{
		playerGroup.remove(players[id].sprite);
		players[id].kill();
		//players[id] = undefined;
		delete players[id];
		// ^ deletes also key from obj list so no key in this list points to undefined when people disconnect
		}
	};

// Functions that manage game mechanics

self.update = function ()
	{

	game.world.bringToTop(playerGroup);
	game.world.bringToTop(enemyManager.enemyGroup);
	game.world.bringToTop(powerupManager.pUpGroup);
	game.world.bringToTop(weaponManager.weaponGroup);
	bulletManager.playerBulletGroups.forEach(function (whatToBring) { game.world.bringToTop(whatToBring) }, this);
	bulletManager.enemyBulletGroups.forEach(function (whatToBring) { game.world.bringToTop(whatToBring) }, this);
	scoreText.bringToTop();

	var popUpList = game.effectManager.popUpList;
	for(var i = 0; i < popUpList.length; i++)
		{
		popUpList[i].bringToTop();
		}
	updateScore();

	qr.bringToTop();
	qr.position.setTo(game.camera.x + game.camera.width, game.camera.y + game.camera.height);

	fpsText.bringToTop();
	fpsText.text = ' FPS: ' + game.time.fps + '\n now.elapsed: ' + game.time.elapsed + 'ms\n time.elapsed: ' + game.time.elapsedMS + 'ms';
	fpsText.position.setTo(game.camera.x, game.camera.y + game.camera.height);


	if (roundRunning && lastPaused < game.time.now && !self.roundOver)
		{
		bulletManager.update();

		for (var id in players)
			{
			if (players[id] != undefined)
				{
				players[id].update();
				}
			}

		enemyManager.update(players);
		powerupManager.update(playerGroup);

		game.physics.arcade.collide(playerGroup);
		game.physics.arcade.collide(enemyManager.enemyGroup);
		game.physics.arcade.collide(playerGroup, enemyManager.enemyGroup);

		for (var i = 0; i < bulletManager.playerBulletGroups.length; i++)
			{
			//game.physics.arcade.collide(bulletManager.playerBulletGroups[i], playerGroup);
			game.physics.arcade.collide(bulletManager.playerBulletGroups[i], enemyManager.enemyGroup);
			}

		updateRoomMovement();
		if(self.lastRoomTimer > 0)
			{
			if (self.lastRoomTimer < game.time.now)
				{
				self.roundOver = true;
				}
			}
		} 

	};

var updateRoomMovement = function ()
	{
	rooms.forEach(function (room, index, array) { if (room != undefined && !room.onceScaled) { room.updateScaling(); } });

	if (speedDict[currentSpeed] != undefined)
		{
		// Figure out which speed to go
		
		var curSpeed = speedDict[currentSpeed];

		// Figure out in which direction to move rooms

		var changeInPos;
		switch (currentDirection)
			{
			case "north":
				changeInPos = {"x": 0, "y": -curSpeed};
				break;
			case "east":
				changeInPos = {"x": curSpeed, "y": 0};
				break;
			case "south":
				changeInPos = {"x": 0, "y": curSpeed};
				break;
			case "west":
				changeInPos = {"x": -curSpeed, "y": 0};
				break;
			default:
				console.log("something went awry");
			}


		for (var i = 0; i < rooms.length; i++)
			{
			game.camera.x += changeInPos.x;
			game.camera.y += changeInPos.y;
			}

		// Check if next room has passed the game.camera, if it has, align it with camera, load new room etc.
		if (rooms[2] != undefined)
			{

			if (Math.abs(rooms[2].getPos().x - game.camera.x) <= Math.abs(changeInPos.x) &&
					Math.abs(rooms[2].getPos().y - game.camera.y) <= Math.abs(changeInPos.y))
				{
				rooms.shift();
				delete rooms[0];

				rooms[1].moveTo(game.camera.x, game.camera.y);

				currentDirection = rooms[1].moveDirection;
				currentSpeed = rooms[1].moveSpeed;

				if (speedDict[currentSpeed] != undefined)
					{
					rooms[2] = new Room(game,
															currentRound.rooms[nextRoom].roomBg,
															currentRound.rooms[nextRoom].tileset,
															currentRound.rooms[nextRoom].roomJSON,
															currentRound.rooms[nextRoom].moveDirection,
															currentRound.rooms[nextRoom].moveSpeed);
					rooms[2].preload(instantiateNewRoom)
					lastPaused = game.time.now + pauseTime;
					nextRoom++;
					} else
					{

					var lastMovedDirection = 'null';
					if(currentRound.rooms[currentRound.rooms.length-2] != undefined)
						{
						lastMovedDirection = currentRound.rooms[currentRound.rooms.length-2].moveDirection;
						}

					var bossPos = new Phaser.Point();
					switch (lastMovedDirection)
						{
						case "north":
							bossPos.x = game.camera.x + game.camera.width/2
							bossPos.y = game.camera.y + game.camera.height*1/4
							break;
						case "east":
							bossPos.x = game.camera.x + game.camera.width*3/4
							bossPos.y = game.camera.y + game.camera.height/2
							break;
						case "west":
							bossPos.x = game.camera.x + game.camera.width*1/4
							bossPos.y = game.camera.y + game.camera.height/2
							break;
						case "south":
							bossPos.x = game.camera.x + game.camera.width/2
							bossPos.y = game.camera.y + game.camera.height*3/4
							break;
						default:
							bossPos.x = game.camera.x + game.camera.width/2
							bossPos.y = game.camera.y + game.camera.height/2
						}
					//enemyManager.createBoss('tentacle', bossPos);
					enemyManager.createBoss(currentRound.boss, bossPos);
					self.lastRoomTimer = game.time.now + self.lastRoomTimeout;
					}
				}
			}
		}
	};

var instantiateNewRoom = function ()
	{
	switch (rooms[1].moveDirection)
    {
    case "north":
      rooms[2].moveTo(game.camera.x, game.camera.y - game.camera.height);
      break;
    case "east":
      rooms[2].moveTo(game.camera.x + game.camera.width, game.camera.y);
      break;
    case "south":
      rooms[2].moveTo(game.camera.x, game.camera.y+ game.camera.height);
      break;
    case "west":
      rooms[2].moveTo(game.camera.x - game.camera.width, game.camera.y);
      break;
    default:
      rooms[2] = null;
    }
	};

var updateScore = function ()
	{
	scoreTable = [];	
	for (var i in players)
		{
		if (players[i] != undefined && game.playerList[players[i].id] != undefined)
			{
			scoreTable.push({"id": players[i].id, "name": players[i].playerName, "score": players[i].score, "totalScore": game.playerList[players[i].id].totalScore});
			}
		}
	scoreTable = scoreTable.sort(function (scoreEntryA, scoreEntryB) { return scoreEntryB.score - scoreEntryA.score; })
	scoreText.text = scoreTableToText(scoreTable);
	scoreText.position.x = game.camera.x + 16;
	scoreText.position.y = game.camera.y + 16;
	};

var scoreTableToText = function (scoreTable)
	{
	var text = '';

	for (var i in scoreTable)
		{
		if (scoreTable[i].name != undefined)
			{
			text += scoreTable[i].name + " :: " + scoreTable[i].score + " / " + scoreTable[i].totalScore + "\n";
			}
		}
	return text;
	};

self.getScoreTable = function ()
	{
	return scoreTable;
	};
	

}

