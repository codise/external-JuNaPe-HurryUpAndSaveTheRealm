'use strict';

function Enemy(enemyInfo, game, bulletManager, players, position)
{

var getRndmFrom = (dict) =>
	{
	var keys = Object.keys(dict);
	var object
	object = dict[keys[ keys.length * Math.random() << 0]];
	return object;
	};

var self = this;

var maxSpeed = enemyInfo.maxSpeed;

self.enemySprite = game.add.sprite(position.x, position.y, enemyInfo.sprite);
self.enemySprite.anchor.setTo(0.5, 0.5);
var flipped = false;

var nextMove = 0;
var moveRate = enemyInfo.moveRate;//2500;
var movementScheme = enemyInfo.movementScheme;

var xDirection = [1, -1];
//self.yDirection = [1, -1];

var fireRate = enemyInfo.fireRate;//5000;
var nextFire = 0;
var shootingScheme = enemyInfo.shootingScheme;

var maxHealth = enemyInfo.maxHealth;//10;
var currentHealth = maxHealth;

var mPlayers = players;
var currentTarget = getRndmFrom(mPlayers);

var cameraPadding = 20;

var scale = () =>
	{
	if (flipped)
		{
		self.enemySprite.scale.x = scalingFactors.x;
		} else
		{
		self.enemySprite.scale.x = -scalingFactors.x;
		}
	self.enemySprite.scale.y = scalingFactors.y;
	};


self.update = (players) =>
	{
	mPlayers = players;
	if (currentTarget === undefined)
		{
		currentTarget = getRndmFrom(mPlayers);
		}

	scale();
	if(game.time.now > nextMove) 
		{
		move();
		}
	if (self.enemySprite.body.velocity.x > 0 && flipped)
		{
		flipped = false;
		} else if (self.enemySprite.body.velocity.x < 0 && !flipped)
		{
		flipped = true;
		}

	if (game.time.now > nextFire)
		{
		fire();
		}

	if(bulletManager.playerBulletCount > 0) 
		{
		for (var i = 0; i < bulletManager.playerBulletGroups.length; i++)
			{
			game.physics.arcade.overlap(bulletManager.playerBulletGroups[i], self.enemySprite, self.enemyHit, null, self); 
			}
		}
	checkCameraBounds();
	};

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
	currentHealth = currentHealth - damage;
	if(currentHealth <= 0)
		{
		self.enemySprite.dead = true;
		}
	};

self.kill = () =>
	{
	self.enemySprite.destroy();
	};

var move = () =>
	{
	switch (movementScheme)
		{
		case 'chargeSingle':
			if(currentTarget != undefined)
				{
				var angle = game.physics.arcade.angleBetween(self.enemySprite, currentTarget.playerSprite) * 180/Math.PI;
				game.physics.arcade.velocityFromAngle(angle, maxSpeed, self.enemySprite.body.velocity);
				} else {
				console.log('tried to charge at undefined player');
				}
			break;
		default:
			var angle = Math.floor(Math.random()*181);
			angle *= xDirection[Math.floor(Math.random()*2)];
			game.physics.arcade.velocityFromAngle(angle, maxSpeed, self.enemySprite.body.velocity);
		}
	nextMove = game.time.now + moveRate;
	};

var fire = () =>
	{
	switch (shootingScheme[1])
		{
		case 'directedBurst':
			createDirectedBurst(shootingScheme[0]);
			break;
		case 'slasherShot':
			createSlasherShot(shootingScheme[0]);
			break;
		default:
			createRadialPulse(shootingScheme[0]);	
		}
	nextFire = game.time.now + fireRate;
	};

var createRadialPulse = (n) =>
	{
	// Creates n bullets radially from monster
	for (var i = 0; i < n; i++)
		{
		bulletManager.createBullet('enemyBullet', 10, -1, 360/n * i, self.enemySprite.position, 200, 5000);
		}
	};

var createDirectedBurst = (n) =>
	{
	// Creates a group of bullets shot at a player, like a shotgun
	if(currentTarget != undefined)
		{	
		var angleBetween = game.physics.arcade.angleBetween(self.enemySprite, currentTarget.playerSprite) * 180/Math.PI;
		} else {
		console.log('tried to shoot at undefined player');
		}
	for (var i = 0 - ((n-1)/2) ; i <= 0 + ((n-1)/2); i++)
		{
		// 4 degrees of random offset
		var randomOffset = Math.floor((Math.random() * 9)) - 4;
		var angle = angleBetween + ((i )* 10) + randomOffset;
		
		bulletManager.createBullet('enemyBullet', 10, -1, angle, self.enemySprite.position, 200, 5000);
		}
	};

var createSlasherShot = (n) =>
	{
	// Creates a group of bullets shot at a player, like a shotgun
	if(currentTarget != undefined)
		{	
		var angleBetween = game.physics.arcade.angleBetween(self.enemySprite, currentTarget.playerSprite) * 180/Math.PI;
		} else {
		console.log('tried to shoot at undefined player');
		}
	for (var i = 0 - ((n-1)/2) ; i <= 0 + ((n-1)/2); i++)
		{
		// 4 degrees of random offset
		var randomOffset = Math.floor((Math.random() * 9)) - 4;
		var angle = angleBetween + ((i )* 10) + randomOffset;
		
		bulletManager.createBullet('enemyBullet', 10, -1, angle, self.enemySprite.position, 400, 500);
		}
	};

var checkCameraBounds = () =>
	{
	if (self.enemySprite.position.x < game.camera.x + cameraPadding)
		{
		self.enemySprite.position.x = game.camera.x + cameraPadding;
		} else if (self.enemySprite.position.x > game.camera.x + game.camera.width - cameraPadding)
		{
		self.enemySprite.position.x = game.camera.x + game.camera.width - cameraPadding;
		}

	if (self.enemySprite.position.y < game.camera.y + cameraPadding)
		{
		self.enemySprite.position.y = game.camera.y + cameraPadding;
		} else if (self.enemySprite.position.y > game.camera.y + game.camera.height - cameraPadding)
		{
		self.enemySprite.position.y = game.camera.y + game.camera.height - cameraPadding;
		}
	};



}
