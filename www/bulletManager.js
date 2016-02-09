'use strict';

function bulletManager(game)
{
var self = this;
console.log(game);
self.game = game;
console.log(self.game);
self.bullets = self.game.add.group();
self.bullets.enableBody = true;
self.bullets.physicsBodyType = Phaser.Physics.ARCADE;
self.bulletPool = 10;
self.bulletSpeed = 1000;

var angleCalc = (heading) =>
	{
    var vector = new Phaser.Point();
    vector.x = -1;
    vector.y = 0;
    return (Phaser.Point.angle(heading, vector) * 360/Math.PI);
	}


self.createBullet = (type, playerid, heading, pos) =>
	{
	if (self.bulletPool > 0)
	{
		switch (type)
		{
			case 'arrow':
				var bullet = self.bullets.create(pos.x, pos.y, 'arrow');
				// Other type spesific attributes
				break;
			case 'magic':
				var bullet = self.bullets.create(pos.x, pos.y, 'magic');
				break;
			default:
		    var bullet = self.bullets.create(pos.x, pos.y, 'magic');
		}
		self.bulletPool--;
		bullet.checkWorldBounds = true;
    bullet.events.onOutOfBounds.add(self.killbullet, this);
    bullet.anchor.setTo(0.5, 0.5);
		var angle = angleCalc(heading);
    console.log(angle);
		self.game.physics.arcade.velocityFromAngle(angle, self.bulletSpeed, bullet.body.velocity);
	}
	}

self.killbullet = (bullet) =>
  {
  bullet.destroy()
  };

self.update = () =>
  {
  self.bulletPool = 10 - self.bullets.length;
  }


}
