'use strict';

	//Graveyard of the Fallen King
var round5 = {};

//----

var room1colliders = {};
//pillars
room1colliders.p1 = new smallCollisionSprite( 16, 4, 'pillar');
room1colliders.p2 = new smallCollisionSprite( 16, 11, 'pillar');

//----

var room2colliders = {};
//pillars
room2colliders.p1 = new smallCollisionSprite( 10, 5, 'pillar');
room2colliders.p2 = new smallCollisionSprite( 10, 9, 'pillar');
room2colliders.p3 = new smallCollisionSprite( 17, 5, 'pillar');
room2colliders.p4 = new smallCollisionSprite( 17, 9, 'pillarGone');
//king statue
room2colliders.k1 = new largeCollisionSprite( 14, 7, 'kingStatue');

//----

var room3colliders = {};
//gravestones
room3colliders.g1 = new smallCollisionSprite( 2, 2, 'grave4');
room3colliders.g2 = new smallCollisionSprite( 2, 11, 'grave3');
room3colliders.g4 = new smallCollisionSprite( 2, 14, 'grave3');
room3colliders.g5 = new smallCollisionSprite( 4, 2, 'grave5');
room3colliders.g6 = new smallCollisionSprite( 6, 2, 'grave2');
room3colliders.g7 = new smallCollisionSprite( 5, 11, 'grave2');
room3colliders.g8 = new smallCollisionSprite( 17, 4, 'grave5');
room3colliders.g9 = new smallCollisionSprite( 17, 7, 'grave4');
room3colliders.g10 = new smallCollisionSprite( 21, 7, 'grave2');
room3colliders.g11 = new smallCollisionSprite( 21, 13, 'grave3');
//pillars
room3colliders.p1 = new smallCollisionSprite( 20, 4, 'pillar');
room3colliders.p2 = new smallCollisionSprite( 4, 5, 'pillarGone');
room3colliders.p3 = new smallCollisionSprite( 19, 11, 'pillarGone');
//statue
room3colliders.s1 = new smallCollisionSprite( 14, 11, 'statueHeroBroken');

//----

var room4colliders = {};
//gravestones
room4colliders.g2 = new smallCollisionSprite( 4, 2.2, 'grave1');
room4colliders.g3 = new smallCollisionSprite( 4, 13, 'grave1');
room4colliders.g4 = new smallCollisionSprite( 6, 2.2, 'grave4');
room4colliders.g5 = new smallCollisionSprite( 6, 13, 'grave5');
room4colliders.g6 = new smallCollisionSprite( 7, 11, 'grave4');
room4colliders.g7 = new smallCollisionSprite( 7, 13, 'grave4');
room4colliders.g8 = new smallCollisionSprite( 8, 14, 'grave2');
room4colliders.g9 = new smallCollisionSprite( 11, 13, 'grave5');
room4colliders.g10 = new smallCollisionSprite( 21, 2, 'grave5');
room4colliders.g11 = new smallCollisionSprite( 21, 7, 'grave4');
room4colliders.g12 = new smallCollisionSprite( 22, 1, 'grave3');
room4colliders.g13 = new smallCollisionSprite( 22, 4, 'grave1');
room4colliders.g14 = new smallCollisionSprite( 22, 8, 'grave1');
//pillars
room4colliders.p1 = new smallCollisionSprite( 20, 3, 'pillar');
room4colliders.p2 = new smallCollisionSprite( 19, 12, 'pillarGone');
//king statue
room4colliders.k1 = new largeCollisionSprite( 14, 4, 'kingStatue');

//----

round5.rooms = [
	{"roomBg": "Demo5Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map2.png", "colliders": room2colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map3.png", "colliders": room3colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map4.png", "colliders": room4colliders, "moveDirection": "null", "moveSpeed": "stop"},
	];
round5.boss = 'king';
round5.bgm = 'bgm05'
