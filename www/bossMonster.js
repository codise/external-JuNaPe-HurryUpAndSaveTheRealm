'use strict';

function BossMonster (bossInfo, position, enemyManager)
{
var self = this;

self.sprite = game.add.sprite(position.x, position.y, bossInfo.sprite);
self.sprite.anchor.setTo(0.5, 0.5);

var nextMove = 0;
var moveRate = 1000;
var maxSpeed = 1;
var movementSchemes = bossInfo.movementSchemes;
var currentMovementScheme = movementSchemes[0];

var attackSchemes = bossInfo.attackSchemes;
var currentAttackScheme = attackSchemes[0];

var patternRate = 0;
var currentPattern = -1;
var nextPattern = 0;

var fireRate = 1000;
var nextFire = 0;
var cooldownRate = 0;
var nextCooldown = 0;
var shotsPerCooldown = 1;

self.maxHealth = bossInfo.maxHealth;
self.currentHealth = self.maxHealth;

var healthBar = new playerHud(game, self);

//var mPlayers = players;


self.update = (players) =>
	{
	//mPlayers = players;
	
	if (game.time.now >= nextPattern) 
		{
		chooseNewPattern();
		}
	// this is where patterns may switch their attack and movement schemes mid pattern
	switch (currentPattern)
		{
		case 0:
			if(currentMovementScheme === movementSchemes[0] && game.time.now - nextPattern < 2000)
				{
				currentMovementScheme = movementSchemes[1]; //shake
				self.sprite.angle = 0;
				fireRate = 200;
				nextMove = game.time.now;
				moveRate = 100;
				maxSpeed = 20;
				//if health low -> switch pattern?
				}
			break;
		default:
		}
	if (game.time.now > nextMove)
		{
		move();
		}
	if (game.time.now > nextFire)
		{
		attack();
		}
	healthBar.updateHealthBar();
	}

var chooseNewPattern = () =>
	{
	if(self.currentHealth < self.maxHealth / 3)
		{
		//low health patternsswitch(currentPattern)
		switch(currentPattern)
			{
			case 3:
				currentPattern = 4;
				break;
			case 4:
			default:
				currentPattern = 3;
				break;
			}
		} else {
		//high health patterns
		switch(currentPattern)
			{
			case 0:
				currentPattern = 1;
				break;
			case 1:
				currentPattern = 2;
				break;
			case 2:
				currentPattern = 0;
				break;
			default:
			}
		}
	//set pattern specific values
	switch (currentPattern)
		{

		// wobbles around, spiral shots, intensifies near end
		case 0:
			patternRate = 10000;
			currentMovementScheme = movementSchemes[0]; //wobble
			currentAttackScheme = attackSchemes[0]; //spiral
			fireRate = 500;
			moveRate = 500;
			maxSpeed = 5;
			cooldownRate = 0;
			nextCooldown = game.time.now;
			break;

		// wobbles around, shoots bursts at random players in sets of 3
		case 1:
			patternRate = 5000;
			currentMovementScheme = movementSchemes[0]; //wobble
			currentAttackScheme = attackSchemes[2]; //shotgun
			fireRate = 500;
			moveRate = 500;
			maxSpeed = 5;
			cooldownRate = 2500;
			nextCooldown = game.time.now;
		default:
		}
	nextPattern = game.time.now + patternRate;
	};

var move = () =>
	{
	switch (currentMovementScheme)
		{
		case 'wobble':
			self.sprite.angle = self.sprite.angle + Math.random();
			break;
		case 'shake':
			self.sprite.angle += 180;
			break;
		case 'chargeDirection':
			//TODO
			break;
		default:
		}
		nextMove = game.time.now + moveRate;
	};

var attack = () =>
	{
	switch (currentAttackScheme)
		{
		case 'spiral':
			//TODO
			break;
		case 'deflect':
			//TODO
			break;
		case 'shotgun':
			//TODO
			break;
		case 'stream':
			//TODO
			break;
		default:
		}
		next
	};


