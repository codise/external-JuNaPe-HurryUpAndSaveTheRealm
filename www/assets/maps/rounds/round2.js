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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
};
//pillars
room1colliders.p1 = new smallCollisionSprite( 4.5* tileWidth, 5 * tileHeight, 'pillar');
room1colliders.p2 = new smallCollisionSprite( 8.5* tileWidth, 5 * tileHeight, 'pillar');
room1colliders.p3 = new smallCollisionSprite( 11.5* tileWidth, 5 * tileHeight, 'pillar');
room1colliders.p4 = new smallCollisionSprite( 15.5* tileWidth, 5 * tileHeight, 'pillar');
room1colliders.p5 = new smallCollisionSprite( 18.5* tileWidth, 5 * tileHeight, 'pillar');
room1colliders.p6 = new smallCollisionSprite( 4.5* tileWidth, (maxTilesY - 4) * tileHeight, 'pillar');
room1colliders.p7 = new smallCollisionSprite( 8.5* tileWidth, (maxTilesY - 4) * tileHeight, 'pillar');
room1colliders.p8 = new smallCollisionSprite( 11.5* tileWidth, (maxTilesY - 4) * tileHeight, 'pillar');
room1colliders.p9 = new smallCollisionSprite( 15.5* tileWidth, (maxTilesY - 4) * tileHeight, 'pillar');
room1colliders.p10 = new smallCollisionSprite( 18.5* tileWidth, (maxTilesY - 4) * tileHeight, 'pillar');



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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
};
//candelabra
room2colliders.c1 = new smallCollisionSprite( 17.5*tileWidth, 8*tileHeight, 'candelabrum');
room2colliders.c2 = new smallCollisionSprite( 12.5*tileWidth, 12*tileHeight, 'candelabrum');

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
	image: 'empty'
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
	image: 'empty'
};
//candelabra
room3colliders.c1 = new smallCollisionSprite( 8.5*tileWidth, 6*tileHeight, 'candelabrum');
room3colliders.c2 = new smallCollisionSprite( 16.5*tileWidth, 6*tileHeight, 'candelabrum');
room3colliders.c3 = new smallCollisionSprite( 8.5*tileWidth, 11*tileHeight, 'candelabrum');
room3colliders.c4 = new smallCollisionSprite( 16.5*tileWidth, 11*tileHeight, 'candelabrum');

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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
};
//candelabra
room4colliders.c1 = new smallCollisionSprite( 4.5 *tileWidth, (maxTilesY - 1) *tileHeight, 'candelabrum');
room4colliders.c2 = new smallCollisionSprite( 8.5 *tileWidth, (maxTilesY - 1) *tileHeight, 'candelabrum');
room4colliders.c3 = new smallCollisionSprite( 16.5 *tileWidth, (maxTilesY - 1) *tileHeight, 'candelabrum');
room4colliders.c4 = new smallCollisionSprite( 19.5 *tileWidth, (maxTilesY - 1) *tileHeight, 'candelabrum');
room4colliders.c5 = new smallCollisionSprite( 14.5 *tileWidth, 8*tileHeight, 'candelabrum');
room4colliders.c6 = new smallCollisionSprite( 12.5 *tileWidth, 6*tileHeight, 'candelabrum');
//pillars
room4colliders.p1 = new smallCollisionSprite( 2.5* tileWidth, 4 * tileHeight, 'pillar');
room4colliders.p2 = new smallCollisionSprite( 2.5* tileWidth, 12 * tileHeight, 'pillar');

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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
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
	image: 'empty'
};
//candelabra
room5colliders.c1 = new smallCollisionSprite( 2.5 *tileWidth, 4 *tileHeight, 'candelabrum');
room5colliders.c2 = new smallCollisionSprite( 2.5 *tileWidth, (maxTilesY - 3) *tileHeight, 'candelabrum');
//pillars
room5colliders.p1 = new smallCollisionSprite( 12.5* tileWidth, 4 * tileHeight, 'pillar');
room5colliders.p2 = new smallCollisionSprite( (maxTilesX - 2.5)* tileWidth, 4 * tileHeight, 'pillar');
room5colliders.p3 = new smallCollisionSprite( 12.5* tileWidth, (maxTilesY - 3) * tileHeight, 'pillar');
room5colliders.p4 = new smallCollisionSprite( (maxTilesX - 2.5)* tileWidth, (maxTilesY - 3) * tileHeight, 'pillar');

//----

round2.rooms = [
	{"roomBg": "Demo2Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo2Map2.png", "colliders": room2colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo2Map3.png", "colliders": room3colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo2Map4.png", "colliders": room4colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "Demo2Map5.png", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"}
	];
round2.boss = 'king';
round2.bgm = 'bgm02'
