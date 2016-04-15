'use strict';

function BulletManager(game)
{
var self = this;

self.playerBulletGroups = [];

var enemyMaxBullets= 300;
var playerMaxBullets = 200;

var enemyBulletPool = enemyMaxBullets;
var playerBulletPool = playerMaxBullets;

/*
var playerArrowBullets = game.add.group();
playerArrowBullets.enableBody = true;
playerArrowBullets.physicsBodyType = Phaser.Physics.ARCADE;
playerArrowBullets.createMultiple(playerBulletPool, 'arrow');
*/
var playerMagicBullets = game.add.group();
playerMagicBullets.enableBody = true;
playerMagicBullets.physicsBodyType = Phaser.Physics.ARCADE;
playerMagicBullets.createMultiple(playerBulletPool, 'magic');


//knight bullet
var playerBullets1 = game.add.group();
playerBullets1.enableBody = true;
playerBullets1.physicsBodyType = Phaser.Physics.ARCADE;
playerBullets1.createMultiple(playerBulletPool, 'bullet1');

//elf bullet
var playerBullets2 = game.add.group();
playerBullets2.enableBody = true;
playerBullets2.physicsBodyType = Phaser.Physics.ARCADE;
playerBullets2.createMultiple(playerBulletPool, 'bullet2');

//mage bullet
var playerBullets3 = game.add.group();
playerBullets3.enableBody = true;
playerBullets3.physicsBodyType = Phaser.Physics.ARCADE;
playerBullets3.createMultiple(playerBulletPool, 'bullet3');

//viking bullet
var playerBullets4 = game.add.group();
playerBullets4.enableBody = true;
playerBullets4.physicsBodyType = Phaser.Physics.ARCADE;
playerBullets4.createMultiple(playerBulletPool, 'bullet4');

//ninja bullet
var playerBullets5 = game.add.group();
playerBullets5.enableBody = true;
playerBullets5.physicsBodyType = Phaser.Physics.ARCADE;
playerBullets5.createMultiple(playerBulletPool, 'bullet5');

//warlock bullet
var playerBullets6 = game.add.group();
playerBullets6.enableBody = true;
playerBullets6.physicsBodyType = Phaser.Physics.ARCADE;
playerBullets6.createMultiple(playerBulletPool, 'bullet6');


self.playerBulletGroups.push(playerBullets1);
self.playerBulletGroups.push(playerBullets2);
self.playerBulletGroups.push(playerBullets3);
self.playerBulletGroups.push(playerBullets4);
self.playerBulletGroups.push(playerBullets5);
self.playerBulletGroups.push(playerBullets6);

/*
self.playerBulletGroups.push(playerArrowBullets);
self.playerBulletGroups.push(playerMagicBullets);
*/

self.enemyBulletGroups = [];

var enemyGenericBullets = game.add.group();
enemyGenericBullets.enableBody = true;
enemyGenericBullets.physicsBodyType = Phaser.Physics.ARCADE;
enemyGenericBullets.createMultiple(enemyBulletPool, 'magic');

self.enemyBulletGroups.push(enemyGenericBullets);

//blue
var enemyBullets1 = game.add.group();
enemyBullets1.enableBody = true;
enemyBullets1.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets1.createMultiple(enemyBulletPool, 'enemyBullet1');

//spike
var enemyBullets2 = game.add.group();
enemyBullets2.enableBody = true;
enemyBullets2.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets2.createMultiple(enemyBulletPool, 'enemyBullet2');

//bone
var enemyBullets3 = game.add.group();
enemyBullets3.enableBody = true;
enemyBullets3.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets3.createMultiple(enemyBulletPool, 'enemyBullet3');

//yellow
var enemyBullets4 = game.add.group();
enemyBullets4.enableBody = true;
enemyBullets4.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets4.createMultiple(enemyBulletPool, 'enemyBullet4');

//red
var enemyBullets5 = game.add.group();
enemyBullets5.enableBody = true;
enemyBullets5.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets5.createMultiple(enemyBulletPool, 'enemyBullet5');

//fireball
var enemyBullets6 = game.add.group();
enemyBullets6.enableBody = true;
enemyBullets6.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets6.createMultiple(enemyBulletPool, 'enemyBullet6');

//sword
var enemyBullets7 = game.add.group();
enemyBullets7.enableBody = true;
enemyBullets7.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets7.createMultiple(enemyBulletPool, 'enemyBullet7');

//boss 2 sparky
var enemyBullets8 = game.add.group();
enemyBullets8.enableBody = true;
enemyBullets8.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets8.createMultiple(enemyBulletPool, 'enemyBullet8');

//sparky line
var enemyBullets9 = game.add.group();
enemyBullets9.enableBody = true;
enemyBullets9.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets9.createMultiple(enemyBulletPool, 'enemyBullet9');

//fork
var enemyBullets10 = game.add.group();
enemyBullets10.enableBody = true;
enemyBullets10.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets10.createMultiple(enemyBulletPool, 'enemyBullet10');

//wave
var enemyBullets11 = game.add.group();
enemyBullets11.enableBody = true;
enemyBullets11.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets11.createMultiple(enemyBulletPool, 'enemyBullet11');

//slash?
var enemyBullets12 = game.add.group();
enemyBullets12.enableBody = true;
enemyBullets12.physicsBodyType = Phaser.Physics.ARCADE;
enemyBullets12.createMultiple(enemyBulletPool, 'enemyBullet12');

self.enemyBulletGroups.push(enemyBullets1);
self.enemyBulletGroups.push(enemyBullets2);
self.enemyBulletGroups.push(enemyBullets3);
self.enemyBulletGroups.push(enemyBullets4);
self.enemyBulletGroups.push(enemyBullets5);
self.enemyBulletGroups.push(enemyBullets6);
self.enemyBulletGroups.push(enemyBullets7);
self.enemyBulletGroups.push(enemyBullets8);
self.enemyBulletGroups.push(enemyBullets9);
self.enemyBulletGroups.push(enemyBullets10);
self.enemyBulletGroups.push(enemyBullets11);
self.enemyBulletGroups.push(enemyBullets12);

self.enemyBulletCount;
self.playerBulletCount;

//var bulletSpeed = 200;

//var bulletLifespan = 1000;

var scale = function (listOfGroups)
	{
	for (var i = 0; i < listOfGroups.length; i++)
		{
		listOfGroups[i].setAll('scale.x', scalingFactors.x);
		listOfGroups[i].setAll('scale.y', scalingFactors.y);
		}
	};

// Type of bullet, player which shot the bullet, if enemybullet then -1, bullet direction, bullet position
self.createBullet = function (type, damage, playerid, angle, pos, bulletSpeed, bulletLifespan)
	{
	if (playerid >= 0)
		{
		if (playerBulletPool > 0)
			{
			switch (type)
				{
//				case 'arrow':
//					var bullet = playerArrowBullets.getFirstDead();
//					// Other type spesific attributes
//					break;
//				case 'magic':
//					var bullet = playerMagicBullets.getFirstDead();
//					/*var flame = self.game.add.sprite(pos.x, pos.y, 'flame');
//					self.game.physics.enable(flame, Phaser.Physics.ARCADE);
//					flame.anchor.setTo(0.5, 0.5);
//					flame.alpha = 1;
//					self.game.add.tween(flame).to({alpha: 0}, 100, "Linear", true);
//					self.game.physics.arcade.velocityFromAngle(angle, self.bulletSpeed, flame.body.velocity);
//					flame.events.onOutOfBounds.add(flame.destroy, this);*/
//					break;
				case 'bullet1':
					var bullet = playerBullets1.getFirstDead();
					break;
				case 'bullet2':
					var bullet = playerBullets2.getFirstDead();
					break;
				case 'bullet3':
					var bullet = playerBullets3.getFirstDead();
					break;
				case 'bullet4':
					var bullet = playerBullets4.getFirstDead();
					break;
				case 'bullet5':
					var bullet = playerBullets5.getFirstDead();
					break;
				case 'bullet6':
					var bullet = playerBullets6.getFirstDead();
					break;
				default:
					var bullet = playerMagicBullets.getFirstDead();
				}
			bullet.playerId = playerid;
			playerBulletPool--;
			}
		} else
		{
		if (enemyBulletPool > 0)
			{
			switch (type)
				{
				case 'enemyBullet1':
					var bullet = enemyBullets1.getFirstDead();
					break;
				case 'enemyBullet2':
					var bullet = enemyBullets2.getFirstDead();
					break;
				case 'enemyBullet3':
					var bullet = enemyBullets3.getFirstDead();
					break;
				case 'enemyBullet4':
					var bullet = enemyBullets4.getFirstDead();
					break;
				case 'enemyBullet5':
					var bullet = enemyBullets5.getFirstDead();
					break;
				case 'enemyBullet6':
					var bullet = enemyBullets6.getFirstDead();
					break;
				case 'enemyBullet7':
					var bullet = enemyBullets7.getFirstDead();
					break;
				case 'enemyBullet8':
					var bullet = enemyBullets8.getFirstDead();
					break;
				case 'enemyBullet9':
					var bullet = enemyBullets9.getFirstDead();
					break;
				case 'enemyBullet10':
					var bullet = enemyBullets10.getFirstDead();
					break;
				case 'enemyBullet11':
					var bullet = enemyBullets11.getFirstDead();
					break;
				case 'enemyBullet12':
					var bullet = enemyBullets12.getFirstDead();
					break;
				default:
					var bullet = enemyGenericBullets.getFirstDead();
				}
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
		game.physics.arcade.velocityFromAngle(angle, bulletSpeed, bullet.body.velocity);
		bullet.damage = damage;
		}
	};

self.killbullet = function (bullet)
	{
	bullet.kill()
	};

self.update = function ()
	{
	scale(self.enemyBulletGroups);
	scale(self.playerBulletGroups);

	self.enemyBulletCount = countLiveBullets(self.enemyBulletGroups);
	self.playerBulletCount = countLiveBullets(self.playerBulletGroups);
	enemyBulletPool = enemyMaxBullets - self.enemyBulletCount;
	playerBulletPool = playerMaxBullets - self.playerBulletCount;
	//console.log(enemyBulletPool)
	};

/*
* Calculates the number of bullets currently alive on the screen
* @param {Array} groupList - The group containing all the bullets
* @returns {Number} The number of bullets alive on the screen
*/

var countLiveBullets = function (groupList)
	{
	var count = 0;
	for (var i = 0; i < groupList.length; i++)
		{
		count += groupList[i].countLiving();
		}
	return count;
	};
}



