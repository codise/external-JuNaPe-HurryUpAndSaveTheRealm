'use strict';

	//Walk around the wall grassland
var round4 = {};

//----

var room1colliders = {};
//right wall
room1colliders[0] = new wallCollider(1, maxTilesY - 1, maxTilesX, 0, 1, 0); 

//----

var room2colliders = {};

//----

var room3colliders = {};
//pillars
room3colliders.p1 = new smallCollisionSprite( 5 , 2, 'pillar');
room3colliders.p2 = new smallCollisionSprite( 18 , 2, 'pillar');

//----

var room4colliders = {};
//left wall
room4colliders[0] = new wallCollider(1, maxTilesY - 1, 0, 0, 0, 0); 
//pillars
room4colliders.p1 = new smallCollisionSprite( 5 , 2, 'pillar');
room4colliders.p2 = new smallCollisionSprite( 18 , 2, 'pillar');
room4colliders.p3 = new smallCollisionSprite( 3 , 7, 'pillar');
room4colliders.p4 = new smallCollisionSprite( 20 , 7, 'pillar');
room4colliders.p5 = new smallCollisionSprite( 5 , 12, 'pillar');
room4colliders.p6 = new smallCollisionSprite( 18 , 12, 'pillar');

//----

round4.rooms = [
	{"roomBg": "Demo4Map1.png", "colliders": room1colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "Demo4Map2.png", "colliders": room2colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo4Map3.png", "colliders": room3colliders, "moveDirection": "north", "moveSpeed": "normal"},
	{"roomBg": "Demo4Map4.png", "colliders": room4colliders, "moveDirection": "null", "moveSpeed": "stop"},
	];
round4.boss = 'tentacle';
round4.bgm = 'bgm04'
