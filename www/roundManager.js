'use strict';

function RoundManager (game)
{

var self = this;

// Variables related to managing game mechanics

var players = {};
var playerGroup = game.add.group();
playerGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
playerGroup.enableBody = true;

var bulletManager = new BulletManager(game);
var enemyManager = new EnemyManager(game, bulletManager);

var roundRunning = false;

// Variables related to map functioning

var camera = game.camera;
var currentRound;
var currentDirection;
var currentSpeed;
var rooms = [];
var roomGroup = game.add.group();
var nextRoom;

var speedDict = [];
speedDict["slow"] = 10;
speedDict["normal"] = 100;
speedDict["fast"] = 1000;
speedDict["stop"] = 0;


self.loadRound = (roundData) =>
	{
		// Set camera in the middle of the stage
		camera.x = game.world.width;
		camera.y = game.world.height;

		currentRound = round1;

		rooms[0] = null;

		// Load first two rooms;
		for (var i = 0; i < Math.min(2, currentRound.length); i++)
		{
			rooms[i + 1] = new Room(game, currentRound[i].roomBg, currentRound[i].tileset, currentRound[i].roomJSON, currentRound[i].moveDirection, currentRound[i].moveSpeed);
			rooms[i + 1].preload();
			setTimeout(rooms[i + 1].create(), 1000000000);
		}

		nextRoom = 2;

		// Position the two loaded rooms correctly

		rooms[1].moveTo(camera.x, camera.y);
		switch (rooms[1].moveDirection)
		{
			case "north":
				rooms[2].moveTo(camera.x, camera.y - game.world.height);
				break;
			case "east":
				rooms[2].moveTo(camera.x + game.world.width, camera.y);
				break;
			case "south":
				rooms[2].moveTo(camera.x, camera.y + game.world.height);
				break;
			case "west":
				rooms[2].moveTo(camera.x - game.world.width, camera.y);
			default:
				console.log("something as gone awry");
		}
	};

self.startRound = () =>
	{
		roundRunning = true;
		currentDirection = rooms[1].moveDirection;
		currentSpeed = rooms[1].moveSpeed;

	};

// Client data parsing

self.setPlayerInput = (id, input) =>
	{
		if (players[id] != undefined)
		{
			players[id].setInput(input);
		}
	};

self.newPlayer = (id) =>
	{
		players[id] = new Player(game, (camera.x + camera.width) / 2, (camera.y + camera.height) / 2, bulletManager, id);
		playerGroup.add(players[id].playerSprite);
	};

self.disconnectPlayer = (id) =>
	{
		if (players[id] != undefined)
		{
			playerGroup.remove(players[id].playerSprite);
			players[id].kill();
			players[id] = undefined;
		}
	};

// Functions that manage game mechanics

self.update = () =>
	{
		if (roundRunning)
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

			game.physics.arcade.collide(playerGroup);
			game.physics.arcade.collide(enemyManager.enemyGroup);
			game.physics.arcade.collide(playerGroup, enemyManager.enemyGroup);

			for (var i = 0; i < bulletManager.playerBulletGroups.length; i++)
			{
				game.physics.arcade.collide(bulletManager.playerBulletGroups[i], playerGroup);
				game.physics.arcade.collide(bulletManager.playerBulletGroups[i], enemyManager.enemyGroup);
			}
		}

	};

var updateRoomMovement = () =>
	{
		if (currentSpeed != undefined)
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
				if (rooms[i] != undefined)
				{
					rooms[i].moveBy(changeInPos.x, changeInPos.y);
				}
			}

			// Check if next room has passed the camera, if it has, align it with camera, load new room etc.

			if (Math.abs(rooms[2].getPos().x - changeInPos.x) <= changeInPos.x && Math.abs(rooms[2].getPos().y - changeInPos.y) <= changeInPos.y)
			{
				rooms[0] = rooms[1];
				rooms[1] = rooms[2];

				rooms[1].moveTo(camera.x, camera.y);

				currentDirection = rooms[1].moveDirection;
				currentSpeed = rooms[1].moveSpeed;
				nextRoom++;

				if (currentSpeed != undefined)
				{
					rooms[2] = new Room(game, currentRound[nextRoom].roomBg,
																		currentRound[nextRoom].tileset,
																		currentRound[nextRoom].roomJSON,
																		currentRound[nextRoom].moveDirection,
																		currentRound[nextRoom].moveSpeed);
				}
			}
		}
	};

var loadJSON = (path, success, error) =>
	{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE)
		{
			if (xhr.status === 200) 
			{
				if (success)
				{
					success(JSON.parse(xhr.responseText));
				}
			} else
      {
				if (error)
        {
				  error(xhr);
        }
			}
		}
	};
	xhr.open("GET", path, true);
	xhr.send();
	} 
}


