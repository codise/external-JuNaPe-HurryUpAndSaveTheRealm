'use strict';



function EnemyManager(game, bulletManager)
{
var self = this;
var enemyDictionary = { hellbug: {sprite: 'enemy_hellbug',
																	movementScheme: 'random',
																	shootingScheme: [5, 'radial'],
																	maxSpeed: 150},
												skeleton: {sprite: 'enemy_skeleton',
																	 movementScheme: 'chargeSingle',
																	 shootingScheme: [3, 'directedBurst'],
																	 maxSpeed: 50}}


self.enemyGroup = game.add.group(); // Group manages sprites
self.enemyGroup.enableBody = true;
self.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

var spawnCooldown = 10000;
var nextSpawn = 0;

self.enemyList = []; // List manages Enemy objects

self.enemyPool = 5;

self.update = (players) =>
	{
	if (self.enemyPool > 0 && Object.keys(players).length > 0 && game.time.now > nextSpawn)
		{
		// Spawn new mobs
		var randomPlayer = pickRandomFromDictionary(players);
		var randomPos = {x: game.camera.x + game.rnd.integerInRange(0, game.camera.width), y: game.camera.y + game.rnd.integerInRange(0, game.camera.height)};
	
		if (randomPlayer != undefined)
			{
			var newEnemy = new Enemy(pickRandomFromDictionary(enemyDictionary), game, bulletManager, randomPlayer, randomPos);
			} else {
			var newEnemy = new Enemy(enemyDictionary.hellbug, game, bulletManager, randomPlayer, randomPos);
			console.log("did not find defined player in 500 loops, making a hellbug instead");
			}
	
		self.enemyGroup.add(newEnemy.enemySprite);
		newEnemy.enemySprite.body.collideWorldBounds = true;
		self.enemyList.push(newEnemy);
		nextSpawn = game.time.now + spawnCooldown;
		}

	//Check if any enemy in enemylist has been killed and update enemies
	
	for (var i = 0; i < self.enemyList.length; i++)
		{
		if (self.enemyList[i].enemySprite.dead === true)
			{
			self.enemyList[i].kill();
			} else {
			self.enemyList[i].update();
			}
		}

	//Update pool
	
	self.enemyPool = 5 - self.enemyGroup.length;

	};

var pickRandomFromDictionary = (dict) =>
	{
	var keys = Object.keys(dict);
	var object
	var i = 0;
	while (object === undefined)
		{
		object = dict[keys[ keys.length * Math.random() << 0]];
		i++;
		//100 attempts to give a defined object
		if (i > 100)
			{
			return object;
			}
		}
	return object;
	};

}
	

