'use strict';

function SpecialBullet (bulletSprite, info)
{

var self = this;
var sprite = bulletSprite;

var type = info.type;
var amplitude = info.amplitude;
var freqNum = info.freqNum;

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

var vectorSum = function (vec1, vec2)
	{
	return {x: vec1.x + vec2.x, y: vec1.y + vec2.y};
	};

var times = function (scalar, vec)
	{
	return {x: scalar * vec.x, y: scalar * vec.y};
	};

var dot = function (vec1, vec2)
	{
	return vec1.x * vec2.x + vec1.y * vec2.y;
	};

self.dead = false;


self.update = function ()
	{
	if (sprite.alive === false) self.dead = true;

	if (self.dead === false)
		{
		switch (type)
			{
			case 'sine':
				moveBulletSine(sprite, amplitude, freqNum);
				break;
			case 'sawTooth':
				moveBulletSawTooth(sprite, amplitude, freqNum);
				break;
			default:
				moveBulletSine(sprite, amplitude, freqNum);
			}
		}
	};

var perpendicularVec = normalize(getPerpendicularVec(sprite.body.velocity));
var started = false;

// Sine wave
var sineClock = 0;
var tau = Math.PI * 2;
var origLength = vecLength(bulletSprite.body.velocity);
var freq;

var moveBulletSine = function (bullet, amplitude, waveTime)
	{
	if (!started)
		{
		freq = 1/(2 * waveTime);
		started = true;
		}
	var factor = amplitude * Math.cos(tau * freq * sineClock);
	var newVelocity = vectorSum(bullet.body.velocity, times(factor, perpendicularVec));
	var normalizedVec = normalize(newVelocity);
	bullet.body.velocity.x = origLength * normalizedVec.x;
	bullet.body.velocity.y = origLength * normalizedVec.y;
	sineClock += 0.05;
	};

var sawClock = 0;
var nextDirChange;
var directionVec;
var origVec = {};
var origVecNorm;

var moveBulletSawTooth = function (bullet, amplitude, waveTime)
	{
	if (!started)
		{
		length = Math.sqrt(Math.pow(vecLength(bullet.body.velocity) * waveTime, 2) + Math.pow(amplitude, 2));
		origVec.x = bullet.body.velocity.x;
		origVec.y = bullet.body.velocity.y;
		directionVec = times(length, normalize(vectorSum(bullet.body.velocity, times(amplitude, perpendicularVec))));
		nextDirChange = waveTime;
		origVecNorm = normalize(origVec);
		started = true;
		} else
		{
		if (nextDirChange <= sawClock)
			{
			var negDirect = times(-1, directionVec);
			var newDirectionVec = vectorSum(negDirect, times(-1, times(2 * dot(negDirect, origVecNorm), origVecNorm)));
			directionVec = newDirectionVec;
			nextDirChange += waveTime;
			}
		}
	bullet.body.velocity.x = directionVec.x;
	bullet.body.velocity.y = directionVec.y;

	sawClock += 0.05;
	};	

		
	

}
	
