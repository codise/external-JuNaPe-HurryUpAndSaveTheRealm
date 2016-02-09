'use strict';

function Player(game, x, y, bulletmanager, id)
{
var self = this;

self.input;

self.id = id;

self.game = game;
self.bulletManager = bulletmanager;
self.maxSpeed = 400;

self.playerSprite = self.game.add.sprite(x, y, 'player');
self.playerSprite.anchor.setTo(0.5, 0.5);
self.flipped = false;

self.game.physics.enable(self.playerSprite, Phaser.Physics.ARCADE);
self.playerSprite.body.collideWorldBounds = true;

self.fireRate = 100;
self.nextFire = 0;

self.setInput = (input) =>
    {
    self.input = input;
    }


self.update = () =>
	{
	if (self.input != undefined)
	{
    var i = self.input;
    self.playerSprite.body.velocity.x = i.X * 100;
    self.playerSprite.body.velocity.y = i.Y * 100;
    if (self.playerSprite.body.velocity.x > 0 && self.flipped)
    {
    self.playerSprite.scale.x = 1;
    self.flipped = false;
    } else if (self.playerSprite.body.velocity.x < 0 && !self.flipped)
    {
    self.playerSprite.scale.x = -1;
    self.flipped = true;
    }

    if ((i.sX != 0 || i.sX != 0) && (self.game.time.now > self.nextFire))
    {
      self.nextFire = self.game.time.now + self.fireRate;
      var heading = new Phaser.Point();
      heading.x = i.sX;
      heading.y = i.sY;
      self.bulletManager.createBullet('magic', self.id, heading, self.playerSprite.position);
    }
	}
	};

self.kill = () =>
	{
	self.playerSprite.destroy();
	};
}
