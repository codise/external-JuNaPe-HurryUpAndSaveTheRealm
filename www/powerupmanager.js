'use strict';

function PowerupManager(game)  //TODO:needs to get the trap layer as parameter to spawn the traps
{
var self = this;

/*
Dictionary for traps
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
//console.log(keys);
//var t = pUpDictionary[keys[0]];
//console.log(t);



self.pUpGroup = game.add.group(); // Group manages sprites
var pUpList = []; // List manages powerup objects

var pUpPool = 3; //the amount of powerups to spawn

//Traps need to detect collision
self.pUpGroup.enableBody = true;
self.pUpGroup.physicsBodyType = Phaser.Physics.ARCADE;

self.update = function(players)
{
	if (self.pUpPool > 0 && Object.keys(players).length > 0 && pUpList.length < 2) {
		var randomPos = {x: game.camera.x + game.rnd.integerInRange(0, game.camera.width), y: game.camera.y + game.rnd.integerInRange(0, game.camera.height)};
		var newpUp = new powerup(game, self, pickRandomFromDictionary(pUpDictionary), randomPos, players);
		self.pUpGroup.add(newpUp.sprite);
		pUpList.push(newpUp);
	}

	//Update poweruplist
	for (var i = 0; i < self.pUpList.length; i++)
	{
	if (self.pUpList[i].sprite.dead === true)
		{
		self.pUpList[i].kill();
		} else {
		self.pUpList[i].update(players);
		}
	}
}

var pickRandomFromDictionary = (dict) =>
	{
	var keys = Object.keys(dict);
	var object
	object = dict[keys[ keys.length * Math.random() << 0]];
	return object;
	};	
}