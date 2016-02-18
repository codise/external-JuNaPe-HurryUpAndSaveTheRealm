'use strict';

/* Maptile object
This object contains the information about a room in the game.

deviceDimensionData is the dimension of the screen viewing device as a object.
background is the path to the rooms backround png.
collisionAssets are a list of paths to assets, which are present in the room.
*/

function MapTile (game, deviceDimensionData, background, collisionAssets, collisionData)
{
var self = this;

self.preload = () =>
	{
		if (!game.cache.checkImageKey(background))
		{
			game.load.image(background, background);
		}

		for (var i = 0; i < collisionAssets.length; i++)
		{
			if(!game.cache.checxImageKey(collisionAssets[i]))
			{
				game.load.image(collisionAssets[i], collisionAssets[i]);
			}
		}
	}

self.create = () =>
	{
		var mapData = JSON.parse(collisionData);
		var collisionObjects = mapData.layers[0].objects;
		$
		


}
