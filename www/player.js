'use strict';

function Player(game, x, y, bulletmanager, id, weaponManager)
{
var self = this;

self.input;

self.id = id;


self.score = 0;

self.maxHealth = 1000;
self.currentHealth = self.maxHealth;
self.dead = false;


var bulletManager = bulletmanager;

var sprites = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6']
var randomSprite = sprites[Math.floor((Math.random() * 6))];
self.playerSprite = game.add.sprite(x, y, randomSprite);
self.playerSprite.anchor.setTo(0.5, 0.5);
self.flipped = false;
game.physics.enable(self.playerSprite, Phaser.Physics.ARCADE);
self.playerSprite.body.collideWorldBounds = true;
self.playerSprite.body.bounce = (1,1);
var textureWidth = self.playerSprite.width;
var textureHeight = self.playerSprite.height;

/*self.weapon = weaponManager.getNewWeapon(self);
self.weaponSprite = self.weapon.weaponSprite;*/

var fireRate = 100;
var nextFire = 0;

var movementSpeed = 200;

var respawnTime = 100;
var nextRespawn = 0;

var pHUD = new playerHud(game,self);

var cameraPadding = 20;

var headingPoint = new Phaser.Point();
var vectorPoint = new Phaser.Point();
vectorPoint.x = -1;
vectorPoint.y = 0;

var scale = () =>
	{
	self.playerSprite.scale.x = scalingFactors.x;
	self.playerSprite.scale.y = scalingFactors.y;
	};

self.setInput = (input) =>
	{
	self.input = input;
	};

self.update = () =>
	{

	scale();

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
				headingPoint.x = i.sX;
				headingPoint.y = i.sY;
				bulletManager.createBullet('magic', self.id, (Phaser.Point.angle(headingPoint, vectorPoint) * 360/Math.PI), self.playerSprite.position);
				}
			self.weaponSprite.x = self.playerSprite.position.x;
			self.weaponSprite.y = self.playerSprite.position.y;
			//TODO: weapon rotate
			}

		//We should only check for collisions when there are collidable objects on screen
		if(bulletManager.enemyBulletCount > 0)
			{
			game.physics.arcade.overlap(bulletManager.enemyBulletGroups, self.playerSprite, self.playerHit, null, self);
			}

		} else if (self.dead && nextRespawn < 0) {
		self.playerSprite.exists = true;
		self.dead = false;
		self.currentHealth = self.maxHealth;
		} else {
		nextRespawn--;
		}

		// We always check if the player has fallen behing the camera

		if (self.playerSprite.position.x < game.camera.x + cameraPadding)
		{
			self.playerSprite.position.x = game.camera.x + cameraPadding;
		} else if (self.playerSprite.position.x > game.camera.x + game.camera.width - cameraPadding)
		{
			self.playerSprite.position.x = game.camera.x + game.camera.width - cameraPadding;
		}

		if (self.playerSprite.position.y < game.camera.y + cameraPadding)
		{
			self.playerSprite.position.y = game.camera.y + cameraPadding;
		} else if (self.playerSprite.position.y > game.camera.y + game.camera.height - cameraPadding)
		{
			self.playerSprite.position.y = game.camera.y + game.camera.height - cameraPadding;
		}
	};

self.playerHit = function(player, bullet)
	{
	bulletManager.killbullet(bullet);
	self.takeDamage(10);
	//console.log(self.currentHealth);
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

self.getPoints = () =>
	{
	self.score += 1;
	};
}
