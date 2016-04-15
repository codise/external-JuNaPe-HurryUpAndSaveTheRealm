'use strict';



function EnemyManager(game, bulletManager)
{
var self = this;

/**
* The dictionary which contains the enemy definitions
*/
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

var bossDictionary = { tentacle: {sprites: ['boss_tentaclemonster'],
																	normalPatterns: [bossPatterns.spiral1, bossPatterns.spiral1Reverse, bossPatterns.spiral2, bossPatterns.burst1],
																	ragePatterns: [bossPatterns.burst3, bossPatterns.burst2],
																	hitColor: 0x808000},
												king: {sprites: ['boss_king1', 'boss_king2', 'boss_king3'],
																	normalPatterns: [bossPatterns.burstSlash1, bossPatterns.line1, bossPatterns.spiral3],
																	ragePatterns: [bossPatterns.spiralNova1, bossPatterns.burst4, bossPatterns.spiral4, bossPatterns.line2],
																	hitColor: 0xCC0000}}



self.enemyGroup = game.add.group(); // Group manages sprites
self.enemyGroup.enableBody = true;
self.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

var MAX_SPAWNCOOLDOWN = 2200; 	// Maximum cooldown between spawns

var spawnCooldown = 2000; 		// Current cooldown between spawns

var nextSpawn = 0; 				// The time to the next spawn

var maxEnemies; 				// Maximum number of enemies to spawn

var MaxEnemiesToSpawn = 0; 		//The maximum amount of enemies we try to spawn on each attempt. Calculated as number of players divided by 2

var enemiesToSpawn = 1; 		//The actual number of enemies we attempt to spawn

var SPAWNING = true;

var spawningDistance = 50; 		// The minimum distance of spawned creature to closest player. BEWARE! if too big the game performance will suffer while trying to spawn creatures.

var enemyScalingCoefficient = 8; //How much we increase the maximum number of enemies per player

self.enemyList = []; 			// List manages Enemy objects

var playerAmount;

self.enemyPool = enemyScalingCoefficient; //The number of enemies we can still spawn

self.update = function (players)
	{

	//First calculate the new maximum number of enemies	
	playerAmount = Object.keys(players).length;
	maxEnemies = enemyScalingCoefficient * playerAmount;	

	if (self.enemyPool > 0 && playerAmount > 0 && game.time.now > nextSpawn && SPAWNING == true)
		{
		// Determine how many mobs to spawn
		MaxEnemiesToSpawn = Math.round(playerAmount/2);
		enemiesToSpawn = game.rnd.integerInRange(1, MaxEnemiesToSpawn);

		// Spawn new mobs
		for (var i = enemiesToSpawn- 1; i >= 0; i--)
			{
			//Get a point that's a certain distance away from all players
			var spawnPosition = getPosMinDPlayers(game, players, spawningDistance, 100);
			//console.log(dClosestPlayer(players, spawnPosition));
			//If we find a suitable point spawn an enemy, if not, then simply skip this spawn attempt.
			if (spawnPosition != null)
				{
				game.effectManager.createSpawnEffect(spawnPosition);
				var newEnemy = new Enemy(pickRandomFromDictionary(enemyDictionary), game, bulletManager, players, spawnPosition);
				self.enemyGroup.add(newEnemy.sprite);
				newEnemy.sprite.body.collideWorldBounds = true;
				self.enemyList.push(newEnemy);
				}
			}

		//Calculate the next time to attempt enemy spawning
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

/**
* Spawn a bossmonster and disable normal monster spawning
* @param {String} bossType - The identifier for the type of boss to spawn
* @param {Point} bossPos - The position on which we spawn the boss
*/

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


