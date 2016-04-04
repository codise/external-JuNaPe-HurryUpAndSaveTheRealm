'use strict';

function RoundManager(game, bulletManager, enemyManager, weaponManager, effectManager, powerupManager)
{

var self = this;

// Variables related to managing game mechanics

var players = {};
var playerGroup = game.add.group();
playerGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
playerGroup.enableBody = true;

var scoreTable = [];
var scoreText = game.add.text(game.camera.x + 16, game.camera.y + 16, '', { fontSize: '32px', fill: '#000' });

var roundRunning = false;

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
self.lastRoomTimeout = 300000; //300s
self.lastRoomTimer = 0;


self.loadRound = function (roundData)
	{

	// Set camera in the middle of the stage
	game.camera.x = game.world.width/2 - game.camera.width/2;
	game.camera.y = game.world.height/2 - game.camera.height/2;

	currentRound = round3;

	rooms[0] = null;

	// Load first two rooms;
	for (var i = 0; i < Math.min(2, currentRound.length); i++)
		{
		rooms[i + 1] = new Room(game,
														currentRound[i].roomBg,
														currentRound[i].tileset,
														currentRound[i].roomJSON,
														currentRound[i].moveDirection,
														currentRound[i].moveSpeed);
		rooms[i + 1].preload(instantiateRound);
		}

	nextRoom = 2;

	};

var instantiateRound = function ()
	{

	// Position the two loaded rooms correctly

	rooms[1].moveTo(game.camera.x, game.camera.y);
	switch (rooms[1].moveDirection)
		{
		case "north":
			rooms[2].moveTo(game.camera.x, game.camera.y - game.camera.height);
			break;
		case "east":
			rooms[2].moveTo(game.camera.x + game.camera.width, game.camera.y);
			break;
		case "south":
			rooms[2].moveTo(game.camera.x, game.camera.y + game.camera.height);
			break;
		case "west":
			rooms[2].moveTo(game.camera.x - game.camera.width, game.camera.y);
		default:
			rooms[2] = null;
		}
	startRound();
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
	players[id] = new Player(game, game.camera.x + game.camera.width/2, game.camera.y + game.camera.height/2, bulletManager, id, weaponManager, effectManager);
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
	bulletManager.playerBulletGroups.forEach(function (whatToBring) { game.world.bringToTop(whatToBring) }, this);
	bulletManager.enemyBulletGroups.forEach(function (whatToBring) { game.world.bringToTop(whatToBring) }, this);
	scoreText.bringToTop();

	updateScore();

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
			game.physics.arcade.collide(bulletManager.playerBulletGroups[i], playerGroup);
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
														currentRound[nextRoom].roomBg,
														currentRound[nextRoom].tileset,
														currentRound[nextRoom].roomJSON,
														currentRound[nextRoom].moveDirection,
														currentRound[nextRoom].moveSpeed);
				rooms[2].preload(instantiateNewRoom)
				lastPaused = game.time.now + pauseTime;
				nextRoom++;
				} else
				{
				var bossPos = new Phaser.Point(); // TODO hae positio huoneesta, lisää huoneeseen bossin positio
				bossPos.x = game.camera.x + game.camera.width*3/4
				bossPos.y = game.camera.y + game.camera.height/2
				//enemyManager.createBoss('tentacle', rooms[1].bossPos);
				enemyManager.createBoss('tentacle', bossPos);
				self.lastRoomTimer = game.time.now + self.lastRoomTimeout;
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
			rooms[2].moveTo(game.camera.x, game.camera.y + game.camera.height);
			break;
		case "west":
			rooms[2].moveTo(game.camera.x - game.camera.width, game.camera.y);
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

