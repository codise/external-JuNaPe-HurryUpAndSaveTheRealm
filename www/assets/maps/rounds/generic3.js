'use strict';

var generic3 = {};


var room1colliders = {};
//top
room1colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//right
room1colliders[1] = new wallCollider(1, maxTilesY, maxTilesX, 0, 1, 0);
//bottom
room1colliders[2] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);

room1colliders.p1 = new smallCollisionSprite( 4, 5, 'pillarGone');
room1colliders.p2 = new smallCollisionSprite( 4, 10, 'pillar');


var room2colliders = {};
//top
room2colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom
room2colliders[1] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);

//middle Wall
room2colliders[2] = new wallCollider(maxTilesX-2, 1.9, 1, 7.1, 0, 0);




var room3colliders = {};
//top
room3colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom
room3colliders[1] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);


//middle Wall left
room3colliders[2] = new wallCollider(10, 1.9, 0, 7.1, 0, 0);

//middle Wall right
room3colliders[3] = new wallCollider(10, 1.9, 14, 7.1, 0, 0);



var room4colliders = {};
//top
room4colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom
room4colliders[1] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);

room4colliders.p1 = new smallCollisionSprite( 4, 5, 'pillar');
room4colliders.p2 = new smallCollisionSprite( 4, 10, 'pillar');

var room5colliders = {};
//top
room5colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom
room5colliders[1] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);
//left
room5colliders[2] = new wallCollider(0.75, maxTilesY, 0, 0, 0, 0);
//pillars
room5colliders.p1 = new smallCollisionSprite( 4, 5, 'pillarGone');
room5colliders.p2 = new smallCollisionSprite( 19, 5, 'pillar');
room5colliders.p3 = new smallCollisionSprite( 4, 10, 'pillar');
room5colliders.p4 = new smallCollisionSprite( 19, 10, 'pillar');



generic3.rooms = [
	{"roomBg": "generic_Entrance_FromEast3", "colliders": room1colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "generic_Straight_Vert5"	, "colliders": room2colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "generic_Straight_Vert6"	, "colliders": room3colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "generic_Straight_Vert4"	, "colliders": room4colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "generic_DeadEnd_FromEast1", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"},
	];

generic3.boss = 'tentacle';
generic3.bgm = 'bgm01'
