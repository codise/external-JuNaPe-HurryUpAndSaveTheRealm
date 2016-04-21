'use strict';

//24 * 80 = 1920
//15 * 72 = 1080



var roundtest = {};

var tileWidth = 80;
var tileHeight = 72;

var room1colliders = {};
//top wall
room1colliders[0] = 
{
	width: 23 * tileWidth,
	height: 2 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//bottom wall
room1colliders[1] = 
{
	width: 23 * tileWidth,
	height: 0.8 * tileHeight,
	x: 0,
	y: 15 * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};
//left wall
room1colliders[2] = 
{
	width: tileWidth,
	height: 15 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};


var room5colliders = {};
//top wall
room5colliders[0] = 
{
	width: 23 * tileWidth,
	height: 2 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//bottom wall
room5colliders[1] = 
{
	width: 23 * tileWidth,
	height: 0.8 * tileHeight,
	x: 0,
	y: 15 * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};
//right wall
room5colliders[2] = 
{
	width: tileWidth,
	height: 15 * tileHeight,
	x: 24 * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};


roundtest.rooms = [
	{"roomBg": "DemoMap1.png", "colliders": room1colliders, "roomJSON": "castlebasic.json", "tileset": "tileset.png", "moveDirection": "east", "moveSpeed": "fast"},
	{"roomBg": "DemoMap5.png", "colliders": room5colliders, "roomJSON": "castlebasic.json", "tileset": "tileset.png", "moveDirection": "null", "moveSpeed": "stop"},
	];
roundtest.boss = 'king';
