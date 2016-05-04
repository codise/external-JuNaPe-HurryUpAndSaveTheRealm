'use strict';

/* This is a currently unused type of bullet, which takes the sprite
and an info object. Info object is of type:

	{type: A, amplitude: B, waveTime: C},

where:
	A is one of 'sine'/'sawTooth',
	B is a real number,
	C is a real number.
*/

function SpecialBullet (bulletSprite, info)
{
var self = this;
var sprite = bulletSprite;

var type = info.type;
var amplitude = info.amplitude;
var waveTime = info.waveTime;

/* Here we just define lot of vector functions which help in defining 
	 the movement patterns of the bullets 
*/

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

var rotate = function (angle, vec)
	{
	var x = vec.x * Math.cos(angle) + vec.y * Math.sin(angle);
	var y = vec.y * Math.cos(angle) - vec.x * Math.sin(angle);
	return {x: x, y: y};
	};

// End of vector functions


self.dead = false;

// Main update function, which is responsible for updating the bullets' velocity

self.update = function ()
	{
	if (sprite.alive === false) self.dead = true;

	if (self.dead === false)
		{
		switch (type)
			{
			case 'sine':
				moveBulletSine(sprite, amplitude, waveTime);
				break;
			case 'sawTooth':
				moveBulletSawTooth(sprite, amplitude, waveTime);
				break;
			default:
				moveBulletSine(sprite, amplitude, waveTime);
			}
		}
	};

/* Variables useful in both the sine wave and sawtooth wave definition */

var perpendicularVec = normalize(getPerpendicularVec(sprite.body.velocity));
var started = false;
var tau = Math.PI * 2;
var origLength = vecLength(bulletSprite.body.velocity);
var freq;

// Sine wave

var sineClock = 0;

var moveBulletSine = function (bullet, amplitude, period)
	{
	if (!started)
		{
		freq = 1/period;
		started = true;
		}
	var factor = (amplitude * Math.cos(tau * freq * sineClock))/(period);
	var newVelocity = vectorSum(bullet.body.velocity, times(factor, perpendicularVec));
	var normalizedVec = normalize(newVelocity);
	bullet.body.velocity.x = origLength * normalizedVec.x;
	bullet.body.velocity.y = origLength * normalizedVec.y;
	sineClock += 0.05;
	};

// Sawtooth wave

var sawClock = 0;

var directionVec;
var origVec = {};
var origVecNorm;
var flipped = false;

var moveBulletSawTooth = function (bullet, amplitude, period)
	{
	if (!started)
		{
		origVec.x = bullet.body.velocity.x;
		origVec.y = bullet.body.velocity.y;
		origVecNorm = normalize(origVec);
		freq = 1/period;
		var alpha = Math.tan(2 * amplitude / period);
		directionVec = rotate(alpha, origVec);
		started = true;
		}

	var factor = amplitude * Math.cos(tau * freq * sawClock)/period;

	if ((factor <= 0 && !flipped) || (factor > 0 && flipped))
		{
		var negDirect = times(-1, directionVec);
		var newDirectionVec = vectorSum(negDirect, times(-1, times(2 * dot(negDirect, origVecNorm), origVecNorm)));
		directionVec = newDirectionVec;
		flipped = !flipped;
		}

	bullet.body.velocity.x = directionVec.x;
	bullet.body.velocity.y = directionVec.y;

	sawClock += 0.05;
	};	

		
	

}
	
