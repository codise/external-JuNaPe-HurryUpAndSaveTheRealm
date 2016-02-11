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

self.enemySprite.body.collideWorldBounds = true;

self.nextMove = 0;
self.moveRate = 2500;
self.xDirection = [1, -1];
self.yDirection = [1, -1];

self.fireRate = 5000;
self.nextFire = 0;

self.player = player;

self.update = () =>
    {
    if(self.game.time.now > self.nextMove) 
    {
    self.enemySprite.body.velocity.x = self.xDirection[Math.floor(Math.random() * 2)]*50;
    self.enemySprite.body.velocity.y = self.yDirection[Math.floor(Math.random() * 2)]*50;
    self.nextMove = self.game.time.now + self.moveRate;
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
    	self.nextFire = self.game.time.now + self.fireRate;
    	createRadialPulse(self.bulletManager);
    }

    
    };

self.kill = () =>
    {
    self.enemySprite.destroy();
    };

var createRadialPulse = (bManager) =>
	{
	// Creates five bullets radially from monster
	
	for (var i = 0; i < 5; i++)
	{
	bManager.createBullet('enemyBullet', -1, 360/5 * i, self.enemySprite.position);
	}
	}
}
