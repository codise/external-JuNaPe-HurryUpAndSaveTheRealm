'use strict';

function BossMonster (bossInfo, game, bulletManager, position)
{
var self = this;
self.sprite = game.add.sprite(position.x, position.y, bossInfo.sprite);
self.sprite.anchor.setTo(0.5, 0.5);
var flipped = false;
game.physics.enable(self.sprite, Phaser.Physics.ARCADE); //en tiiä miks enemyt toimii ilman tätä riviä ja tää ei

var movementSchemes = bossInfo.movementSchemes;
var attackSchemes = bossInfo.attackSchemes;

var currentPattern = -1;
//used to compare to pattern's shotsPerCooldown value when needed
var shotsFired = 0;

var nextPattern = 0;
var nextCooldown = 0;
var nextMove = 0;

var cameraPadding = 20; //?
var lowHealth = false;
// > values that will be replaced by patterns, set for safety
var patternRate = 0;
var fireRate = 2000;
var cooldownRate = 0;
var shotsPerCooldown = 1000;
var moveRate = 1000;
var maxSpeed = 1;
var currentAttackScheme = attackSchemes[0];
var currentMovementScheme = movementSchemes[0];
var shotgunBulletAmount = 5;
var shotgunSpread = 20;
var bulletDamage = 10;
var bulletSpeed = 250;
var bulletLifespan = 3000;
var movementDirection = 0;
// <
var nextFire = game.time.now + fireRate;

self.maxHealth = bossInfo.maxHealth;
self.currentHealth = self.maxHealth;

var healthBar = new Hud(game, self);

var mPlayers;

var getRandomFrom = (dict) =>
	{
	var keys = Object.keys(dict);
	var object
	object = dict[keys[ keys.length * Math.random() << 0]];
	return object;
	};

var scale = () =>
	{
	if (flipped)
		{
		self.sprite.scale.x = scalingFactors.x * 2;
		} else
		{
		self.sprite.scale.x = -scalingFactors.x * 2;
		}
	self.sprite.scale.y = scalingFactors.y * 2;
	};

self.update = (players) =>
	{
	mPlayers = players;
	scale();
	if (game.time.now >= nextPattern) 
		{
		chooseNewPattern();
		}
	if(self.currentHealth < self.maxHealth / 3 && !lowHealth)
		{
		lowHealth = true;
		chooseNewPattern();
		}
		
	// this is where patterns may alter their attack and movement schemes and values mid pattern
	switch (currentPattern)
		{
		//pattern 0 changes once 3/4 of pattern time has passed
		case 0:
			if(currentMovementScheme === movementSchemes[0] && nextPattern - game.time.now < 2500)
				{
				currentMovementScheme = movementSchemes[1]; //shake
				movementDirection = 0;
				fireRate = 350;
				moveRate = 200;
				maxSpeed = 20;
				bulletDamage = 8;
				bulletSpeed = 350;
				bulletLifespan = 2000;
				nextMove = game.time.now;
				}
			break;
		default:
		}
	
	if (game.time.now > nextMove)
		{
		move();
		}
		
	if (self.sprite.body.velocity.x > 0 && flipped)
		{
		flipped = false;
		} else if (self.sprite.body.velocity.x < 0 && !flipped)
		{
		flipped = true;
		}
		
	if (game.time.now > nextCooldown) 
		{
		nextCooldown = game.time.now + cooldownRate;
		shotsFired = 0;
		}
		
	if (game.time.now > nextFire && shotsFired < shotsPerCooldown)
		{
		attack(players);
		}
	
	if(bulletManager.playerBulletCount > 0) 
		{
		for (var i = 0; i < bulletManager.playerBulletGroups.length; i++)
			{
			game.physics.arcade.overlap(bulletManager.playerBulletGroups[i], self.sprite, self.enemyHit, null, self); 
			}
		}
	
	checkCameraBounds();
	healthBar.updateHealthBar();
	}
	
self.enemyHit = function(enemy, bullet) 
	{
	var playerId = bullet.playerId;
	var damage = bullet.damage;
	bullet.kill();
	mPlayers[playerId].getPoints();
	self.enemyTakeDamage(damage);
	};
	
self.enemyTakeDamage = function(damage) 
	{
	self.currentHealth = self.currentHealth - damage;
	if(self.currentHealth <= 0)
		{
		self.sprite.dead = true;
		}
	};

self.kill = () =>
	{
	self.sprite.destroy();
	game.state.states.play.roundManager.lastRoomTimeout = 5000; //5 sec
	game.state.states.play.roundManager.lastRoomTimer = 0;
	};

var chooseNewPattern = () =>
	{
	if(self.currentHealth < self.maxHealth / 3)
		{
		//low health patterns, triggered when under 1/3 health left
			/*
			
			currently the shot pattern in a timeline should look like this:
			
			ssssssssssssssssSSSS***__***__ssssssssssssssssSSSS***__***__
			
			s = spiral shots
			S = intense spiral shots
			* = bursts
			_ = no shots
			
			*/
		switch(currentPattern)
			{
			case 3:
				//TODO more enrage patterns, currently loops only one pattern
				currentPattern = 3;
				break;
			case 4:
			default:
				currentPattern = 3;
				break;
			}
		} else {
		//high health patterns, currently loops between 2 pattern states
		switch(currentPattern)
			{
			case 0:
				currentPattern = 1;
				break;
			case 1:
				currentPattern = 0;
				break;
			default:
				currentPattern = 0;
			}
		}
		
	//set pattern specific values
	switch (currentPattern)
		{
		// wobbles around, spiral shots, intensifies into a violent shake near end
		case 0:
			patternRate = 10000;
			currentMovementScheme = movementSchemes[0]; //tentaclemonster: wobble
			currentAttackScheme = attackSchemes[0]; //tentaclemonster: spiral
			fireRate = 700;
			moveRate = 500;
			maxSpeed = 5;
			cooldownRate = 10000;
			shotsPerCooldown = 1000;
			bulletDamage = 10;
			bulletSpeed = 250;
			bulletLifespan = 3000;
			break;

		// wobbles around, shoots bursts at random players in sets of 3
		case 1:
			patternRate = 5000;
			currentMovementScheme = movementSchemes[0]; //tentaclemonster: wobble
			currentAttackScheme = attackSchemes[2]; //tentaclemonster: shotgun
			shotgunBulletAmount = 5;
			shotgunSpread = 30; // angle between two bullets in the burst
			fireRate = 900;
			moveRate = 500;
			maxSpeed = 5;
			cooldownRate = 2500;
			//shoots bullets at normal fire rate until bullet limit (shotsPerCooldown) is reached by shotsFired
			//once cooldown period has ended, shotsFired is set back to 0 allowing new shots to be fired at normal fire rate
			shotsPerCooldown = 3;
			bulletDamage = 10;
			bulletSpeed = 250;
			bulletLifespan = 3000;
			break;
		
		//case 2:
		
		//low health / enrage patterns
		
		//rapid wobble, nonstop wide bursts (FUN)
		case 3:
			patternRate = 5000;
			currentMovementScheme = movementSchemes[0]; //tentaclemonster: wobble
			currentAttackScheme = attackSchemes[2]; //tentaclemonster: shotgun
			shotgunBulletAmount = 7;
			shotgunSpread = 25;
			fireRate = 800;
			moveRate = 200;
			maxSpeed = 60;
			cooldownRate = 0;
			shotsPerCooldown = 1000;
			bulletDamage = 10;
			bulletSpeed = 250;
			bulletLifespan = 3000;
			break;
			
		default:
		}
	nextCooldown = game.time.now;
	nextPattern = game.time.now + patternRate;
	nextMove = game.time.now;
	shotsFired = 0;
	};

//sets movement direction based on pattern
//movement speed and turn rate (how often a new direction is taken) are pattern specific
var move = () =>
	{
	switch (currentMovementScheme)
		{
		case 'wobble':
			movementDirection = Math.floor(Math.random()*361);
			break;
		case 'shake':
			movementDirection += 180;
			break;
		case 'chargeDirection':
			//TODO
			break;
		default:
		}
		game.physics.arcade.velocityFromAngle(movementDirection, maxSpeed, self.sprite.body.velocity);
		nextMove = game.time.now + moveRate;
	};

var attack = (players) =>
	{
	switch (currentAttackScheme)
		{
		// shots in 5 directions evenly around the boss
		case 'spiral':
			for(var i = 1; i <= 5; i++)
				{
				var angle = 360 * i/5 + shotsFired * 15;
				bulletManager.createBullet('enemyBullet', bulletDamage, -1, angle, self.sprite.position, bulletSpeed, bulletLifespan);
				}
			break;
			
		//shotgunBulletAmount shots burst towards a random target, no random spread
		case 'shotgun':
			for(var i = 0 - ((shotgunBulletAmount-1)/2) ; i <= 0 + ((shotgunBulletAmount-1)/2); i++)
				{
				var target = getRandomFrom(players)
				if(target != undefined)
					{
					var angle = game.physics.arcade.angleBetween(self.sprite, target.sprite) * 180/Math.PI + (i * shotgunSpread);
					bulletManager.createBullet('enemyBullet', bulletDamage, -1, angle, self.sprite.position, bulletSpeed, bulletLifespan);
					}
				}
			
			
			break;
		case 'deflect':
			//TODO
			//idk lol
			break;
		case 'stream':
			//TODO
			//note: a directed stream of bullets towards chosen target(s), does not change target until X shots fired
			break;
		default:
		}
	shotsFired ++;
	nextFire = game.time.now + fireRate;
	};
	
	
var checkCameraBounds = () =>
	{
	if (self.sprite.position.x < game.camera.x + cameraPadding)
		{
		self.sprite.position.x = game.camera.x + cameraPadding;
		} else if (self.sprite.position.x > game.camera.x + game.camera.width - cameraPadding)
		{
		self.sprite.position.x = game.camera.x + game.camera.width - cameraPadding;
		}

	if (self.sprite.position.y < game.camera.y + cameraPadding)
		{
		self.sprite.position.y = game.camera.y + cameraPadding;
		} else if (self.sprite.position.y > game.camera.y + game.camera.height - cameraPadding)
		{
		self.sprite.position.y = game.camera.y + game.camera.height - cameraPadding;
		}
	};
}