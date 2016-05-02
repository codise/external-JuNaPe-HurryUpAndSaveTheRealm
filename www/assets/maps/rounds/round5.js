'use strict';

	//Graveyard of the Fallen King
var round5 = {};

//----

var room1colliders = {};
//pillars
room1colliders.p1 = new smallCollisionSprite( 16.5 * tileWidth, 5 * tileHeight, 'pillar');
room1colliders.p2 = new smallCollisionSprite( 16.5 * tileWidth, 12 * tileHeight, 'pillar');

//----

var room2colliders = {};
//pillars
room2colliders.p1 = new smallCollisionSprite( 10.5 * tileWidth, 6 * tileHeight, 'pillar');
room2colliders.p2 = new smallCollisionSprite( 10.5 * tileWidth, 10 * tileHeight, 'pillar');
room2colliders.p3 = new smallCollisionSprite( 17.5 * tileWidth, 6 * tileHeight, 'pillar');
room2colliders.p4 = new smallCollisionSprite( 17.5 * tileWidth, 10 * tileHeight, 'pillarGone');
//king statue
room2colliders.k1 = new largeCollisionSprite( 14 * tileWidth, 8 * tileHeight, 'kingStatue');

//----

var room3colliders = {};
//gravestones
room3colliders.g1 = new smallCollisionSprite( 2.5 * tileWidth, 2 * tileHeight, 'grave4');
room3colliders.g2 = new smallCollisionSprite( 2.5 * tileWidth, 12 * tileHeight, 'grave3');
room3colliders.g3 = new smallCollisionSprite( 2.5 * tileWidth, 14 * tileHeight, 'grave4');
room3colliders.g4 = new smallCollisionSprite( 2.5 * tileWidth, 15 * tileHeight, 'grave3');
room3colliders.g5 = new smallCollisionSprite( 4.5 * tileWidth, 2 * tileHeight, 'grave5');
room3colliders.g6 = new smallCollisionSprite( 6.5 * tileWidth, 2 * tileHeight, 'grave2');
room3colliders.g7 = new smallCollisionSprite( 5.5 * tileWidth, 12 * tileHeight, 'grave2');
room3colliders.g8 = new smallCollisionSprite( 17.5 * tileWidth, 5 * tileHeight, 'grave5');
room3colliders.g9 = new smallCollisionSprite( 17.5 * tileWidth, 8 * tileHeight, 'grave4');
room3colliders.g10 = new smallCollisionSprite( 21.5 * tileWidth, 8 * tileHeight, 'grave2');
room3colliders.g11 = new smallCollisionSprite( 21.5 * tileWidth, 14 * tileHeight, 'grave3');
//pillars
room3colliders.p1 = new smallCollisionSprite( 20.5 * tileWidth, 5 * tileHeight, 'pillar');
room3colliders.p2 = new smallCollisionSprite( 4.5 * tileWidth, 6 * tileHeight, 'pillarGone');
room3colliders.p3 = new smallCollisionSprite( 19.5 * tileWidth, 12 * tileHeight, 'pillarGone');
//statue
room3colliders.s1 = new smallCollisionSprite( 14 * tileWidth, 12 * tileHeight, 'statueHeroBroken');

//----

var room4colliders = {};
//gravestones
room4colliders.g1 = new smallCollisionSprite( 1.5 * tileWidth, 2 * tileHeight, 'grave5');
room4colliders.g2 = new smallCollisionSprite( 4.5 * tileWidth, 2 * tileHeight, 'grave1');
room4colliders.g3 = new smallCollisionSprite( 4.5 * tileWidth, 14 * tileHeight, 'grave1');
room4colliders.g4 = new smallCollisionSprite( 6.5 * tileWidth, 2 * tileHeight, 'grave4');
room4colliders.g5 = new smallCollisionSprite( 6.5 * tileWidth, 14 * tileHeight, 'grave5');
room4colliders.g6 = new smallCollisionSprite( 7.5 * tileWidth, 12 * tileHeight, 'grave4');
room4colliders.g7 = new smallCollisionSprite( 7.5 * tileWidth, 14 * tileHeight, 'grave4');
room4colliders.g8 = new smallCollisionSprite( 8.5 * tileWidth, 15 * tileHeight, 'grave2');
room4colliders.g9 = new smallCollisionSprite( 11.5 * tileWidth, 14 * tileHeight, 'grave5');
room4colliders.g10 = new smallCollisionSprite( 21.5 * tileWidth, 3 * tileHeight, 'grave5');
room4colliders.g11 = new smallCollisionSprite( 21.5 * tileWidth, 8 * tileHeight, 'grave4');
room4colliders.g12 = new smallCollisionSprite( 22.5 * tileWidth, 2 * tileHeight, 'grave3');
room4colliders.g13 = new smallCollisionSprite( 22.5 * tileWidth, 5 * tileHeight, 'grave1');
room4colliders.g14 = new smallCollisionSprite( 22.5 * tileWidth, 9 * tileHeight, 'grave1');
//pillars
room4colliders.p1 = new smallCollisionSprite( 20.5 * tileWidth, 4 * tileHeight, 'pillar');
room4colliders.p2 = new smallCollisionSprite( 5.5 * tileWidth, 4 * tileHeight, 'pillarGone');
room4colliders.p3 = new smallCollisionSprite( 19.5 * tileWidth, 13 * tileHeight, 'pillarGone');
//king statue
room4colliders.k1 = new largeCollisionSprite( 14 * tileWidth, 5 * tileHeight, 'kingStatue');

//----

round5.rooms = [
	{"roomBg": "Demo5Map3.png", "colliders": room3colliders, "moveDirection": "east", "moveSpeed": "fast"},
	{"roomBg": "Demo5Map4.png", "colliders": room4colliders, "moveDirection": "null", "moveSpeed": "stop"},
	];
/*
round5.rooms = [
	{"roomBg": "Demo5Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map2.png", "colliders": room2colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map3.png", "colliders": room3colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map4.png", "colliders": room4colliders, "moveDirection": "null", "moveSpeed": "stop"},
	];*/
round5.boss = 'king';
round5.bgm = 'bgm05'
