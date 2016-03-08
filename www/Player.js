'use strict';

function Player(game, x, y, bulletmanager, id)
{
var self = this;

var sprites = ['player1', 'player2', 'player5', 'player6', 'player4', 'player3'];
self.input;
//self.playerClass = Math.floor((Math.random() * 6)); //rand 0-5
self.playerClass = 0;
self.playerName;
self.id = id;

bulletManager = bulletmanager;

self.playerSprite = game.add.sprite(x, y, 'empty');

var fireRate = 100;
var nextFire = 0;

self.maxHealth = 1000;
self.currentHealth = self.maxHealth;
var movementSpeed = 200;

self.dead = false;
var respawnTime = 100;
var nextRespawn = 0;


var headingPoint = new Phaser.Point();
var vectorPoint = new Phaser.Point();
vectorPoint.x = -1;
vectorPoint.y = 0;

var pHUD;

function createPlayer()
	{
	self.playerSprite.loadTexture(sprites[self.playerClass]);
	self.playerSprite.anchor.setTo(0.5, 0.5);
	self.flipped = false;
	//var textureWidth = self.playerSprite.width;
	//var textureHeight = self.playerSprite.height;
	
	game.physics.enable(self.playerSprite, Phaser.Physics.ARCADE);
	self.playerSprite.body.collideWorldBounds = true;
	
	self.playerSprite.body.bounce = (1,1);

	pHUD = new playerHud(game,self);
	pHUD.setPlayerName(self.playerName);
	};

self.setInput = (input) =>
	{
	self.input = input;
	};

//called by controller once it is created
self.setClassAndName = (pClass, pName) =>
	{
	self.playerClass = pClass;
	self.playerName = pName;
	createPlayer();
	};

self.update = () =>
	{
	console.log("sprite width: " + self.playerSprite.width);
	
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
}
