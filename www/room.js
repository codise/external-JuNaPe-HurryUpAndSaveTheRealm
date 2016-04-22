'use strict';

/** Room object
*This object contains the information about a room in the game.
*
*@param {object} - game - points to the Game object
*@param {Image} - background - is the path to the rooms backround png.
*@param {object} - colliders - list of all data to be made into collidable sprites
*@param {string} - moveDirection - The direction where the game camera will go next
*@param {string} - moveSpeed - The speed of the camera during next transition
*@param {roundManager} - roundManager - Current roundmanager for accessing layergroups 
*/

function Room (game, background, colliders, moveDirection, moveSpeed, roundManager)
{
var self = this;

self.backgroundLayer;

self.moveDirection = moveDirection;
self.moveSpeed = moveSpeed;

self.backgroundLayer = game.add.sprite(0, 0, background);
self.backgroundLayer.smoothed = false;

roundManager.backgroundLayerGroup.add(self.backgroundLayer);
var sprites = [];

for (var spriteData in colliders)
	{
	/*
	width: tileWidth,
	height: 15 * tileHeight,
	x: 24 * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
	*/
	var sprite = game.add.sprite(0, 0, 'empty');
	sprite.exists = false;
	sprite.width = colliders[spriteData].width;
	sprite.height = colliders[spriteData].height;
	sprite.anchor.setTo(colliders[spriteData].anchorX, colliders[spriteData].anchorY);
	sprite.position.setTo(colliders[spriteData].x, colliders[spriteData].y);
	sprite.loadTexture(colliders[spriteData].image);
	sprite.exists = true;
	game.physics.enable(sprite, Phaser.Physics.ARCADE);
	sprite.body.immovable = true;
	//self.backgroundLayer.addChild(sprite);
	roundManager.collisionGroup.add(sprite);
	sprites.push(sprite);
	}

/*

		//
		testsprite=game.add.sprite(game.camera.x + game.camera.width /2, game.camera.y + game.camera.height /2, 'player2Weapon');
		game.physics.enable(testsprite, Phaser.Physics.ARCADE);
		testsprite.body.immovable = true;
		//self.popUpGroup.add(testsprite);
		//
*/


self.onceScaled = false;
var scale = function ()
	{
	self.backgroundLayer.scale.x = scalingFactors.x;
	self.backgroundLayer.scale.y = scalingFactors.y;
	roundManager.collisionGroup.scale.setTo(scalingFactors.x, scalingFactors.y);
	};

self.moveTo = function (x, y)
	{
	self.backgroundLayer.position.setTo(x, y);
		console.log('bg'+ self.backgroundLayer.position)
	for(var i = 0; i < sprites.length; i++)
		{
		sprites[i].position.x += x;
		sprites[i].position.y += y;
		console.log(sprites[i].position)
		}
	//roundManager.collisionGroup.position.setTo(x, y);
	};

self.updateScaling = function ()
	{
	scale();
	self.onceScaled = true;
	};


/**
* Gets the current position of the backgroundlayer
* @return {object} The current location of the layer
*/
self.getPos = function ()
	{
	return {"x": self.backgroundLayer.position.x, "y": self.backgroundLayer.position.y};
	};
}
