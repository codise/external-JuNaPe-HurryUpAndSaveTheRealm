'use strict';

function Enemy(enemyInfo, game, bulletManager, players, position)
{
var self = this;

var maxSpeed = enemyInfo.maxSpeed;

self.sprite = game.add.sprite(position.x, position.y, enemyInfo.sprite);
self.sprite.anchor.setTo(0.5, 0.5);
var flipped = false;

var hitColorTime = 50;
var hitColor = enemyInfo.hitColor;

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
var currentTarget = pickRandomFromDictionary(mPlayers);

var cameraPadding = 20;

var scale = function ()
	{
	if (flipped)
		{
		self.sprite.scale.x = scalingFactors.x;
		} else
		{
		self.sprite.scale.x = -scalingFactors.x;
		}
	self.sprite.scale.y = scalingFactors.y;
	};


self.update = function (players)
	{
	mPlayers = players;

	//If the enemy does not have a target, we a pick random play as a target
	if (currentTarget === undefined)
		{
		currentTarget = pickRandomFromDictionary(mPlayers);
		}

	scale();
	if(game.time.now > nextMove) 
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

	if (game.time.now > nextFire)
		{
		fire();
		}

	if(bulletManager.playerBulletCount > 0) 
		{
		for (var i = 0; i < bulletManager.playerBulletGroups.length; i++)
			{
			game.physics.arcade.overlap(bulletManager.playerBulletGroups[i], self.sprite, self.enemyHit, null, self); 
			}
		}
	checkCameraBounds();
	};

/*
* Function that triggers when an enemy object is hit by a player bullet
* Colors the sprite red, destroys the bullet and applies damage to the enemy
* @param {enemy} enemy - The enemy object that is hit
* @param {bullet} bullet - The bullet object that hits the enemy
*/
self.enemyHit = function(enemy, bullet) 
	{
	self.sprite.tint = hitColor;
	game.time.events.add(hitColorTime, function() {self.sprite.tint = 0xFFFFFF;});
	var playerId = bullet.playerId;
	var damage = bullet.damage;
	bullet.kill();
	mPlayers[playerId].getPoints(1);
	self.enemyTakeDamage(damage);
	if(self.sprite.dead) mPlayers[playerId].getPoints(20);
	};


/*
* Decreases the enemys health by the specified amount and sets the target enemy as dead if health is < 0
* @param {Number} damage - The amount of health to decrease
*/
self.enemyTakeDamage = function(damage) 
	{
	currentHealth = currentHealth - damage;
	if(currentHealth <= 0)
		{
		self.sprite.dead = true;
		}
	};


/*
* Responsible for destroying the enemy sprite
*/
self.kill = function ()
	{
	self.sprite.destroy();
	game.effectManager.createDeathEffect(self);
	};

var move = function ()
	{
	switch (movementScheme)
		{
		case 'chargeSingle':
			if(currentTarget != undefined)
				{
				var angle = game.physics.arcade.angleBetween(self.sprite, currentTarget.sprite) * 180/Math.PI;
				game.physics.arcade.velocityFromAngle(angle, maxSpeed, self.sprite.body.velocity);
				} else {
				console.log('tried to charge at undefined player');
				}
			break;
		default:
			var angle = Math.floor(Math.random()*181);
			angle *= xDirection[Math.floor(Math.random()*2)];
			game.physics.arcade.velocityFromAngle(angle, maxSpeed, self.sprite.body.velocity);
		}
	nextMove = game.time.now + moveRate;
	};

var fire = function ()
	{
	switch (shootingScheme[0])
		{
		case 'directedBurst':
			createDirectedBurst(shootingScheme[1], shootingScheme[2]);
			break;
		case 'slasherShot':
			createSlasherShot(shootingScheme[1], shootingScheme[2]);
			break;
		default:
			createRadialPulse(shootingScheme[1], shootingScheme[2]);	
		}
	nextFire = game.time.now + fireRate;
	};

var createRadialPulse = function (n, bulletGraphic)
	{
	// Creates n bullets radially from monster
	var randomOffset = Math.floor((Math.random() * 360));
	for (var i = 0; i < n; i++)
		{
		var angle = 360/n * i + randomOffset;
		bulletManager.createBullet(bulletGraphic, 10, -1, angle, self.sprite.position, 200, 5000);
		}
	};

var createDirectedBurst = function (n, bulletGraphic)
	{
	// Creates a group of bullets shot at a player, like a shotgun
	if(currentTarget != undefined)
		{	
		var angleBetween = game.physics.arcade.angleBetween(self.sprite, currentTarget.sprite) * 180/Math.PI;
		} else {
		console.log('tried to shoot at undefined player');
		}
	for (var i = 0 - ((n-1)/2) ; i <= 0 + ((n-1)/2); i++)
		{
		// 4 degrees of random offset
		var randomOffset = Math.floor((Math.random() * 9)) - 4;
		var angle = angleBetween + ((i )* 10) + randomOffset;
		
		bulletManager.createBullet(bulletGraphic, 10, -1, angle, self.sprite.position, 200, 5000);
		}
	};

var createSlasherShot = function (n, bulletGraphic)
	{
	// Creates a group of bullets shot at a player, like a shotgun
	if(currentTarget != undefined)
		{	
		var angleBetween = game.physics.arcade.angleBetween(self.sprite, currentTarget.sprite) * 180/Math.PI;
		} else {
		console.log('tried to shoot at undefined player');
		}
	for (var i = 0 - ((n-1)/2) ; i <= 0 + ((n-1)/2); i++)
		{
		// 4 degrees of random offset
		var randomOffset = Math.floor((Math.random() * 9)) - 4;
		var angle = angleBetween + ((i )* 10) + randomOffset;
		
		bulletManager.createBullet(bulletGraphic, 10, -1, angle, self.sprite.position, 400, 500);
		}
	};


/*
* Checks if any enemy sprites would go offscreen, if they would, change the position so that no enemy can ever go offscreen
*/
var checkCameraBounds = function ()
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
