'use strict';

function Player(game, x, y, bulletManager, id, weaponManager)
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

var fireRate = 200;
var baseFireRate = 200;

var nextFire = 0;

var movementSpeed = 200;
var baseMovementSpeed = 200;

var respawnTime = 250;
var nextRespawn = 0;

var bulletDamage = 2;
var bulletSpeed = 1000;
var bulletLifespan = 1000;

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

var scale = function ()
	{
	if (flipped)
		{
		self.sprite.scale.x = -scalingFactors.x;
		self.sprite.body.setSize(-self.sprite.width, self.sprite.height);
		} else
		{
		self.sprite.scale.x = scalingFactors.x;
		self.sprite.body.setSize(self.sprite.width, self.sprite.height);
		}
	self.sprite.scale.y = scalingFactors.y;
	};

var createPlayer = function ()
	{
	self.sprite.loadTexture(sprites[self.playerClass]);
	
	game.physics.enable(self.sprite, Phaser.Physics.ARCADE);
	self.sprite.body.collideWorldBounds = true;
	self.sprite.body.bounce = (1,1);

	self.weapon = weaponManager.createWeapon(self, sprites[self.playerClass]);
	
	pHUD = new Hud(game,self);
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

	scale();
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
				setupDone = true;
				}
			var length = input.moveLength;
			if(length > 1)
				{
				length = 1;
				}
			var angle = input.moveAngle;
			game.physics.arcade.velocityFromAngle(angle, movementSpeed * length, self.sprite.body.velocity);
			if (self.sprite.body.velocity.x > 0 && flipped)
				{
				flipped = false;
				} else if (self.sprite.body.velocity.x < 0 && !flipped) {
				flipped = true;
				}
			if ((input.sX != 0 || input.sX != 0) && (game.time.now > nextFire))
				{
				nextFire = game.time.now + fireRate;
				headingPoint.x = input.sX;
				headingPoint.y = input.sY;
				bulletManager.createBullet(bullets[self.playerClass], bulletDamage, self.id, (Phaser.Point.angle(headingPoint, vectorPoint) * 360/Math.PI), self.sprite.position, bulletSpeed, bulletLifespan);
				}
			}

		//We should only check for collisions when there are collidable objects on screen
		if(bulletManager.enemyBulletCount > 0)
			{
			game.physics.arcade.overlap(bulletManager.enemyBulletGroups, self.sprite, self.playerHit, null, self);
			}

		//Check for powerups only if powerups are active
		if(activePowerUps.length > 0) {
			for (var i = activePowerUps.length - 1; i >= 0; i--) {
				if(activePowerUps[i] != 'undefined') {
					if(activePowerUps[i].endTime <= game.time.now) {
						if(activePowerUps[i].powerUpID == 'incSpeed') 
						{
							self.setSpeed(baseMovementSpeed);
						}

						else if (activePowerUps[i].powerUpID == 'incFireRate')
						{
							self.setFireRate(baseFireRate);
						}
						activePowerUps.splice(i,1); //We remove the expired powerup from the array
					}				
				}
			}
		}

		} else if (self.dead && nextRespawn < 0) {
		game.effectManager.createSpawnEffect(self.sprite.position);
		spawnTimer = game.time.now;
		self.dead = false;
		self.currentHealth = self.maxHealth;
		gameClient.callClientRpc(self.id, "setDeath", [true], self, null);
		pHUD.updateHealthBar();
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

self.playerHit = function(player, bullet)
	{
	self.sprite.tint = 0xCC0000;
	game.time.events.add(hitColorTime, function() {self.sprite.tint = 0xFFFFFF;});
	var damage = bullet.damage;
	bulletManager.killbullet(bullet);
	self.takeDamage(damage);
  	gameClient.callClientRpc(self.id, "setHapticFeedback", [50], self, null);
	};

self.takeDamage = function(damage)
	{
	self.currentHealth = self.currentHealth-damage;
	if(self.currentHealth <= 0 && !self.dead) 
		{
		self.dead = true;
		self.kill();
		self.currentHealth = 0;
		}
		pHUD.updateHealthBar();
	};

self.heal = function(amount) 
{
	if(self.currentHealth + amount >= self.maxHealth) {
		self.currentHealth = self.maxHealth;
	} else {		
		self.currentHealth += amount;
	}
	pHUD.updateHealthBar();
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
* @param {int} pUpDuration - The Duration of the powerup in milliseconds
* @param {int} pUpStats - The value for the powerup
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
	//If this is the first isntance of a powerup we add it to the active list
	if(!powerupFound) {
		var newPowerUp = {powerUpID: pUpID, endTime: game.time.now + pUpDuration};
		activePowerUps.push(newPowerUp);
		switch(pUpID) 
		{
			case 'incSpeed':
				self.setSpeed(movementSpeed + pUpStats);
				break;

			case 'incFireRate':
				self.setFireRate(fireRate - pUpStats);
				break;

			default:
				break;
		}
	}
}

self.kill = function ()
	{
	clearAllPowerups();
	game.effectManager.popupScoreText('-100',self.sprite);
	self.sprite.exists = false;
	gameClient.callClientRpc(self.id, "setHapticFeedback", [200], self, null);
	gameClient.callClientRpc(self.id, "setDeath", [false], self, null);
	game.effectManager.createDeathEffect(self);
	nextRespawn = respawnTime;
	self.losePoints(100);
	};



self.getPoints =  function(amount) 
	{
	self.score += amount;
	if(game.playerList[id] != undefined)
		{
		game.playerList[id].totalScore += amount;
		}
	}

self.losePoints = function(amount)
	{
	self.score -= amount;
	if(game.playerList[id] != undefined)
		{
		game.playerList[id].totalScore -= amount;
		}
	}

var clearAllPowerups = function ()
	{
	self.setSpeed(baseMovementSpeed);
	self.setFireRate(baseFireRate);
	activePowerUps = [];
	};
}
