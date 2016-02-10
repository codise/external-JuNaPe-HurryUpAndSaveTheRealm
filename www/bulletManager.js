'use strict';

function bulletManager(game)
{
var self = this;
console.log(game);
self.game = game;

self.playerBullets = self.game.add.group();
self.playerBullets.enableBody = true;
self.playerBullets.physicsBodyType = Phaser.Physics.ARCADE;
self.playerBulletPool = 10;

self.enemyBullets = self.game.add.group();
self.enemyBullets.enableBody = true;
self.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
self.enemyBulletPool = 10;

self.bulletSpeed = 1000;


self.createBullet = (type, playerid, angle, pos) => // Type of bullet, player which shot the bullet, if enemybullet then -1, bullet direction, bullet position
	{
  if (playerid >= 0)
  {
    if (self.playerBulletPool > 0)
    {
      switch (type)
      {
        case 'arrow':
          var bullet = self.playerBullets.create(pos.x, pos.y, 'arrow');
          // Other type spesific attributes
          break;
        case 'magic':
          var bullet = self.playerBullets.create(pos.x, pos.y, 'magic');
          break;
        default:
          var bullet = self.playerBullets.create(pos.x, pos.y, 'magic');
      }
      self.playerBulletPool--;
    }
  } else
  {
    if (self.enemyBulletPool > 0)
    {
      switch (type)
      {
        case 'mosquitoBullet':
          var bullet = self.enemyBullets.create(pos.x, pos.y, 'mosquitoBullet');
          break;
        default:
          var bullet = self.enemyBullets.create(pos.x, pos.y, 'enemyBullet');
      }
      self.enemyBulletPool--;
    }
  }
  if (bullet != undefined)
  {
		bullet.checkWorldBounds = true;
    bullet.events.onOutOfBounds.add(self.killbullet, this);
    bullet.anchor.setTo(0.5, 0.5);
		self.game.physics.arcade.velocityFromAngle(angle, self.bulletSpeed, bullet.body.velocity);
	}
	}

self.killbullet = (bullet) =>
  {
  bullet.destroy()
  };

self.update = () =>
  {
  self.enemyBulletPool = 10 - self.enemyBullets.length;
  self.playerBulletPool = 10 - self.playerBullets.length;
  }


}
