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

for (var id in colliders)
	{
	colliders[id] // TODO
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
