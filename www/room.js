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
var myloader = new Phaser.Loader(game);

self.map;

var backgroundLayer;

var mycallback;

self.layerGroup = game.add.group();

self.moveDirection = moveDirection;
self.moveSpeed = moveSpeed;

self.onceScaled = false;
var scale = function ()
	{
	self.layerGroup.forEach(function (layer) { layer.scale.x = scalingFactors.x; layer.scale.y = scalingFactors.y; });
	};

self.preload = function (callback)
	{
	mycallback = callback;
	if (!game.cache.checkImageKey(background))
		{
		myloader.image(background, "assets/maps/backgrounds/" + background);
		}
	myloader.onLoadComplete.addOnce(create);
	myloader.start();
	};

var create = function ()
	{
	backgroundLayer = game.add.sprite(0, 0, background);
	backgroundLayer.smoothed = false;
	self.layerGroup.add(backgroundLayer);
	self.layerGroup.setAll('fixedToCamera', false);
	mycallback();
	};

self.moveTo = function (x, y)
	{
	self.layerGroup.setAll('position.x', x);
	self.layerGroup.setAll('position.y', y);
	};

self.moveBy = function (amount)
	{
	self.layerGroup.forEach(moveLayer, this, true, amount);
	};

self.updateScaling = function ()
	{
	scale();
	self.onceScaled = true;
	};

var moveLayer = function (layer, amount)
	{
	layer.position.x = layer.position.x + amount.x;
	layer.position.y = layer.position.y + amount.y;
	};

/*
* This fixes the errors caused by asynchonous reloading of assets in javascript
*/
var reloadBG = function ()
	{
	console.log("Failed to load the background initially!");
	create();
	};

/*
* Gets the current position of the backgroundlayer
* @return {object} The current location of the layer
*/
self.getPos = function ()
	{
	if(backgroundLayer == undefined) reloadBG(); //If the background failed to load, we forcibly relaod it
	return {"x": backgroundLayer.position.x, "y": backgroundLayer.position.y};
	};
}
