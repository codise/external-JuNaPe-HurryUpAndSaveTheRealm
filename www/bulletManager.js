'use strict';

function BulletManager(game)
{
var self = this;

var enemyMaxBullets= 300;
var playerMaxBullets = 200;

var enemyBulletPool = enemyMaxBullets;
var playerBulletPool = playerMaxBullets;

var specialBullets = [];

self.playerBulletGroup = game.add.group();
self.playerBulletGroup.enableBody = true;
self.playerBulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
self.playerBulletGroup.createMultiple(playerBulletPool, 'empty');
self.playerBulletGroup.setAll('alive', false);

self.enemyBulletGroup = game.add.group();
self.enemyBulletGroup.enableBody = true;
self.enemyBulletGroup.physicsBodyType = Phaser.Physics.ARCADE;
self.enemyBulletGroup.createMultiple(enemyBulletPool, 'empty');
self.enemyBulletGroup.setAll('alive', false);

self.enemyBulletCount;
self.playerBulletCount;


// Type of bullet, player which shot the bullet, if enemybullet then -1, bullet direction, bullet position
self.createBullet = function (type, damage, playerid, angle, pos, bulletSpeed, bulletLifespan, specialType = '')
	{
	if (playerid >= 0)
		{
		if (playerBulletPool > 0)
			{
			var bullet = self.playerBulletGroup.getFirstDead();
			bullet.loadTexture(type);
			bullet.playerId = playerid;
			playerBulletPool--;
			}
		} else
		{
		if (enemyBulletPool > 0)
			{
			var bullet = self.enemyBulletGroup.getFirstDead();
			bullet.loadTexture(type);
			enemyBulletPool--;
			}
		}
	if (bullet != undefined)
		{
		bullet.anchor.setTo(0.5, 0.5);
		bullet.reset(pos.x, pos.y);
		bullet.lifespan = bulletLifespan;
		bullet.body.setSize(bullet.width, bullet.width); //26x26 box pelaajalle
		bullet.angle = angle + 90;
		bullet.scale.x = scalingFactors.x;
		bullet.scale.y = scalingFactors.y;
		bullet.damage = damage;
		game.physics.arcade.velocityFromAngle(angle, bulletSpeed, bullet.body.velocity);
		if (specialType != '')
			{
			var newSpecialBullet = new SpecialBullet(bullet, specialType);
			specialBullets.push(newSpecialBullet);
			bullet.isSpecial = true;
			} else
			{
			bullet.isSpecial = false;
			}
		}
	};

self.killBullet = function (bullet)
	{
	bullet.kill()
	};

self.update = function ()
	{
	self.enemyBulletCount = self.enemyBulletGroup.countLiving();
	self.playerBulletCount = self.playerBulletGroup.countLiving();
	enemyBulletPool = enemyMaxBullets - self.enemyBulletCount;
	playerBulletPool = playerMaxBullets - self.playerBulletCount;
	specialBullets.forEach(function (bullet) { if (bullet != undefined) bullet.update(); });
	};


}



