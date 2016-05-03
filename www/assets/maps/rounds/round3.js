'use strict';

	//The Third Demo Map aka Easter Forest Walk
var round3 = {};

//----

var room1colliders = {};
//structure
room1colliders[0] = new wallCollider(6, 3, maxTilesX / 2, 0, 0.5, 0);

//----

var room2colliders = {};
//statue
room2colliders.s1 = new smallCollisionSprite( (maxTilesX / 2)-0.5, (maxTilesY / 2)-1, 'statueHero');

//----

var room3colliders = {};
//pillars
room3colliders.p1 = new smallCollisionSprite( 7, 5, 'pillar');
room3colliders.p2 = new smallCollisionSprite( 15, 5, 'pillar');
room3colliders.p3 = new smallCollisionSprite( 7, 10, 'pillar');
room3colliders.p4 = new smallCollisionSprite( 15, 10, 'pillar');

//----

var room4colliders = {};
//statue
room4colliders.s1 = new smallCollisionSprite( (maxTilesX / 2)-0.5, (maxTilesY / 2)-1, 'statueHeroBroken');

//----

var room5colliders = {};
//pillars
room5colliders.p1 = new smallCollisionSprite( 7, 4, 'pillar');
room5colliders.p2 = new smallCollisionSprite( 7, 11, 'pillar');

//----


round3.rooms = [
	{"roomBg": "Demo3Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map2.png", "colliders": room2colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map3.png", "colliders": room3colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map4.png", "colliders": room4colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo3Map5.png", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"}
	];
round3.boss = 'tentacle';
round3.bgm = 'bgm03'
