'use strict';

function BossMonster (bossInfo, game, bulletManager, position)
{
var self = this;
self.sprite = game.add.sprite(position.x, position.y, bossInfo.sprites[0]);
self.sprite.anchor.setTo(0.5, 0.5);
var flipped = false;
game.physics.enable(self.sprite, Phaser.Physics.ARCADE);
var hitColorTime = 50;
var hitColor = bossInfo.hitColor;

var patternTimeout;
var currentPatterns = bossInfo.normalPatterns;
var currentPatternIndex = -1;
var currentPattern;
nextPattern();

var nextMove = 0;

var shotsFired = 0;
var movementDirection = 0;

var cameraPadding = 20;

var nextFire = game.time.now + currentPattern.fireRate;

self.maxHealth = 200 * Object.keys(game.playerList).length;
self.currentHealth = self.maxHealth;

var healthBar = new Hud(game, self);
var lowHealth = false;

var mPlayers;

var flip = function ()
	{
	if (flipped)
		{
		self.sprite.scale.x = Math.abs(self.sprite.scale.x);
		} else
		{
		self.sprite.scale.x = Math.abs(self.sprite.scale.x) * -1;
		}
	};

self.update = function (players)
	{
	mPlayers = players;
	flip();
	if (game.time.now >= patternTimeout) 
		{
		nextPattern();
		}
	if (currentPattern.target)
		{
		if(currentPattern.target.dead)
			{
			nextPattern();
			}
		}
	if(self.currentHealth < self.maxHealth / 3 && lowHealth == false)
		{
		lowHealth = true;
		currentPatterns = bossInfo.ragePatterns;
		currentPatternIndex = -1;
		nextPattern();
		}
	
	if (game.time.now > nextMove)
		{
		move();
		}
		
	if (self.sprite.body.velocity.x > 0 && flipped)
		{
		flipped = false;
		} else if (self.sprite.body.velocity.x < 0 && !flipped)
		{
		flipped = true;
		}
		
	if (game.time.now > nextFire)
		{
		attack(players);
		}
	
	if(bulletManager.playerBulletCount > 0) 
		{
		for (var i = 0; i < bulletManager.playerBulletGroups.length; i++)
			{
			game.physics.arcade.overlap(bulletManager.playerBulletGroups[i], self.sprite, self.enemyHit, null, self); 
			}
		}
	
	checkCameraBounds();
	healthBar.updateHealthBar();
	}
	
self.enemyHit = function(enemy, bullet) 
	{
	self.sprite.tint = hitColor;
	game.time.events.add(hitColorTime, function() {self.sprite.tint = 0xFFFFFF;});
	var playerId = bullet.playerId;
	var damage = bullet.damage;
	bullet.kill();
	mPlayers[playerId].getPoints(1);
	self.enemyTakeDamage(damage);
	};
	
self.enemyTakeDamage = function(damage) 
	{
	self.currentHealth = self.currentHealth - damage;
	if(self.currentHealth <= 0)
		{
		self.sprite.dead = true;
		}
	};

self.kill = function ()
	{
	game.state.states.play.roundManager.lastRoomTimeout = 5000; //5 sec
	game.state.states.play.roundManager.lastRoomTimer = game.time.now + game.state.states.play.roundManager.lastRoomTimeout;
	self.sprite.destroy();
	};

function nextPattern()
	{
	if(currentPattern)
		{
		if(currentPattern.target)
			{
			currentPattern.target = undefined;
			}
		}
	shotsFired = 0;
	currentPatternIndex++;
	if(currentPatternIndex >= currentPatterns.length)
		{
		currentPatternIndex = 0;
		}
	currentPattern = currentPatterns[currentPatternIndex];
	patternTimeout = game.time.now + currentPattern.patternRate;
	nextFire = game.time.now + 10;
	nextMove = game.time.now;
	if(currentPattern.onlyOnce && currentPattern.done)
		{
		nextPattern();
		return;
		} else if (!currentPattern.done) {
		currentPattern.done = true;
		}
	if(currentPattern.texture != undefined)
		{
		loadTexture(currentPattern.texture);
		}
	};

function loadTexture(textureIndex)
	{
	if(textureIndex < bossInfo.sprites.length && textureIndex > -1)
		{
		self.sprite.loadTexture(bossInfo.sprites[textureIndex]);
		}
	};

//sets movement direction based on pattern
//movement speed and turn rate (how often a new direction is taken) are pattern specific
var move = function ()
	{
	switch (currentPattern.movementScheme[0])
		{
		case 'random':
			movementDirection = Math.floor(Math.random()*360);
			break;
		case 'shake':
			movementDirection += 180;
			break;
		case 'charge':
			var target
			if(!currentPattern.target)
				{
				target = getAliveFromObject(mPlayers);
				currentPattern.target = target;
				} else {
				target = currentPattern.target;
				}
			if(target != undefined)
				{
				movementDirection = game.physics.arcade.angleBetween(self.sprite, target.sprite) * 180/Math.PI
				} else {
				movementDirection = Math.floor(Math.random()*360);
				}
			break;
		default:
		}
		game.physics.arcade.velocityFromAngle(movementDirection, currentPattern.maxSpeed, self.sprite.body.velocity);
		nextMove = game.time.now + currentPattern.moveRate;
	};

var attack = function (players)
	{
	switch (currentPattern.attackScheme)
		{
		case 'spiral':
			for(var i = 1; i <= currentPattern.bulletAmount; i++)
				{
				//gives a random offset between -shotAngleVariance and shotAngleVariance
				var randomAngleOffset
				if(currentPattern.shotAngleVariance)
					{
					randomAngleOffset = Math.floor((Math.random() * 2 * currentPattern.shotAngleVariance + 1)) - currentPattern.shotAngleVariance;
					} else {
					randomAngleOffset = 0;
					}
				
				var angle = 360 * i/currentPattern.bulletAmount + shotsFired * currentPattern.shotRotation + randomAngleOffset;
				bulletManager.createBullet(currentPattern.bulletGraphic, currentPattern.bulletDamage, -1, angle, self.sprite.position, currentPattern.bulletSpeed, currentPattern.bulletLifespan);
				}
			break;
			
		case 'burst':
			var target
			if(currentPattern.stickToTarget && !currentPattern.target)
				{
				target = getAliveFromObject(players);
				currentPattern.target = target;
				} else if (currentPattern.stickToTarget && currentPattern.target)
				{
				target = currentPattern.target;
				} else {
				target = getAliveFromObject(players);
				}
			
			for(var i = 0 - ((currentPattern.bulletAmount-1)/2) ; i <= 0 + ((currentPattern.bulletAmount-1)/2); i++)
				{
				if(target != undefined && !target.dead)
					{
					//gives a random offset between -shotAngleVariance and shotAngleVariance
					var randomAngleOffset
					if(currentPattern.shotAngleVariance)
						{
						randomAngleOffset = Math.floor((Math.random() * 2 * currentPattern.shotAngleVariance + 1)) - currentPattern.shotAngleVariance;
						} else {
						randomAngleOffset = 0;
						}
					var angle = game.physics.arcade.angleBetween(self.sprite, target.sprite) * 180/Math.PI + (i * currentPattern.burstSpreadAngle) + randomAngleOffset;
					
					//amount from negative bulletSpeedVariance to positive bulletSpeedVariance
					var randomSpeedOffset
					if(currentPattern.bulletSpeedVariance)
						{
						randomSpeedOffset = Math.floor((Math.random() * 2 * currentPattern.bulletSpeedVariance + 1)) - currentPattern.bulletSpeedVariance;
						} else {
						randomSpeedOffset = 0;
						}
					var bulletSpeed = currentPattern.bulletSpeed + randomSpeedOffset;
					bulletManager.createBullet(currentPattern.bulletGraphic, currentPattern.bulletDamage, -1, angle, self.sprite.position, bulletSpeed, currentPattern.bulletLifespan);
					} else 
					{
					nextPattern();
					}
				}
			break;
		case 'line':
			//>> this needs to be a separate function
			var target
			if(currentPattern.stickToTarget && !currentPattern.target)
				{
				target = getAliveFromObject(players);
				currentPattern.target = target;
				} else if (currentPattern.stickToTarget && currentPattern.target)
				{
				target = currentPattern.target;
				} else {
				target = getAliveFromObject(players);
				}
			//<<
			
			if(target != undefined && !target.dead)
				{
				var angle = game.physics.arcade.angleBetween(self.sprite, target.sprite) * 180/Math.PI;
				var bulletSpeed = currentPattern.bulletSpeed;
				for(var i = 1; i <= currentPattern.bulletAmount; i++)
					{
					if(i === currentPattern.bulletAmount)
						{
							bulletManager.createBullet(currentPattern.bulletGraphic, currentPattern.bulletDamage, -1, angle, self.sprite.position, bulletSpeed, currentPattern.bulletLifespan);
						} else {
							bulletManager.createBullet(currentPattern.lineBulletGraphic, currentPattern.lineBulletDamage, -1, angle, self.sprite.position, bulletSpeed, currentPattern.bulletLifespan);
						}
					bulletSpeed = bulletSpeed + currentPattern.bulletSpeedVariance;
					}
				} else 
				{
				nextPattern();
				}
			
			
		default:
		}
	shotsFired ++;
	nextFire = game.time.now + currentPattern.fireRate;
	};
	
	
var checkCameraBounds = function ()
	{
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
}
