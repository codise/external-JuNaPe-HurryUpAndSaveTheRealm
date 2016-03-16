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
var myloader = new Phaser.Loader(game);

self.map;

var collisionLayer;
var spawnLayer;
var trapLayer;
var backgroundLayer;

var mycallback;

self.layerGroup = game.add.group();

self.moveDirection = moveDirection;
self.moveSpeed = moveSpeed;

self.onceScaled = false;
var scale = () =>
	{
	self.layerGroup.forEach((layer) => { layer.scale.x = scalingFactors.x; layer.scale.y = scalingFactors.y; });
	};

self.preload = (callback) =>
	{
	mycallback = callback;
	if (!game.cache.checkImageKey(background))
		{
		myloader.image(background, "assets/maps/backgrounds/" + background);
		}
	if(!game.cache.checkImageKey(collisionAssets))
		{
		myloader.image(collisionAssets, "assets/maps/tiles/" + collisionAssets);
		}

	if(!game.cache.checkJSONKey(collisionData))
		{
		myloader.tilemap(collisionData, "assets/maps/JSON/" + collisionData, null, Phaser.Tilemap.TILED_JSON);
		}

	myloader.onLoadComplete.addOnce(create);
	myloader.start();
	};

var create = () =>
	{
	self.map = game.add.tilemap(collisionData);

	self.map.addTilesetImage(collisionAssets, collisionAssets);

	backgroundLayer = game.add.sprite(0, 0, background);
	backgroundLayer.smoothed = false;
	self.layerGroup.add(backgroundLayer);
	collisionLayer = self.map.createLayer('collisionLayer');
	self.layerGroup.add(collisionLayer);
	spawnLayer = self.map.createLayer('spawnLayer');
	self.layerGroup.add(spawnLayer);
	trapLayer = self.map.createLayer('trapLayer');
	self.layerGroup.add(trapLayer);

	self.layerGroup.setAll('fixedToCamera', false);

	mycallback();
	};

self.moveTo = (x, y) =>
	{
	self.layerGroup.setAll('position.x', x);
	self.layerGroup.setAll('position.y', y);
	};

self.moveBy = (amount) =>
	{
	self.layerGroup.forEach(moveLayer, this, true, amount);
	};

self.updateScaling = () =>
	{
	scale();
	};

var moveLayer = (layer, amount) =>
	{
	layer.position.x = layer.position.x + amount.x;
	layer.position.y = layer.position.y + amount.y;
	};

self.getPos = () =>
	{
	return {"x": backgroundLayer.position.x, "y": backgroundLayer.position.y};
	};
}
