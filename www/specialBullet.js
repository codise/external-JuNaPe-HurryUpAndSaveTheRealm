'use strict';

function SpecialBullet (bulletSprite, type)
{

var self = this;
var sprite = bulletSprite;

var getPerpendicularVec = function (vec)
	{
	return ({x: vec.y/(vec.y-vec.x), y: vec.x/(vec.x-vec.y)});
	};


var vecLength = function (vec)
	{
	return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
	};

var perpendicularVec = getPerpendicularVec(sprite.body.velocity);

var origLength = vecLength(bulletSprite.body.velocity);
self.dead = false;


self.update = function ()
	{
	if (sprite.alive = false) self.dead = true;

	if (self.dead === false)
		{
		switch (type)
			{
			case 'sine':
				moveBulletSine(sprite);
				break;
			case 'sawTooth':
				moveBulletSawTooth(sprite);
				break;
			default:
				moveBulletSine(sprite);
			}
		}
	};
var normalize = function (vec) 
	{
	var length = vecLength(vec);
	return {x: vec.x/length, y: vec.y/length};
	};
var moveBulletSine = function (bullet)
	{
	var newVelocityDeltaX = 10 *Math.cos(1000 * game.time.now) * perpendicularVec.x;
	var newVelocityDeltaY = 10 *Math.cos(1000 * game.time.now) * perpendicularVec.y;
	var newVelocity = {x: bullet.body.velocity.x + newVelocityDeltaX, y: bullet.body.velocity.y + newVelocityDeltaY};
	var normalizedVec = normalize(newVelocity);
	bullet.body.velocity.x = origLength * normalizedVec.x;
	bullet.body.velocity.y = origLength * normalizedVec.y;
	console.log(newVelocityDeltaX, newVelocityDeltaY);
	};

}
	
