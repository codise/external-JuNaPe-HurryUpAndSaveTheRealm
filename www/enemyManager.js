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

var spawnCooldown = 100;
var nextSpawn = 0;

self.enemyList = []; // List manages Enemy objects

self.enemyPool = 30;

self.update = (players) =>
	{
	if (self.enemyPool > 0 && Object.keys(players).length > 0 && game.time.now > nextSpawn)
		{
		// Spawn new mobs
		var randomPos = {x: game.camera.x + game.rnd.integerInRange(0, game.camera.width), y: game.camera.y + game.rnd.integerInRange(0, game.camera.height)};
    var newEnemy = new Enemy(pickRandomFromDictionary(enemyDictionary), game, bulletManager, players, randomPos);
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
			self.enemyList[i].update(players);
			}
		}

	//Update pool

	self.enemyPool = 5 - self.enemyGroup.length;

	};

var pickRandomFromDictionary = (dict) =>
	{
	var keys = Object.keys(dict);
	var object
  object = dict[keys[ keys.length * Math.random() << 0]];
	return object;
	};
}


