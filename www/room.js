'use strict';

/** Room object
This object contains the information about a room in the game.

@param deviceDimensionData is the dimension of the screen viewing device as a object.
@param {Image} - background - is the path to the rooms backround png.
@param {Image} - collisionAssets is a path to tileset which has possible nonwall collidable assets, which are present in the room.
@param {Tilemap} - collisionData is a path to a tilemap generated wih Tiled.
@param {roundManager} - roundManager Current roundmanager for accessing layergroups 
*/

function Room (game, background, moveDirection, moveSpeed, roundManager)
{
var self = this;

self.backgroundLayer;

self.moveDirection = moveDirection;
self.moveSpeed = moveSpeed;

self.backgroundLayer = game.add.sprite(0, 0, background);
self.backgroundLayer.smoothed = false;

roundManager.backgroundLayerGroup.add(self.backgroundLayer);

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
