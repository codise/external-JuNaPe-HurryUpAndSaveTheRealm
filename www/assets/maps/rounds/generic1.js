'use strict';

var generic1 = {};


var room1colliders = {};
//top
room1colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//right
room1colliders[1] = new wallCollider(1, maxTilesY, maxTilesX, 0, 1, 0);
//bottom
room1colliders[2] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);



var room2colliders = {};
//top
room2colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//left
room2colliders[1] = new wallCollider(1, maxTilesY, 0, 0, 0, 0);
//bottom left
room2colliders[2] = new wallCollider(2, 0.9, 0, maxTilesY, 0, 1);
//bottom right
room2colliders[3] = new wallCollider(2, 0.9, maxTilesX, maxTilesY, 1, 1);
//pillars
room2colliders.p1 = new smallCollisionSprite( 4, 4, 'pillar');
room2colliders.p2 = new smallCollisionSprite( 19, 4, 'pillar');
room2colliders.p3 = new smallCollisionSprite( 4, 11, 'pillar');
room2colliders.p4 = new smallCollisionSprite( 19, 11, 'pillar');



var room3colliders = {};
//top left
room3colliders[0] = new wallCollider(2, 2, 0, 0, 0, 0);
//top right
room3colliders[1] = new wallCollider(2, 2, maxTilesX, 0, 1, 0);
//right
room3colliders[2] = new wallCollider(0.75, maxTilesY, maxTilesX, 0, 1, 0);
//right
room3colliders[3] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);
//pillars
room3colliders.p1 = new smallCollisionSprite( 6, 4, 'pillar');
room3colliders.p2 = new smallCollisionSprite( 17, 4, 'pillar');
room3colliders.p3 = new smallCollisionSprite( 6, 9, 'pillar');
room3colliders.p4 = new smallCollisionSprite( 17, 9, 'pillar');



var room4colliders = {};
//top
room4colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom
room4colliders[1] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);



var room5colliders = {};
//top
room5colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom
room5colliders[1] = new wallCollider(maxTilesX, 0.9, 0, maxTilesY, 0, 1);
//left
room5colliders[2] = new wallCollider(0.75, maxTilesY, 0, 0, 0, 0);
//pillars
room5colliders.p1 = new smallCollisionSprite( 4, 5, 'pillar');
room5colliders.p2 = new smallCollisionSprite( 19, 5, 'pillar');
room5colliders.p3 = new smallCollisionSprite( 4, 10, 'pillar');
room5colliders.p4 = new smallCollisionSprite( 19, 10, 'pillar');



generic1.rooms = [
	{"roomBg": "generic_Entrance_FromEast2", "colliders": room1colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "generic_Turn_WtS2_fix", "colliders": room2colliders, "moveDirection": "south", "moveSpeed": "normal"},
	{"roomBg": "generic_Turn_EtN2", "colliders": room3colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "generic_Straight_Vert3"	, "colliders": room4colliders, "moveDirection": "west", "moveSpeed": "normal"},
	{"roomBg": "generic_DeadEnd_FromEast2", "colliders": room5colliders, "moveDirection": "null", "moveSpeed": "stop"},
	];

generic1.boss = 'king';
generic1.bgm = 'bgm05'