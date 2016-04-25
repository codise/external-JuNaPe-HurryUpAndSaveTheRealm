'use strict';

//The First Demo Map
var round1 = {};

var tileWidth = 80;
var tileHeight = 72;
var maxTilesX = 24;
var maxTilesY = 15;

//----

var room1colliders = {};
//top wall
room1colliders[0] = 
{
	width: 24 * tileWidth,
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
	width: 24 * tileWidth,
	height: 0.7 * tileHeight,
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

//----

var room2colliders = {};
//top wall
room2colliders[0] = 
{
	width: 24 * tileWidth,
	height: 2 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//bottom corner wall
room2colliders[1] = 
{
	width: 1 * tileWidth,
	height: 0.7 * tileHeight,
	x: 0,
	y: 15 * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};
//right wall
room2colliders[2] = 
{
	width: tileWidth,
	height: 15 * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};

//----


var room3colliders = {};
//left wall
room3colliders[0] = 
{
	width: tileWidth,
	height: 15 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//right wall
room3colliders[1] = 
{
	width: tileWidth,
	height: 15 * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};

//----


var room4colliders = {};
//top corner wall
room4colliders[0] = 
{
	width: 1 * tileWidth,
	height: 2 * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//bottom wall
room4colliders[1] = 
{
	width: 24 * tileWidth,
	height: 0.7 * tileHeight,
	x: 0,
	y: 15 * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};
//left wall
room4colliders[2] = 
{
	width: tileWidth,
	height: 15 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};

//----


var room5colliders = {};
//top wall
room5colliders[0] = 
{
	width: 24 * tileWidth,
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
	width: 24 * tileWidth,
	height: 0.7 * tileHeight,
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
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};

//----







round1.rooms = [
	{"roomBg": "Demo1Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo1Map2.png", "colliders": room2colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo1Map3.png", "colliders": room3colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo1Map4.png", "colliders": room4colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo1Map5.png", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"}
	];
round1.boss = 'king';