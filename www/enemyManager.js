'use strict';



function EnemyManager(game, bulletManager)
{
var self = this;
var enemyDictionary = { hellbug: {sprite: 'enemy_hellbug',
																	movementScheme: 'random',
																	shootingScheme: [5, 'radial'],
																	maxSpeed: 75,
																	moveRate: 1200,
																	fireRate: 5000,
																	maxHealth: 10},
												skeleton: {sprite: 'enemy_skeleton',
																	movementScheme: 'chargeSingle',
																	shootingScheme: [3, 'directedBurst'],
																	maxSpeed: 75,
																	moveRate: 1200,
																	fireRate: 5000,
																	maxHealth: 10},
												slasher: {sprite: 'enemy_slasher',
																	movementScheme: 'chargeSingle',
																	shootingScheme: [1, 'slasherShot'],
																	maxSpeed: 200,
																	moveRate: 500,
																	fireRate: 500,
																	maxHealth: 5}}

var bossDictionary = { tentacle: {sprite: 'enemy_tentaclemonster',
																	 movementSchemes: ['wobble', 'shake', 'chargeDirection'],
																	 attackSchemes: ['spiral', 'deflect', 'shotgun', 'stream'],
																	 maxHealth: 500} }



self.enemyGroup = game.add.group(); // Group manages sprites
self.enemyGroup.enableBody = true;
self.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

var spawnCooldown = 2000;
var nextSpawn = 0;

var enemyScalingCoefficient = 7;

self.enemyList = []; // List manages Enemy objects

var maxEnemies;

self.enemyPool = enemyScalingCoefficient;

self.update = (players) =>
	{
	maxEnemies = enemyScalingCoefficient * Object.keys(players).length;
	console.log(self.enemyGroup.length);
	if (self.enemyPool > 0 && Object.keys(players).length > 0 && game.time.now > nextSpawn)
		{
		// Spawn new mobs
		var randomPos = {x: game.camera.x + game.rnd.integerInRange(0, game.camera.width), y: game.camera.y + game.rnd.integerInRange(0, game.camera.height)};
		var newEnemy = new Enemy(pickRandomFromDictionary(enemyDictionary), game, bulletManager, players, randomPos);
		self.enemyGroup.add(newEnemy.sprite);
		newEnemy.sprite.body.collideWorldBounds = true;
		self.enemyList.push(newEnemy);
		nextSpawn = game.time.now + spawnCooldown;
		}

	//Check if any enemy in enemylist has been killed and update enemies

	for (var i = 0; i < self.enemyList.length; i++)
		{
		if (self.enemyList[i].sprite.dead === true)
			{
			self.enemyList[i].kill();
			} else {
			self.enemyList[i].update(players);
			}
		}

	//Update pool

	self.enemyPool = maxEnemies - self.enemyGroup.length;

	};

self.createBoss = (bossType, bossPos) =>
	{
	if (bossDictionary[bossType] != undefined)
		{
		var bossMonster = new BossMonster(bossDictionary[bossType], game, bulletManager, bossPos);
		self.enemyGroup.add(bossMonster.sprite);
		bossMonster.sprite.body.collideWorldBounds = true;
		self.enemyList.push(bossMonster);
		spawnCooldown = 100000;
		}
	};

var pickRandomFromDictionary = (dict) =>
	{
	var keys = Object.keys(dict);
	var object
	object = dict[keys[ keys.length * Math.random() << 0]];
	return object;
	};
}


