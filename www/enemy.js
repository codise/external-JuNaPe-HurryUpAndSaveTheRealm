'use strict';

function Enemy(enemyInfo, game, bulletManager, player, position)
{
var self = this;


self.maxSpeed = enemyInfo.maxSpeed;

self.enemySprite = game.add.sprite(position.x, position.y, enemyInfo.sprite);
self.enemySprite.anchor.setTo(0.5, 0.5);
self.flipped = false;

self.nextMove = 0;
self.moveRate = 2500;
self.movementScheme = enemyInfo.movementScheme;

self.xDirection = [1, -1];
//self.yDirection = [1, -1];

self.fireRate = 5000;
self.nextFire = 0;
self.shootingScheme = enemyInfo.shootingScheme;

self.maxHealth = 10;
self.currentHealth = self.maxHealth;
self.dead = false;

self.player = player;

self.update = () =>
	{
	if(game.time.now > self.nextMove) 
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

	if (game.time.now > self.nextFire)
		{
		fire();
		}

	if(bulletManager.playerBulletCount > 0) 
		{
		for (var i = 0; i < bulletManager.playerBulletGroups.length; i++)
			{
			game.physics.arcade.overlap(bulletManager.playerBulletGroups[i], self.enemySprite, self.enemyHit, null, self); 
			}
		}

	};

self.enemyHit = function(enemy, bullet) 
	{
	bullet.kill();
	self.enemyTakeDamage(1);
	};


self.enemyTakeDamage = function(damage) 
	{
	self.currentHealth = self.currentHealth-damage;
	if(self.currentHealth <= 0)
		{
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
			if(self.player != undefined)
				{
				var angle = game.physics.arcade.angleBetween(self.enemySprite, self.player.playerSprite) * 180/Math.PI;
				game.physics.arcade.velocityFromAngle(angle, self.maxSpeed, self.enemySprite.body.velocity);
				} else {
				console.log('tried to charge at undefined player');
				}
			
			break;
		default:
			var angle = Math.floor(Math.random()*181);
		angle *= self.xDirection[Math.floor(Math.random()*2)];
		game.physics.arcade.velocityFromAngle(angle, self.maxSpeed, self.enemySprite.body.velocity);
		/*self.enemySprite.body.velocity.x = self.xDirection[Math.floor(Math.random() * 2)]*50;
		self.enemySprite.body.velocity.y = self.yDirection[Math.floor(Math.random() * 2)]*50;*/
		}
	self.nextMove = game.time.now + self.moveRate;
	};

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
	self.nextFire = game.time.now + self.fireRate;
	};

var createRadialPulse = (n) =>
	{
	// Creates n bullets radially from monster
	for (var i = 0; i < n; i++)
		{
		bulletManager.createBullet('enemyBullet', -1, 360/n * i, self.enemySprite.position);
		}
	};

var createDirectedBurst = (n) =>
	{
	// Creates n bullets directed to player
	if(self.player != undefined)
		{	
		var angleBetween = game.physics.arcade.angleBetween(self.enemySprite, self.player.playerSprite) * 180/Math.PI;
		} else {
		console.log('tried to shoot at undefined player');
		}
	for (var i = 0; i < n; i++)
		{
		bulletManager.createBullet('enemyBullet', -1, angleBetween, self.enemySprite.position);
		}
	};
		

}
