'use strict';

	//The Second Demo Map aka Stairs to Tower
var round2 = {};

//----

var room1colliders = {};
//top wall 1
room1colliders[0] = 
{
	width: 15 * tileWidth,
	height: 1 * tileHeight,
	x: 1 * tileWidth,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//top wall 2
room1colliders[1] = 
{
	width: 13 * tileWidth,
	height: 2 * tileHeight,
	x: 2 * tileWidth,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//top wall 3
room1colliders[2] = 
{
	width: 6 * tileWidth,
	height: 1 * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};
//top wall 4
room1colliders[3] = 
{
	width: 5 * tileWidth,
	height: 2 * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};
//bottom corner wall
room1colliders[4] = 
{
	width: 2 * tileWidth,
	height: (2 - 0.1) * tileHeight,
	x: maxTilesX * tileWidth,
	y: maxTilesY * tileHeight,
	anchorX: 1,
	anchorY: 1,
	image: 'test'
};

//----

var room2colliders = {};
//top wall corner 1
room2colliders[0] = 
{
	width: 2 * tileWidth,
	height: 2 * tileHeight,
	x: 0 * tileWidth,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//top wall corner 2
room2colliders[1] = 
{
	width: 2 * tileWidth,
	height: 2 * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};
//right wall
room2colliders[2] = 
{
	width: 0.7 * tileWidth,
	height: maxTilesY * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};
//bottom wall
room2colliders[3] = 
{
	width: (maxTilesX - 3) * tileWidth,
	height: (2 - 0.1) * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};

//----

var room3colliders = {};
//left wall
room3colliders[0] = 
{
	width: 2 * tileWidth,
	height: maxTilesY * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//right wall
room3colliders[1] = 
{
	width: 2 * tileWidth,
	height: maxTilesY * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};

//----

var room4colliders = {};
//right wall
room4colliders[0] = 
{
	width: 0.7 * tileWidth,
	height: maxTilesY * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};
//top wall
room4colliders[1] = 
{
	width: maxTilesX * tileWidth,
	height: 2 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//right corner
room4colliders[2] = 
{
	width: 2 * tileWidth,
	height: (2 - 0.1) * tileHeight,
	x: maxTilesX * tileWidth,
	y: maxTilesY * tileHeight,
	anchorX: 1,
	anchorY: 1,
	image: 'test'
};
//left corner
room4colliders[3] = 
{
	width: 2 * tileWidth,
	height: 2 * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};
//left top wall protrusion
room4colliders[4] = 
{
	width: 2 * tileWidth,
	height: 3 * tileHeight,
	x: 6 * tileWidth,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//right top wall protrusion
room4colliders[5] = 
{
	width: 2 * tileWidth,
	height: 3 * tileHeight,
	x: (maxTilesX - 5) * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};

//----

var room5colliders = {};
//top wall
room5colliders[0] = 
{
	width: maxTilesX * tileWidth,
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
	width: maxTilesX * tileWidth,
	height: (2 - 0.1) * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};
//top corner 1
room5colliders[2] = 
{
	width: 3 * tileWidth,
	height: 3 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//top corner 2
room5colliders[3] = 
{
	width: 2 * tileWidth,
	height: 4 * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//bottom corner 1
room5colliders[4] = 
{
	width: 3 * tileWidth,
	height: 3 * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};
//bottom corner 2
room5colliders[5] = 
{
	width: 2 * tileWidth,
	height: 4 * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'test'
};
//top protrusion
room5colliders[6] = 
{
	width: 4 * tileWidth,
	height: 3 * tileHeight,
	x: (maxTilesX - 5) * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};
//bottom protrusion
room5colliders[7] = 
{
	width: 4 * tileWidth,
	height: 3 * tileHeight,
	x: (maxTilesX - 5) * tileWidth,
	y: maxTilesY * tileHeight,
	anchorX: 1,
	anchorY: 1,
	image: 'test'
};
//right wall
room5colliders[8] = 
{
	width: 1 * tileWidth,
	height: maxTilesY * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};

//----


round2.rooms = [
	{"roomBg": "Demo2Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo2Map2.png", "colliders": room2colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo2Map3.png", "colliders": room3colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo2Map4.png", "colliders": room4colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "Demo2Map5.png", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"}
	];
round2.boss = 'king';
