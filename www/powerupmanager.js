'use strict';

function PowerupManager(game)  //TODO:needs to get the trap layer as parameter to spawn the traps
{
var self = this;

/*
Dictionary for powerups
sprite: the sprite to be used
pUpID: ID for the powerup
pUpDuration: Duration in milkliseconds
pUpStats: ANy information for the powerup to use, e.g duration, amount to heal, etc.
*/
var pUpDictionary = {							heal: {				sprite: 'item_book',
																	pUpID: 'smallHeal', 
																	pUpDuration: 0,
																	pUpStats: 20},

												incSpeed: {			sprite: 'item_book',
																	pUpID: 'incSpeed', 
																	pUpDuration: 7000,
																	pUpStats: 100},

												incFireRate: {		sprite: 'item_book',
																	pUpID: 'incFireRate', 
																	pUpDuration: 5000,
																	pUpStats: 100}};

var keys = Object.keys(pUpDictionary);

//Variables for powerup spawning

var PowerupSpawnCooldown = 3000; //Cooldown between attemps to spawn a powerup
var CurrentCooldownTime = 0; 
var POWERUP_SPAWN_RATE = 20; //The percentage rate of sucess in powerup spawn attempts.

self.pUpGroup = game.add.group(); // Group manages sprites
var pUpList = []; // List manages powerup objects
var MAX_PUP_SPAWNS = 5; //the amount of powerups to spawn randomly

//Secondary powerup pool for enemy drops
var pUpDropList = [];
var MAX_PUP_DROPS = 5;

//Powerups need to detect collision
self.pUpGroup.enableBody = true;
self.pUpGroup.physicsBodyType = Phaser.Physics.ARCADE;

self.update = function(players)
{
	if (Object.keys(players).length > 0 && pUpList.length < MAX_PUP_SPAWNS && CurrentCooldownTime < game.time.now) {
		if(getRandomInt(0,100) <= POWERUP_SPAWN_RATE) {		
			var randomPos = {x: game.camera.x + game.rnd.integerInRange(0, game.camera.width), y: game.camera.y + game.rnd.integerInRange(0, game.camera.height)};
			var newpUp = new powerup(game, self, pickRandomFromDictionary(pUpDictionary), randomPos, players);
			self.pUpGroup.add(newpUp.sprite);
			pUpList.push(newpUp);
		}
		CurrentCooldownTime = game.time.now + PowerupSpawnCooldown;
	}

	//Update poweruplist
	for (var i = 0; i < pUpList.length; i++)
	{
	if (pUpList[i].sprite.dead === true)
		{
		pUpList[i].kill();
		pUpList.splice(i,1);
		} else {
		pUpList[i].update(players);
		}
	}
	//Update dropped powerups
	for (var j = 0; j < pUpDropList.length; j++)
	{
	if (pUpDropList[j].sprite.dead === true)
		{
		pUpDropList[j].kill();
		pUpDropList.splice(j,1);
		} else {
		pUpDropList[j].update(players);
		}
	}
}

/**
* Spawns a specified powerup on specified coordinates
* @param {point} point - The point where the powerup will be spawned provided as an object with x and y properties
* @param {Int} pUp - The integer ID of the powerup to spawn
*/
self.spawnPowerupOn = function(point, pUp)
{
	//Only spawn powerups if there is room for them in the pool
	if(pUpDropList.length < MAX_PUP_DROPS) {
		var newpUp = new powerup(game, self, pUpDictionary[keys[i]],point, players);
		self.pUpGroup.add(newpUp.sprite);
		pUpDropList.push(newpUp);
	}
}

/**
* Spawns a random powerup on specified coordinates
* @param {point} point - The point where the powerup will be spawned provided as an object with x and y properties
* @param {Int} pUp - The integer ID of the powerup to spawn
*/
self.spawnRandomPowerupOn = function(point)
{
	//Only spawn powerups if there is room for them in the pool
	if(pUpDropList.length < MAX_PUP_DROPS) {
		var newpUp = new powerup(game, self, pickRandomFromDictionary(pUpDictionary),point, players);
		self.pUpGroup.add(newpUp.sprite);
		pUpDropList.push(newpUp);
	}
}

var getRandomInt = function (min, max)
	{
    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

var pickRandomFromDictionary = function (dict)
	{
	var keys = Object.keys(dict);
	var object
	object = dict[keys[ keys.length * Math.random() << 0]];
	return object;
	};	
}3