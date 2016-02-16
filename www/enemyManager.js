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

self.game = game;
self.bulletManager = bulletManager;

self.enemyGroup = self.game.add.group(); // Group manages sprites
self.enemyGroup.enableBody = true;
self.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

self.spawnCooldown = 10000;
self.nextSpawn = 0;

self.enemyList = []; // List manages Enemy objects

self.enemyPool = 5;

self.update = (players) =>
	{
	if (self.enemyPool > 0 && Object.keys(players).length > 0 && self.game.time.now > self.nextSpawn)
	{
	// Spawn new mobs
	var randomPlayer = pickRandomFromDictionary(players);
	var randomPos = {x: self.game.rnd.integerInRange(0, self.game.width), y: self.game.rnd.integerInRange(0, self.game.height)};
	var newEnemy = new Enemy(pickRandomFromDictionary(enemyDictionary), game, bulletManager, randomPlayer, randomPos);
	self.enemyGroup.add(newEnemy.enemySprite);
  newEnemy.enemySprite.body.collideWorldBounds = true;
	self.enemyList.push(newEnemy);
  self.nextSpawn = self.game.time.now + self.spawnCooldown;
	}

	//Check if any enemy in enemylist has been killed and update enemies
	
	for (var i = 0; i < self.enemyList.length; i++)
	{
	if (self.enemyList[i].enemySprite.dead === true)
	{
    self.enemyList[i].kill();
	} else
	{
		self.enemyList[i].update();
	}
	}

	//Update pool
	
	self.enemyPool = 5 - self.enemyGroup.length;

	}

var pickRandomFromDictionary = (dict) =>
	{
	var keys = Object.keys(dict);
	return dict[keys[ keys.length * Math.random() << 0]];
	};

}
	

