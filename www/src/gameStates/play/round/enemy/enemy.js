'use strict';

function Enemy (enemyInfo, game, bulletManager, position)
{
var self = this;
self.sprite = game.add.sprite(position.x, position.y, enemyInfo.sprites[0]);
self.sprite.anchor.setTo(0.5, 0.5);
var flipped = false;

var isBoss = enemyInfo.boss;
game.physics.enable(self.sprite, Phaser.Physics.ARCADE);
var hitColorTime = 50;
var hitColor = enemyInfo.hitColor;

var patternTimeout;
var currentPatterns;
self.maxHealth = enemyInfo.maxHealth
if(isBoss)
	{
	currentPatterns = enemyInfo.normalPatterns;
	var healthBar = new Hud(game, self);
	self.maxHealth *= Object.keys(game.playerList).length;
	} else 
	{
	currentPatterns = enemyInfo.patterns;
	}
	
self.currentHealth = self.maxHealth;
var currentPatternIndex = -1;
var currentPattern;
nextPattern();

var nextMove = 0;

var shotsFired = 0;
var movementDirection = 0;

var nextFire = game.time.now + currentPattern.fireRate;

var lowHealth = false;

var cameraPadding = 20;
var players;
var targetPlayer;

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

self.update = function (playersObj)
	{
	players = playersObj;
	flip();
	if (patternTimeout != undefined)
		{
		if (game.time.now >= patternTimeout) 
			{
			nextPattern();
			}
		}
	if (targetPlayer)
		{
		if(targetPlayer.dead)
			{
			var newTarget = getAliveFromObject(players);
			if (newTarget != undefined)
				{
				targetPlayer = newTarget;
				} else if(currentPatterns.length > 1)
				{
				nextPattern();
				}
			}
		}
	if(isBoss && self.currentHealth < self.maxHealth / 3 && lowHealth == false)
		{
		lowHealth = true;
		currentPatterns = enemyInfo.ragePatterns;
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
		game.physics.arcade.overlap(bulletManager.playerBulletGroup, self.sprite, self.enemyHit, null, self); 
		}
	
	checkCameraBounds();
	if(healthBar != undefined)
		{
		healthBar.updateHealthBar();
		}
	}
	
self.enemyHit = function(enemy, bullet) 
	{
	self.sprite.tint = hitColor;
	game.time.events.add(hitColorTime, function() {self.sprite.tint = 0xFFFFFF;});
	if(players[bullet.playerId] != undefined)
		{
		players[bullet.playerId].getPoints(bullet.damage);
		}
	self.takeDamage(bullet.damage);
	bulletManager.killBullet(bullet);
	};
	
self.takeDamage = function(damage) 
	{
	self.currentHealth = self.currentHealth - damage;
	if(self.currentHealth <= 0)
		{
		self.sprite.dead = true;
		}
	};

self.kill = function ()
	{
	if (isBoss)
		{
		game.state.states.play.roundManager.lastRoomTimeout = 5000; //5 sec
		game.state.states.play.roundManager.lastRoomTimer = game.time.now + game.state.states.play.roundManager.lastRoomTimeout;
		}
	game.effectManager.createDeathEffect(self, players);
	self.sprite.destroy();
	};

function nextPattern()
	{
	if(targetPlayer)
		{
		targetPlayer = undefined;
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
	if(textureIndex < enemyInfo.sprites.length && textureIndex > -1)
		{
		self.sprite.loadTexture(enemyInfo.sprites[textureIndex]);
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
			var target;
			if(!targetPlayer)
				{
				target = getAliveFromObject(players);
				targetPlayer = target;
				} else {
				target = targetPlayer;
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

var attack = function ()
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
				var shotRotation;
				if(currentPattern.shotRotation)
					{
					shotRotation = currentPattern.shotRotation;
					} else 
					{
					shotRotation = 0;
					}
				var angle = 360 * i/currentPattern.bulletAmount + shotsFired * shotRotation + randomAngleOffset;
				bulletManager.createBullet(currentPattern.bulletGraphic, currentPattern.bulletDamage, -1, angle, self.sprite.position, currentPattern.bulletSpeed, currentPattern.bulletLifespan);
				}
			break;
		
		case 'radial':
			var randomOffset = Math.floor((Math.random() * 360));
			for (var i = 0; i < currentPattern.bulletAmount; i++)
				{
				var angle = 360/currentPattern.bulletAmount * i + randomOffset;
				bulletManager.createBullet(currentPattern.bulletGraphic, 30, -1, angle, self.sprite.position, currentPattern.bulletSpeed, currentPattern.bulletLifespan);
				}
			break;
		
		case 'burst':
			var target = checkShootTarget();
			
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
					var burstSpreadAngle;
					if (currentPattern.burstSpreadAngle) 
						{
						burstSpreadAngle = currentPattern.burstSpreadAngle;
						} else 
						{
						burstSpreadAngle = 10;
						}
					var angle = game.physics.arcade.angleBetween(self.sprite, target.sprite) * 180/Math.PI + (i * burstSpreadAngle) + randomAngleOffset;
					
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
			var target = checkShootTarget();
			
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
	
var checkShootTarget = function ()
	{
	if(currentPattern.stickToTarget && !targetPlayer)
		{
		targetPlayer = getAliveFromObject(players);
		return targetPlayer;
		} else if (currentPattern.stickToTarget && targetPlayer)
		{
		return targetPlayer;
		} else {
		return getAliveFromObject(players);
		}
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
