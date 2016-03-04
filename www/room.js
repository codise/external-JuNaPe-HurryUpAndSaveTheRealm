'use strict';

/* Room object
This object contains the information about a room in the game.

deviceDimensionData is the dimension of the screen viewing device as a object.
background is the path to the rooms backround png.
collisionAssets is a path to tileset which has possible nonwall collidable assets, which are present in the room.
collisionData is a path to a tilemap generated wih Tiled.
*/

function Room (game, deviceDimensionData, background, collisionAssets, collisionData)
{
var self = this;
self.map;
var collisionLayer;
var spawnLayer;
var trapLayer;

self.layerGroup = game.add.group();

self.preload = () =>
	{
		if (!game.cache.checkImageKey(background))
		{
			game.load.image(background, background);
		}
    if(!game.cache.checkImageKey(collisionAssets))
    {
			game.load.image(collisionAssets, collisionAssets);
		}

		game.load.tilemap(collisionData, collisionData, null, Phaser.Tilemap.TILED_JSON);
	};

self.create = () =>
	{
	self.map = game.add.tilemap(collisionData);

	self.map.addTiletImage(collisionAssets, collisionAssets);

	collisionLayer = map.createLayer('collision');
	self.layerGroup.add(collisionLayer);
	spawnLayer = map.createLayer('spawn');
	self.layerGroup.add(createLayer);
	trapLayer = map.createLayer('trap');
	self.layerGroup.add(trapLayer);

	self.layerGroup.setAll('fixedToCamera', false);
	};

self.moveTo = (position) =>
	{
	self.layerGroup.setAll('x', position.x);
	self.layerGroup.setAll('y', positoin.y);
	};
}
	




		


}
