'use strict';

function Player(game, x, y, bulletManager, id, weaponManager, enemyManager)
{
var self = this;

//just in case
if(game.playerList[id] == undefined)
	{
	console.log("~~ player " + id + " was not set in game.playerList yet !?");
	game.playerList[id] = {};
	game.playerList[id].totalScore = 0;
	}

if(!game.playerList[id].totalScore)
	{
	game.playerList[id].totalScore = 0;
	}

var bullets = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5', 'bullet6'];
var sprites = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6'];
var input;
//self.playerClass = Math.floor((Math.random() * 6)); //rand 0-5
self.playerClass;
self.playerName;
self.id = id;

self.score = 0;

var hitColorTime = 50;

self.maxHealth = 200;
self.currentHealth = self.maxHealth;

self.dead = false;
//var randomSprite = sprites[Math.floor((Math.random() * 6))];

self.sprite = game.add.sprite(x, y, 'empty');
self.sprite.anchor.setTo(0.5, 0.5);
self.sprite.exists = false;
self.sprite.playerObj = self;  //powerups need the player object, bad solution, anythign better?
var setupDone = false;

var flipped = false;

var baseFireRate;
var fireRate;

var nextFire = 0;

var baseMovementSpeed;
var movementSpeed;

var respawnTime = 250;
var nextRespawn = 0;

var bulletDamage; 
var bulletSpeed;
var bulletLifespan;

var cameraPadding = 20;

var headingPoint = new Phaser.Point();
var vectorPoint = new Phaser.Point();
vectorPoint.x = -1;
vectorPoint.y = 0;


var activePowerUps = [];

var pHUD;

// Spawn timeout stuff, will maybe become obsolete when spawning part of sprite spritesheet

var spawnDelay = game.effectManager.getSpawnDuration();
var spawnTimer = game.time.now;
var deathRelativePos = {x: 0, y: 0};
var enemyFreeSpawnRadius = game.width/15;
var spawnBorder = game.width/15;

// Powerup shimmer effects, using emitters

var emitterList = [];
emitterList[0] = game.effectManager.createPlayerEmitter('particle_blue');
emitterList[1] = game.effectManager.createPlayerEmitter('particle_red');

self.sprite.addChild(emitterList[0]);
self.sprite.addChild(emitterList[1]);

var flip = function ()
	{
	if (flipped)
		{
		self.sprite.scale.x = -1 * Math.abs(self.sprite.scale.x);
		self.sprite.body.setSize(-self.sprite.width, self.sprite.height);
		} 
	else
		{
		self.sprite.scale.x = Math.abs(self.sprite.scale.x);
		self.sprite.body.setSize(self.sprite.width, self.sprite.height);
		}
	};


/**
* Creates the player object
* Sets the sprite and weapon, along with creating a healthbar and setting the player name
*/
var createPlayer = function ()
	{
	self.sprite.loadTexture(sprites[self.playerClass]);
	
	game.physics.enable(self.sprite, Phaser.Physics.ARCADE);
	self.sprite.body.collideWorldBounds = true;
	self.sprite.body.bounce = (1,1);

	self.weapon = weaponManager.createWeapon(self, sprites[self.playerClass]);
	
	pHUD = new Hud(game, self);
	pHUD.setName(self.playerName);
	self.sprite.exists = true;

	};

self.setInput = function (inputArray)
	{
	input = inputArray;
	};

//called by controller once it is created
var setClassAndName = function (pClass, pName)
	{
	self.playerClass = pClass;
	self.playerName = pName;
	game.playerList[id].name = pName;
	game.playerList[id].class = pClass;
	//console.log('pname: ' + self.playerName + ', pclass: ' + self.playerClass);
	};
	
self.update = function ()
	{

	self.sprite.exists = ! (spawnTimer + spawnDelay > game.time.now || self.dead);
	if (self.weapon != undefined) self.weapon.sprite.exists = ! (spawnTimer + spawnDelay > game.time.now || self.dead);

	flip();
	if (!self.dead)
		{
		if (input != undefined)
			{
			if(!setupDone)
				{
				//setting the player up here is a workaround to enable play on firefox
				//console.log('setting up player');
				setClassAndName(input.pClass, input.pName);
				createPlayer();
				
				var info = playerPatterns[input.pClass];
				baseFireRate = info.baseFireRate;
				fireRate = baseFireRate;
				baseMovementSpeed = info.baseMovementSpeed;
				movementSpeed = baseMovementSpeed;
				bulletDamage = info.bulletDamage;
				bulletSpeed = info.bulletSpeed;
				bulletLifespan = info.bulletLifespan;
				self.maxHealth = info.maxHealth;
				self.currentHealth = self.maxHealth;

				setupDone = true;
				game.state.states.play.roundManager.dirty['score'] = true;
				}
			var length = input.moveLength;
			if(length > 1)
				{
				length = 1;
				}
			var moveAngle = input.moveAngle;
			game.physics.arcade.velocityFromAngle(moveAngle, movementSpeed * length, self.sprite.body.velocity);

			var shooting = input.shootAngle != 0;

			if(Math.abs(input.shootAngle) > 180/2 && !flipped)
				{
				flipped = true;
				}
			else if(Math.abs(input.shootAngle) < 180/2 && flipped)
				{
				flipped = false;
				}

			if (self.sprite.body.velocity.x > 0 && flipped && !shooting)
				{
				flipped = false;
				} 
				else if (self.sprite.body.velocity.x < 0 && !flipped && !shooting) 
				{
				flipped = true;
				}
				
			if (shooting && (game.time.now > nextFire))
				{
				nextFire = game.time.now + fireRate;
				bulletManager.createBullet(bullets[self.playerClass], bulletDamage, self.id, input.shootAngle, self.sprite.position, bulletSpeed, bulletLifespan);
				}
			self.weapon.sprite.angle = input.shootAngle;
			self.weapon.update(flipped, input);		
			}

		//We should only check for collisions when there are collidable objects on screen
		if(bulletManager.enemyBulletCount > 0)
			{
			game.physics.arcade.overlap(bulletManager.enemyBulletGroup, self.sprite, self.playerHit, null, self); 
			}

		//Check for powerups only if powerups are active
		if(activePowerUps.length > 0) {
			for (var i = activePowerUps.length - 1; i >= 0; i--) {
				if(activePowerUps[i] != 'undefined') {
					if(activePowerUps[i].endTime <= game.time.now) {
						if(activePowerUps[i].powerUpID == 'incSpeed') 
						{
							self.setSpeed(baseMovementSpeed);
							emitterList[0].on = false;
						}

						else if (activePowerUps[i].powerUpID == 'incFireRate')
						{
							self.setFireRate(baseFireRate);
							emitterList[1].on = false;
						}
						activePowerUps.splice(i,1); //We remove the expired powerup from the array
					}				
				}
			}
		}

		} else if (self.dead && nextRespawn < 0) {
		self.sprite.position.x = game.camera.x + deathRelativePos.x;
		self.sprite.position.y = game.camera.y + deathRelativePos.y;
		checkSpawnPosition();
		game.effectManager.createSpawnEffect(self.sprite.position);
		spawnTimer = game.time.now;
		self.dead = false;
		self.currentHealth = self.maxHealth;
		gameClient.callClientRpc(self.id, "setDeath", [true], self, null);
		if (pHUD != undefined) pHUD.updateHealthBar();
		} else {
		nextRespawn--;
		}

		// We always check if the player has fallen behing the camera

		if (self.sprite.position.x < game.camera.x + cameraPadding)
		{
			self.sprite.position.x = game.camera.x + cameraPadding;
		} else if (self.sprite.position.x > game.camera.x + game.camera.width - cameraPadding)
		{
			self.sprite.position.x = game.camera.x + game.camera.width - cameraPadding;
		}

		if (self.sprite.position.y < game.camera.y + cameraPadding)
		{
			self.sprite.position.y = game.camera.y + cameraPadding;
		} else if (self.sprite.position.y > game.camera.y + game.camera.height - cameraPadding)
		{
			self.sprite.position.y = game.camera.y + game.camera.height - cameraPadding;
		}
	};

/**
* Triggers when the player is hit
* Changes player color and applies damage
* @param {player} player - The player object which is hit
* @param {bullet} bullet - The bullet object which hits the player
*/

self.playerHit = function(player, bullet)
	{
	self.sprite.tint = 0xCC0000;
	game.time.events.add(hitColorTime, function() {self.sprite.tint = 0xFFFFFF;});
	var damage = bullet.damage;
	bulletManager.killBullet(bullet);
	self.takeDamage(damage);
	gameClient.callClientRpc(self.id, "setHapticFeedback", [50], self, null);
	gameClient.callClientRpc(self.id, "playSound",['damage'], self, null);

	};


/**
* Triggers when the player takes damage
* Decreases health and updates the healthbar, also kills the payer if necessery
* @param {Number} damage - The amount of damage to deal
*/
self.takeDamage = function(damage)
	{
	self.currentHealth = self.currentHealth-damage;
	if(self.currentHealth <= 0 && !self.dead) 
		{
		self.dead = true;
		self.kill();
		self.currentHealth = 0;
		}
		if(pHUD != undefined)
			{
			pHUD.updateHealthBar();
			}
		
	};

/**
* Heals the player for specified amount
* @param {Number} amount - The amount of health to restore
*/
self.heal = function(amount) 
{
	if(self.currentHealth + amount >= self.maxHealth) {
		self.currentHealth = self.maxHealth;
	} else {		
		self.currentHealth += amount;
	}
	if(pHUD != undefined)
		{
		pHUD.updateHealthBar();
		}
}

self.setFireRate = function(amount) 
{
	fireRate = amount;
} 

self.setSpeed = function(amount) 
{
	movementSpeed = amount;

} 


/**
* Starts a powerup on the player object
* @param {string} pUpID - The ID of the powerup as displayed in pUpDictionary
* @param {Number} pUpDuration - The Duration of the powerup in milliseconds
* @param {Number} pUpStats - The value for the powerup
*/
self.startPowerUp = function(pUpID, pUpDuration, pUpStats) 
{
	var powerupFound = false;

	//If the player picks two powerups we simply extend the duration.
	for (var i = activePowerUps.length - 1; i >= 0; i--) {
		if(activePowerUps[i].powerUpID == pUpID) {
			activePowerUps[i].endTime = game.time.now + pUpDuration;
			powerupFound = true;
		}
	}
	//If this is the first instance of a powerup we add it to the active list
	if(!powerupFound) {
		var newPowerUp = {powerUpID: pUpID, endTime: game.time.now + pUpDuration};
		activePowerUps.push(newPowerUp);
		switch(pUpID) 
		{
			case 'incSpeed':
				self.setSpeed(movementSpeed + pUpStats);
				emitterList[0].start(false, 500);
				break;

			case 'incFireRate':
				self.setFireRate(fireRate - pUpStats);
				emitterList[1].start(false, 500);
				break;
			default:
				break;
		}
	}
}

/**
* Kills the player object
*/
self.kill = function ()
	{
	clearAllPowerups();
	game.effectManager.popupScoreText('-100',self.sprite);
	if (self.sprite != undefined) self.sprite.exists = false;
	if (self.weapon != undefined) self.weapon.sprite.exists = false;
	gameClient.callClientRpc(self.id, "setHapticFeedback", [200], self, null);
	gameClient.callClientRpc(self.id, "setDeath", [false], self, null);
	game.effectManager.createDeathEffect(self, game.playerList);
	nextRespawn = respawnTime;
	deathRelativePos.x = self.sprite.position.x - game.camera.x;
	deathRelativePos.y = self.sprite.position.y - game.camera.y;
	self.losePoints(100);

	// Disable all active emitters
	
	for (var i = 0; i < emitterList.length; i++)
		{
			if (emitterList[i] != undefined)
				{
				emitterList[i].on = false;
				}
		}

	activePowerUps = [];
	};


/**
* Adds a specified amount of points to the player
* @param {Number} amount - The amount of points to add
*/
self.getPoints =  function(amount) 
	{
	self.score += amount;
	if(game.playerList[id] != undefined)
		{
		game.playerList[id].totalScore += amount;
		}
	game.state.states.play.roundManager.dirty['score'] = true;
	}

/**
* Removes a specified amount of points to the player
* @param {Number} amount - The amount of points to remove
*/
self.losePoints = function(amount)
	{
	self.score -= amount;
	if(game.playerList[id] != undefined)
		{
		game.playerList[id].totalScore -= amount;
		}
	}

var checkSpawnPosition = function()
	{
	var distance = dClosestEnemy(enemyManager.enemyList, self.sprite.position); //why doesn't work getAllLivingFromObject('enemyList')?
	while(distance < enemyFreeSpawnRadius)
		{
		findNewSpawnPostion();
		distance = dClosestEnemy(enemyManager.enemyList, self.sprite.position); 
		}
	};

var findNewSpawnPostion = function()
	{
	var newPosition = getRandomPosition(spawnBorder);
	self.sprite.position.x = newPosition.x;
	self.sprite.position.y = newPosition.y;
	};


var clearAllPowerups = function ()
	{
	self.setSpeed(baseMovementSpeed);
	self.setFireRate(baseFireRate);
	activePowerUps = [];
	};
}
