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
	image: 'empty'
};

//----

var room2colliders = {};
//statue
room2colliders.s1 = new smallCollisionSprite( maxTilesX / 2 *tileWidth, maxTilesY / 2 *tileHeight, 'statueHero');

//----

var room3colliders = {};
//pillars
room3colliders.p1 = new smallCollisionSprite( 7.5 * tileWidth, 6 * tileHeight, 'pillar');
room3colliders.p2 = new smallCollisionSprite( 15.5 * tileWidth, 6 * tileHeight, 'pillar');
room3colliders.p3 = new smallCollisionSprite( 7.5 * tileWidth, 11 * tileHeight, 'pillar');
room3colliders.p4 = new smallCollisionSprite( 15.5 * tileWidth, 11 * tileHeight, 'pillar');

//----

var room4colliders = {};
//statue
room4colliders.s1 = new smallCollisionSprite( maxTilesX / 2 *tileWidth, maxTilesY / 2 *tileHeight, 'statueHeroBroken');

//----

var room5colliders = {};
//pillars
room5colliders.p1 = new smallCollisionSprite( 7.5 * tileWidth, 5 * tileHeight, 'pillar');
room5colliders.p2 = new smallCollisionSprite( 7.5 * tileWidth, 12 * tileHeight, 'pillar');

//----


round3.rooms = [
	{"roomBg": "Demo3Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map2.png", "colliders": room2colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map3.png", "colliders": room3colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map4.png", "colliders": room4colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map5.png", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"}
	];
round3.boss = 'tentacle';
