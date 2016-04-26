'use strict';

	//Walk around the wall grassland
var round4 = {};

//----

var room1colliders = {};
//right wall
room1colliders[0] = 
{
	width: 1 * tileWidth,
	height: (maxTilesY - 1) * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'test'
};

//----

var room2colliders = {};

//----

var room3colliders = {};
//pillars
room3colliders.p1 = new smallCollisionSprite( 5.5 * tileWidth, 3 * tileHeight, 'pillar');
room3colliders.p2 = new smallCollisionSprite( 18.5 * tileWidth, 3 * tileHeight, 'pillar');

//----

var room4colliders = {};
//left wall
room4colliders[0] = 
{
	width: 1 * tileWidth,
	height: (maxTilesY - 1) * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'test'
};
//pillars
room4colliders.p1 = new smallCollisionSprite( 5.5 * tileWidth, 3 * tileHeight, 'pillar');
room4colliders.p2 = new smallCollisionSprite( 18.5 * tileWidth, 3 * tileHeight, 'pillar');
room4colliders.p3 = new smallCollisionSprite( 3.5 * tileWidth, 8 * tileHeight, 'pillar');
room4colliders.p4 = new smallCollisionSprite( 20.5 * tileWidth, 8 * tileHeight, 'pillar');
room4colliders.p5 = new smallCollisionSprite( 5.5 * tileWidth, 13 * tileHeight, 'pillar');
room4colliders.p6 = new smallCollisionSprite( 18.5 * tileWidth, 13 * tileHeight, 'pillar');

//----

round4.rooms = [
	{"roomBg": "Demo4Map1.png", "colliders": room1colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo4Map2.png", "colliders": room2colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo4Map3.png", "colliders": room3colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo4Map4.png", "colliders": room4colliders, "moveDirection": "null", "moveSpeed": "stop"},
	];
round4.boss = 'tentacle';
