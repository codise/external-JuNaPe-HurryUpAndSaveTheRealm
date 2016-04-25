'use strict';

function SpecialBullet (bulletSprite, type)
{

var self = this;
var sprite = bulletSprite;

var getPerpendicularVec = function (vec)
	{
	return normalize({x: vec.y/(vec.y-vec.x), y: vec.x/(vec.x-vec.y)});
	};


var vecLength = function (vec)
	{
	return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
	};

var normalize = function (vec) 
	{
	var length = vecLength(vec);
	return {x: vec.x/length, y: vec.y/length};
	};


var perpendicularVec = getPerpendicularVec(sprite.body.velocity);

var origLength = vecLength(bulletSprite.body.velocity);
self.dead = false;


self.update = function ()
	{
	if (sprite.alive === false) self.dead = true;

	if (self.dead === false)
		{
		switch (type)
			{
			case 'sine':
				moveBulletSine(sprite, 5, 1);
				break;
			case 'sawTooth':
				moveBulletSawTooth(sprite);
				break;
			default:
				moveBulletSine(sprite, 5, 1);
			}
		}
	};
// Sine wave
var sineClock = 0;

var moveBulletSine = function (bullet, amplitude, freqNum)
	{
	var newVelocityDeltaX = amplitude * Math.cos(freqNum * sineClock) * perpendicularVec.x;
	var newVelocityDeltaY = amplitude * Math.cos(freqNum * sineClock) * perpendicularVec.y;
	var newVelocity = {x: bullet.body.velocity.x + newVelocityDeltaX, y: bullet.body.velocity.y + newVelocityDeltaY};
	var normalizedVec = normalize(newVelocity);
	bullet.body.velocity.x = origLength * normalizedVec.x;
	bullet.body.velocity.y = origLength * normalizedVec.y;
	sineClock += 0.05;
	};

var sawClock = 0;
var nextDirChange = 0;
var moveBulletSawTooth = function (bullet, amplitude, freqNum)
	{
	if (nextDirChange >= sawClock)
		{
	
	

}
	
