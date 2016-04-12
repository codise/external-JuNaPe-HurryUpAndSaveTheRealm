'use strict';



function EnemyManager(game, bulletManager)
{
var self = this;
var enemyDictionary = { hellbug: {sprite: 'enemy_hellbug',
																	movementScheme: 'random',
																	shootingScheme: ['radial', 5, 'enemyBullet1'],
																	maxSpeed: 90,
																	moveRate: 1200,
																	fireRate: 4000,
																	hitColor: 0xCC0000,
																	maxHealth: 10},
												skeleton: {sprite: 'enemy_skeleton',
																	movementScheme: 'chargeSingle',
																	shootingScheme: ['directedBurst', 3, 'enemyBullet3'],

																	maxSpeed: 60,
																	moveRate: 800,
																	fireRate: 4500,
																	hitColor: 0xCC0000,
																	maxHealth: 10},
												slasher: {sprite: 'enemy_slasher',
																	movementScheme: 'chargeSingle',
																	shootingScheme: ['slasherShot', 1, 'enemyBullet2'],
																	maxSpeed: 180,
																	moveRate: 500,
																	fireRate: 500,
																	hitColor: 0xCC0000,
																	maxHealth: 5}}

var bossDictionary = { tentacle: {sprite: 'enemy_tentaclemonster',
																	 movementSchemes: ['wobble', 'shake', 'chargeDirection'],
																	 attackSchemes: ['spiral', 'deflect', 'shotgun', 'stream'],
																	 hitColor: 0x808000}}



self.enemyGroup = game.add.group(); // Group manages sprites
self.enemyGroup.enableBody = true;
self.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

var MAX_SPAWNCOOLDOWN = 2200;
var spawnCooldown = 2000;
var nextSpawn = 0;
var MaxEnemiesToSpawn = 20;
var enemiesToSpawn = 1;
var SPAWNING = true;

var spawningDistance = 50; // The minimum distance of spawned creature to closest player. BEWARE! if too big the game performance will suffer while trying to spawn creatures.

var enemyScalingCoefficient = 8;

self.enemyList = []; // List manages Enemy objects

var maxEnemies;

var playerAmount;

self.enemyPool = enemyScalingCoefficient;

self.update = function (players)
	{
	maxEnemies = enemyScalingCoefficient * Object.keys(players).length;
	playerAmount = Object.keys(players).length;
	if (self.enemyPool > 0 && playerAmount > 0 && game.time.now > nextSpawn && SPAWNING == true)
		{
		// Determine how many mobs to spawn
		MaxEnemiesToSpawn = Math.round(playerAmount/2);
		enemiesToSpawn = game.rnd.integerInRange(1, MaxEnemiesToSpawn);

		// Spawn new mobs
		for (var i = enemiesToSpawn- 1; i >= 0; i--)
			{
			var spawnPosition = getPosMinDPlayers(game, players, spawningDistance, 100);
			//console.log(dClosestPlayer(players, spawnPosition));
			if (spawnPosition != null)
				{
				game.effectManager.createSpawnEffect(spawnPosition);
				var newEnemy = new Enemy(pickRandomFromDictionary(enemyDictionary), game, bulletManager, players, spawnPosition);
				self.enemyGroup.add(newEnemy.sprite);
				newEnemy.sprite.body.collideWorldBounds = true;
				self.enemyList.push(newEnemy);
				}
			}
		spawnCooldown = MAX_SPAWNCOOLDOWN-(playerAmount*200);
		if(spawnCooldown < 1000) spawnCooldown = 1000;
		nextSpawn = game.time.now + spawnCooldown;
		}

	//Check if any enemy in enemylist has been killed and update enemies

	for (var i = 0; i < self.enemyList.length; i++)
		{
		if (self.enemyList[i].sprite.dead === true)
			{
			self.enemyList[i].kill();
			self.enemyList.splice(i,1);
			} else {
			self.enemyList[i].update(players);
			}
		}

	//Update pool

	self.enemyPool = maxEnemies - self.enemyGroup.length;
	};

self.createBoss = function (bossType, bossPos)
	{
	if (bossDictionary[bossType] != undefined)
		{
		var bossMonster = new BossMonster(bossDictionary[bossType], game, bulletManager, bossPos);
		self.enemyGroup.add(bossMonster.sprite);
		bossMonster.sprite.body.collideWorldBounds = true;
		self.enemyList.push(bossMonster);
		SPAWNING = false;
		}
	};
}


