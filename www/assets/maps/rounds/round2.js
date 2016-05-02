'use strict';

	//The Second Demo Map aka Stairs to Tower
var round2 = {};

//----

var room1colliders = {};
//top wall 1
room1colliders[0] = new wallCollider(15, 1, 1, 0, 0, 0);
//top wall 2
room1colliders[1] = new wallCollider(13, 2, 2, 0, 0, 0);
//top wall 3
room1colliders[2] = new wallCollider(6, 1, maxTilesX, 0, 1, 0);
//top wall 4
room1colliders[3] = new wallCollider(5, 2, maxTilesX, 0, 1, 0);
//bottom corner wall
room1colliders[4] = new wallCollider(2, 1.9, maxTilesX, maxTilesY, 1, 1);
//pillars
room1colliders.p1 = new smallCollisionSprite( 4, 4 , 'pillar');
room1colliders.p2 = new smallCollisionSprite( 8, 4 , 'pillar');
room1colliders.p3 = new smallCollisionSprite( 11, 4 , 'pillar');
room1colliders.p4 = new smallCollisionSprite( 15, 4 , 'pillar');
room1colliders.p5 = new smallCollisionSprite( 18, 4 , 'pillar');
room1colliders.p6 = new smallCollisionSprite( 4, (maxTilesY - 5) , 'pillar');
room1colliders.p7 = new smallCollisionSprite( 8, (maxTilesY - 5) , 'pillar');
room1colliders.p8 = new smallCollisionSprite( 11, (maxTilesY - 5) , 'pillar');
room1colliders.p9 = new smallCollisionSprite( 15, (maxTilesY - 5) , 'pillar');
room1colliders.p10 = new smallCollisionSprite( 18, (maxTilesY - 5) , 'pillar');



//----

var room2colliders = {};
//top wall corner 1
room2colliders[0] = new wallCollider(2, 2, 0, 0, 0, 0);
//top wall corner 2
room2colliders[1] = new wallCollider(2, 2, maxTilesX, 0, 1, 0);
//right wall
room2colliders[2] = new wallCollider(0.7, maxTilesY, maxTilesX, 0, 1, 0);
//bottom wall
room2colliders[3] = new wallCollider(maxTilesX - 3, 1.9, 0, maxTilesY, 0, 1);
//candelabra
room2colliders.c1 = new smallCollisionSprite( 17, 7, 'candelabrum');
room2colliders.c2 = new smallCollisionSprite( 12, 11, 'candelabrum');

//----

var room3colliders = {};
//left wall
room3colliders[0] = new wallCollider(2, maxTilesY, 0, 0, 0, 0);
//right wall
room3colliders[1] = new wallCollider(2, maxTilesY, maxTilesX, 0, 1, 0);
//candelabra
room3colliders.c1 = new smallCollisionSprite( 8, 5, 'candelabrum');
room3colliders.c2 = new smallCollisionSprite( 16, 5, 'candelabrum');
room3colliders.c3 = new smallCollisionSprite( 8, 10, 'candelabrum');
room3colliders.c4 = new smallCollisionSprite( 16, 10, 'candelabrum');

//----

var room4colliders = {};
//right wall
room4colliders[0] = new wallCollider(0.7, maxTilesY, maxTilesX, 0, 1, 0);
//top wall
room4colliders[1] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//right corner
room4colliders[2] = new wallCollider(2, 1.9, maxTilesX, maxTilesY, 1, 1);
//left corner
room4colliders[3] = new wallCollider(2, 2, 0, maxTilesY, 0, 1);
//left top wall protrusion
room4colliders[4] = new wallCollider(2, 3, 6, 0, 0, 0);
//right top wall protrusion
room4colliders[5] = new wallCollider(2, 3, maxTilesX - 5, 0, 1, 0);
//candelabra
room4colliders.c1 = new smallCollisionSprite( 4 , (maxTilesY - 2) , 'candelabrum');
room4colliders.c2 = new smallCollisionSprite( 8 , (maxTilesY - 2) , 'candelabrum');
room4colliders.c3 = new smallCollisionSprite( 16 , (maxTilesY - 2) , 'candelabrum');
room4colliders.c4 = new smallCollisionSprite( 19 , (maxTilesY - 2) , 'candelabrum');
room4colliders.c5 = new smallCollisionSprite( 14 , 7, 'candelabrum');
room4colliders.c6 = new smallCollisionSprite( 12 , 5, 'candelabrum');
//pillars
room4colliders.p1 = new smallCollisionSprite( 2, 3 , 'pillar');
room4colliders.p2 = new smallCollisionSprite( 2, 11 , 'pillar');

//----

var room5colliders = {};
//top wall
room5colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom wall
room5colliders[1] = new wallCollider(maxTilesX, 1.9, 0, maxTilesY, 0, 1);
//top corner 1
room5colliders[2] = new wallCollider(3, 3, 0, 0, 0, 0);
//top corner 2
room5colliders[3] = new wallCollider(2, 4, 0, 0, 0, 0);
//bottom corner 1
room5colliders[4] = new wallCollider(3, 3, 0, maxTilesY, 0, 1);
//bottom corner 2
room5colliders[5] = new wallCollider(2, 4, 0, maxTilesY, 0, 1);
//top protrusion
room5colliders[6] = new wallCollider(4, 3, maxTilesX - 5, 0, 1, 0);
//bottom protrusion
room5colliders[7] = new wallCollider(4, 3, maxTilesX - 5, maxTilesY, 1, 1);
//right wall
room5colliders[8] = new wallCollider(1, maxTilesY, 0, 0, 0, 0);
//candelabra
room5colliders.c1 = new smallCollisionSprite( 2 , 3 , 'candelabrum');
room5colliders.c2 = new smallCollisionSprite( 2 , (maxTilesY - 4) , 'candelabrum');
//pillars
room5colliders.p1 = new smallCollisionSprite( 14, 2, 'pillar');
room5colliders.p2 = new smallCollisionSprite( 14, maxTilesY - 3, 'pillar');
room5colliders.p3 = new smallCollisionSprite( 19, 2, 'pillar');
room5colliders.p4 = new smallCollisionSprite( 19, maxTilesY - 3, 'pillar');

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
