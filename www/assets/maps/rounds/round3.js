'use strict';

	//The Third Demo Map aka Easter Forest Walk
var round3 = {};

//----

var room1colliders = {};
//structure
room1colliders[0] = 
{
	width: 6 * tileWidth,
	height: 3 * tileHeight,
	x: maxTilesX * tileWidth / 2,
	y: 0,
	anchorX: 0.5,
	anchorY: 0,
	image: 'test'
};

//----

var room2colliders = {};

//----

var room3colliders = {};

//----

var room4colliders = {};

//----

var room5colliders = {};

//----


round3.rooms = [
	{"roomBg": "Demo3Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map2.png", "colliders": room2colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map3.png", "colliders": room3colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map4.png", "colliders": room4colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map5.png", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"}
	];
round3.boss = 'tentacle';
