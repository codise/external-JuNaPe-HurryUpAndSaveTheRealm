'use strict';

/* Room object
This object contains the information about a room in the game.

deviceDimensionData is the dimension of the screen viewing device as a object.
background is the path to the rooms backround png.
collisionAssets is a path to tileset which has possible nonwall collidable assets, which are present in the room.
collisionData is a path to a tilemap generated wih Tiled.
*/

function Room (game, background, collisionAssets, collisionData, moveDirection, moveSpeed)
{
var self = this;

var game = game;
var background = background;
var collisionAssets = collisionAssets;
var collisionData = collisionData;

self.map;

var collisionLayer;
var spawnLayer;
var trapLayer;

self.layerGroup = game.add.group();

self.moveDirection = moveDirection;
self.moveSpeed = moveSpeed;

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

    console.log("loading now");

		game.load.tilemap("asd", "assets/maps/JSON/maptile_01.json", null, Phaser.Tilemap.TILED_JSON);
    
    game.load.start();
	};

self.create = () =>
	{
  console.log(collisionData);
	self.map = game.add.tilemap("asd");

	self.map.addTiledImage(collisionAssets, collisionAssets);

	collisionLayer = map.createLayer('collision');
	self.layerGroup.add(collisionLayer);
	spawnLayer = map.createLayer('spawn');
	self.layerGroup.add(createLayer);
	trapLayer = map.createLayer('trap');
	self.layerGroup.add(trapLayer);

	self.layerGroup.setAll('fixedToCamera', false);
	};

self.moveTo = (x, y) =>
	{
	self.layerGroup.setAll('x', x);
	self.layerGroup.setAll('y', y);
	};

self.moveBy = (amount) =>
	{
		self.layerGroup.forEach(moveLayer, this, true, amount);
	};

var moveLayer = (layer, amount) =>
	{
		layer.x = layer.x + amount.x;
		layer.y = layer.y + amount.y;
	};

}
	




		


