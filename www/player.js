'use strict';

function Player(game, x, y, bulletManager, id, weaponManager)
{
var self = this;

var bullets = ['bullet1', 'bullet2', 'bullet3', 'bullet4', 'bullet5', 'bullet6'];
var sprites = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6'];
var input;
//self.playerClass = Math.floor((Math.random() * 6)); //rand 0-5
self.playerClass;
self.playerName;
self.id = id;

self.score = 0;

self.maxHealth = 200;
self.currentHealth = self.maxHealth;
self.dead = false;
//var randomSprite = sprites[Math.floor((Math.random() * 6))];

self.sprite = game.add.sprite(x, y, 'empty');
self.sprite.anchor.setTo(0.5, 0.5);
self.sprite.exists = false;
var setupDone = false;

var flipped = false;

var fireRate = 200;
var nextFire = 0;

var movementSpeed = 200;

var respawnTime = 100;
var nextRespawn = 0;

var bulletDamage = 2;
var bulletSpeed = 1000;
var bulletLifespan = 1000;

var cameraPadding = 20;

var headingPoint = new Phaser.Point();
var vectorPoint = new Phaser.Point();
vectorPoint.x = -1;
vectorPoint.y = 0;

var pHUD;

//>>DEBUG
//setClassAndName(0, "test");
//createPlayer();
//<<

var scale = () =>
	{
	if (flipped)
		{
		self.sprite.scale.x = -scalingFactors.x;
		} else
		{
		self.sprite.scale.x = scalingFactors.x;
		}
	self.sprite.scale.y = scalingFactors.y;
	};

function createPlayer ()
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

self.setInput = (inputArray) =>
	{
	input = inputArray;
	};

//called by controller once it is created
function setClassAndName (pClass, pName)
	{
	self.playerClass = pClass;
	self.playerName = pName;
	//console.log('pname: ' + self.playerName + ', pclass: ' + self.playerClass);
	};
	
self.update = () =>
	{
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

		} else if (self.dead && nextRespawn < 0) {
		self.sprite.exists = true;
		self.dead = false;
		self.currentHealth = self.maxHealth;
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
	var damage = bullet.damage;
	//console.log(damage);
	bulletManager.killbullet(bullet);
	self.takeDamage(damage);
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
	self.sprite.exists = false;
	nextRespawn = respawnTime;
	};

self.getPoints = () =>
	{
	self.score += 1;
	};
}
