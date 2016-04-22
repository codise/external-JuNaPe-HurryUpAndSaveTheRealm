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
	sprite.position.setTo(self.backgroundLayer.x + colliders[spriteData].x, self.backgroundLayer.y + colliders[spriteData].y);
	sprite.anchor.setTo(colliders[spriteData].anchorX, colliders[spriteData].anchorY);
	sprite.loadTexture(colliders[spriteData].image);
	sprite.exists = true;
	game.physics.enable(sprite, Phaser.Physics.ARCADE);
	//self.backgroundLayer.addChild(sprite);
	//roundManager.backgroundLayerGroup.add(sprite);
	}




self.onceScaled = false;
var scale = function ()
	{
	self.backgroundLayer.scale.x = scalingFactors.x;
	self.backgroundLayer.scale.y = scalingFactors.y;
	};

self.moveTo = function (x, y)
	{
	self.backgroundLayer.reset(x, y);
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
