'use strict';



function EnemyManager(game, bulletManager)
{
var self = this;
var enemyDictionary = { hellbug: {sprite: 'enemy_hellbug',
																	movementScheme: 'random',
																	shootingScheme: [5, 'radial'],
																	maxSpeed: 150},
												cthulhu: {sprite: 'enemy_cthulhu',
																	movementScheme: 'chargeSingle',
																	shootingScheme: [3, 'directedBurst'],
																	maxSpeed: 100}}

self.game = game;
self.bulletManager = bulletManager;

self.enemyGroup = self.game.add.group(); // Group manages sprites
self.enemyGroup.enableBody = true;
self.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

self.enemyList = []; // List manages Enemy objects

self.enemyPool = 5;

self.update = (players) =>
	{
	if (self.enemyPool > 0)
	{
	// Spawn new mobs
	var randomPlayer = players[Math.floor(Math.random() * players.length)]; // Selects random player from list
	var randomPos = {x: self.game.rnd.integerInRange(0, self.game.width), y: self.game.rnd.integerInRange(0, self.game.height)};
	var newEnemy = new Enemy(pickRandomFromDictionary(enemyDictionary), game, bulletManager, randomPlayer, randomPos);
	self.enemyGroup.add(newEnemy.enemySprite);
	self.enemyList.push(newEnemy);
	}

	//Check if any enemy in enemylist has been killed and update enemies
	
	for (var i = 0; i < enemyList.length; i++)
	{
	if (enemyList[i].enemySprite.alive === false)
	{
		delete enemyList[i]
	} else
	{
		enemyList[i].update();
	}
	}

	//Update pool
	
	self.enemyPool = 5 - self.enemyGroup.length;

	}

var pickRandomFromDictionary = (dict) =>
	{
	var keys = Object.keys(dict);
	return dict.[keys[ keys.length * Math.random() << 0]];
	};


	

