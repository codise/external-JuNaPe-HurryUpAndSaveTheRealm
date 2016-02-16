'use strict';

function Enemy(enemyInfo, game, bulletManager, player, position)
{
var self = this;


self.game = game;
self.bulletManager = bulletManager;
self.maxSpeed = enemyInfo.maxSpeed;

self.enemySprite = self.game.add.sprite(position.x, position.y, enemyInfo.sprite);
self.enemySprite.anchor.setTo(0.5, 0.5);
self.flipped = false;

self.nextMove = 0;
self.moveRate = 2500;
self.movementScheme = enemyInfo.movementScheme;

self.xDirection = [1, -1];
self.yDirection = [1, -1];

self.fireRate = 5000;
self.nextFire = 0;
self.shootingScheme = enemyInfo.shootingScheme;

self.maxHealth = 10;
self.currentHealth = self.maxHealth;
self.dead = false;

self.player = player;

self.update = () =>
    {
    if(self.game.time.now > self.nextMove) 
    {
			move();
    }
    if (self.enemySprite.body.velocity.x > 0 && self.flipped)
    {
    self.enemySprite.scale.x = 1;
    self.flipped = false;
    } else if (self.enemySprite.body.velocity.x < 0 && !self.flipped)
    {
    self.enemySprite.scale.x = -1;
    self.flipped = true;
    }

    if (self.game.time.now > self.nextFire)
    {
    	fire();
    }

    if(self.bulletManager.playerBullets.length > 0) 
    {
      self.game.physics.arcade.overlap(self.bulletManager.playerBullets, self.enemySprite, self.enemyHit, null, self); 
    }

    };

self.enemyHit = function() 
  {
    self.enemyTakeDamage(10);
  };


self.enemyTakeDamage = function(damage) 
  {
    self.currentHealth = self.currentHealth-damage;
    if(self.currentHealth <= 0) {
      self.enemySprite.dead = true;
    }
  };

self.kill = () =>
    {
    self.enemySprite.destroy();
    };

var move = () =>
	{
	switch (self.movementScheme)
	{
		case 'chargeSingle':
			var angle = self.game.physics.arcade.angleBetween(self.enemySprite, self.player.playerSprite) * 180/Math.PI;
			self.game.physics.arcade.velocityFromAngle(angle, self.maxSpeed, self.enemySprite.body.velocity);

			break;
		default:
    	self.enemySprite.body.velocity.x = self.xDirection[Math.floor(Math.random() * 2)]*50;
    	self.enemySprite.body.velocity.y = self.yDirection[Math.floor(Math.random() * 2)]*50;
	}
  self.nextMove = self.game.time.now + self.moveRate;
	}

var fire = () =>
	{
	switch (self.shootingScheme[1])
	{
		case 'directedBurst':
			createDirectedBurst(self.shootingScheme[0]);
			break;
		default:
			createRadialPulse(self.shootingScheme[0]);	

	}
  self.nextFire = self.game.time.now + self.fireRate;
	}

var createRadialPulse = (n) =>
	{
	// Creates n bullets radially from monster
	
	for (var i = 0; i < n; i++)
	{
		self.bulletManager.createBullet('enemyBullet', -1, 360/n * i, self.enemySprite.position);
	}
	}

var createDirectedBurst = (n) =>
	{
	// Creates n bullets directed to player
	
	var angleBetween = self.game.physics.arcade.angleBetween(self.enemySprite, self.player.playerSprite) * 180/Math.PI;
	
	for (var i = 0; i < n; i++)
	{
		self.bulletManager.createBullet('enemyBullet', -1, angleBetween, self.enemySprite.position);
	}
	}
		

}
