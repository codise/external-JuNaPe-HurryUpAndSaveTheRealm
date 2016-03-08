'use strict';

function Player(game, x, y, bulletmanager, id)
{
var self = this;

self.input;

self.id = id;

bulletManager = bulletmanager;
var sprites = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6']
var randomSprite = sprites[Math.floor((Math.random() * 6))];
self.playerSprite = game.add.sprite(x, y, randomSprite);
self.playerSprite.anchor.setTo(0.5, 0.5);
self.flipped = false;
var textureWidth = self.playerSprite.width;
var textureHeight = self.playerSprite.height;


game.physics.enable(self.playerSprite, Phaser.Physics.ARCADE);
self.playerSprite.body.collideWorldBounds = true;

self.playerSprite.body.bounce = (1,1);

var fireRate = 100;
var nextFire = 0;

self.maxHealth = 1000;
self.currentHealth = self.maxHealth;
var movementSpeed = 200;

self.dead = false;
var respawnTime = 100;
var nextRespawn = 0;

var pHUD = new playerHud(game,self);

/*
self.healthBarOutline = game.add.graphics(0,0);
self.healthBarFill = game.add.graphics(0,0);
self.healthBarOutline.lineStyle(2,0x000000,1);
self.healthBarOutline.drawRect(self.playerSprite.X, self.playerSprite.Y, 100, 15);
self.healthBarFill.beginFill(0xff3300);
self.healthBarFill.drawRect(self.playerSprite.X, self.playerSprite.Y, (self.currentHealth/maxHealth*100), 13);
self.healthBarFill.endFill();
self.playerSprite.addChild(self.healthBarOutline);
self.playerSprite.addChild(self.healthBarFill);
self.healthBarOutline.x = - textureWidth/2;
self.healthBarFill.x = -textureWidth/2;;
self.healthBarOutline.y = textureHeight/2;
self.healthBarFill.y = textureHeight/2;
*/

self.setInput = (input) =>
	{
	self.input = input;
	}


self.update = () =>
	{
	if (!self.dead)
		{
		if (self.input != undefined)
			{
			var i = self.input;
			var length = i.moveLength;
			if(length > 1)
				{
				length = 1;
				}
			var angle = i.moveAngle;
			game.physics.arcade.velocityFromAngle(angle, movementSpeed * length, self.playerSprite.body.velocity);
			if (self.playerSprite.body.velocity.x > 0 && self.flipped)
				{
				self.playerSprite.scale.x = 1;
				self.flipped = false;
				} else if (self.playerSprite.body.velocity.x < 0 && !self.flipped) {
				self.playerSprite.scale.x = -1;
				self.flipped = true;
				}
			if ((i.sX != 0 || i.sX != 0) && (game.time.now > nextFire))
				{
				nextFire = game.time.now + fireRate;
				var heading = new Phaser.Point();
				heading.x = i.sX;
				heading.y = i.sY;
				bulletManager.createBullet('magic', self.id, headingToAngle(heading), self.playerSprite.position);
				}
			}
		//We should only check for collisions when there are collidable objects on screen
		if(bulletManager.enemyBulletCount > 0)
			{
			for (var i = 0; i < bulletManager.enemyBulletGroups.length; i++)
				{
				game.physics.arcade.overlap(bulletManager.enemyBulletGroups[i], self.playerSprite, self.playerHit, null, self);
				}
			}
		} else if (self.dead && nextRespawn < 0) {
		self.playerSprite.exists = true;
		self.dead = false;
		self.currentHealth = self.maxHealth;
		} else {
		nextRespawn--;
		}
	};

self.playerHit = function(player, bullet)
	{
	self.takeDamage(10);
	bullet.kill();
	};

self.takeDamage = function(damage)
	{
	self.currentHealth = self.currentHealth-damage;
	if(self.currentHealth <= 0) 
		{
		self.dead = true;
		self.kill();
		self.currentHealth = 0;
		}
		pHUD.updateHealthBar();
	};

self.kill = () =>
	{
	self.playerSprite.exists = false;
	nextRespawn = respawnTime;
	};

var headingToAngle = (heading) =>
	{
	var vector = Phaser.Point();
	vector.x = -1;
	vector.y = 0;
	return (Phaser.Point.angle(heading, vector) * 360/Math.PI);
	};

}
