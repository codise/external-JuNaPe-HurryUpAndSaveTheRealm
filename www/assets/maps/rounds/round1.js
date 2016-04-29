'use strict';

//The First Demo Map
var round1 = {};

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
	image: 'empty'
};
//bottom wall
room1colliders[1] = 
{
	width: 24 * tileWidth,
	height: 0.7 * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'empty'
};
//left wall
room1colliders[2] = 
{
	width: tileWidth,
	height: maxTilesY * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'empty'
};
//candelabra
room1colliders.c1 = new smallCollisionSprite( 3.6*tileWidth, 5*tileHeight, 'candelabrum');
room1colliders.c2 = new smallCollisionSprite( 3.6*tileWidth, (maxTilesY-3)*tileHeight, 'candelabrum');
room1colliders.c3 = new smallCollisionSprite( 7.7*tileWidth, 4*tileHeight, 'candelabrum');
room1colliders.c4 = new smallCollisionSprite( 7.7*tileWidth, (maxTilesY-2)*tileHeight, 'candelabrum');

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
	image: 'empty'
};
//bottom corner wall
room2colliders[1] = 
{
	width: 1 * tileWidth,
	height: 0.7 * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'empty'
};
//right wall
room2colliders[2] = 
{
	width: tileWidth,
	height: maxTilesY * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'empty'
};
//candelabra
room2colliders.c1 = new smallCollisionSprite( (maxTilesX-3.6)*tileWidth, 5*tileHeight, 'candelabrum');
room2colliders.c2 = new smallCollisionSprite( (maxTilesX-2.5)*tileWidth, 7*tileHeight, 'candelabrum');
room2colliders.c3 = new smallCollisionSprite( (maxTilesX-3.6)*tileWidth, (maxTilesY-3)*tileHeight, 'candelabrum');
room2colliders.c4 = new smallCollisionSprite( (maxTilesX-2.5)*tileWidth, (maxTilesY-5)*tileHeight, 'candelabrum');

//----


var room3colliders = {};
//left wall
room3colliders[0] = 
{
	width: tileWidth,
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
	width: tileWidth,
	height: maxTilesY * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'empty'
};
//candelabra
room3colliders.c1 = new smallCollisionSprite( 8*tileWidth, 4*tileHeight, 'candelabrum');
room3colliders.c2 = new smallCollisionSprite( (maxTilesX-8)*tileWidth, 4*tileHeight, 'candelabrum');
room3colliders.c3 = new smallCollisionSprite( 8*tileWidth, (maxTilesY-3)*tileHeight, 'candelabrum');
room3colliders.c4 = new smallCollisionSprite( (maxTilesX-8)*tileWidth, (maxTilesY-3)*tileHeight, 'candelabrum');
//pillars
room3colliders.p1 = new smallCollisionSprite( 8*tileWidth, (maxTilesY+1)*tileHeight/2, 'pillar');
room3colliders.p2 = new smallCollisionSprite( (maxTilesX-8)*tileWidth, (maxTilesY+1)*tileHeight/2, 'pillar');

//----


var room4colliders = {};
//top corner wall
room4colliders[0] = 
{
	width: 1 * tileWidth,
	height: 1 * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'empty'
};
//bottom wall
room4colliders[1] = 
{
	width: 24 * tileWidth,
	height: 0.7 * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'empty'
};
//left wall
room4colliders[2] = 
{
	width: tileWidth,
	height: maxTilesY * tileHeight,
	x: 0,
	y: 0,
	anchorX: 0,
	anchorY: 0,
	image: 'empty'
};
//candelabra
room4colliders.c1 = new smallCollisionSprite( 3.7*tileWidth, (maxTilesY-6)*tileHeight, 'candelabrum');
room4colliders.c3 = new smallCollisionSprite( 3.7*tileWidth, (maxTilesY-2)*tileHeight, 'candelabrum');
room4colliders.c2 = new smallCollisionSprite( 7.8*tileWidth, (maxTilesY-2)*tileHeight, 'candelabrum');
//pillars
room4colliders.p1 = new smallCollisionSprite( (maxTilesX - 1.5)* tileWidth, 4* tileHeight, 'pillar');
room4colliders.p2 = new smallCollisionSprite( (maxTilesX - 1.5)* tileWidth, (maxTilesY - 2)* tileHeight , 'pillar');

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
	image: 'empty'
};
//bottom wall
room5colliders[1] = 
{
	width: 24 * tileWidth,
	height: 0.7 * tileHeight,
	x: 0,
	y: maxTilesY * tileHeight,
	anchorX: 0,
	anchorY: 1,
	image: 'empty'
};
//right wall
room5colliders[2] = 
{
	width: tileWidth,
	height: maxTilesY * tileHeight,
	x: maxTilesX * tileWidth,
	y: 0,
	anchorX: 1,
	anchorY: 0,
	image: 'empty'
};
//pillars
room5colliders.p1 = new smallCollisionSprite( 2.5* tileWidth, 5* tileHeight, 'pillar');
room5colliders.p2 = new smallCollisionSprite( 6.7* tileWidth, 5* tileHeight, 'pillar');
room5colliders.p3 = new smallCollisionSprite( 2.5* tileWidth, (maxTilesY - 2)* tileHeight , 'pillar');
room5colliders.p4 = new smallCollisionSprite( 6.7* tileWidth, (maxTilesY - 2)* tileHeight , 'pillar');

//----




round1.rooms = [
	{"roomBg": "Demo1Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo1Map2.png", "colliders": room2colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo1Map3.png", "colliders": room3colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo1Map4.png", "colliders": room4colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo1Map5.png", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"}
	];
round1.boss = 'king';
round1.bgm = 'bgm01'