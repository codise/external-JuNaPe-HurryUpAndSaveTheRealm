'use strict';

//The First Demo Map
var round1 = {};

//----

var room1colliders = {};
//top wall
room1colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom wall
room1colliders[1] = new wallCollider(maxTilesX, 0.7, 0, maxTilesY, 0, 1);
//left wall
room1colliders[2] = new wallCollider(1, maxTilesY, 0, 0, 0, 0);
//candelabra
room1colliders.c1 = new smallCollisionSprite( 3, 4, 'candelabrum');
room1colliders.c2 = new smallCollisionSprite( 3, (maxTilesY-4), 'candelabrum');
room1colliders.c3 = new smallCollisionSprite( 7, 3.6, 'candelabrum');
room1colliders.c4 = new smallCollisionSprite( 7, (maxTilesY-3.4), 'candelabrum');

//----

var room2colliders = {};
//top wall
room2colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom corner wall
room2colliders[1] = new wallCollider(1, 0.7, 0, maxTilesY, 0, 1);
//right wall
room2colliders[2] = new wallCollider(1, maxTilesY, maxTilesX, 0, 1, 0);
//candelabra
room2colliders.c1 = new smallCollisionSprite( maxTilesX-5, 4, 'candelabrum');
room2colliders.c2 = new smallCollisionSprite( maxTilesX-3, 6, 'candelabrum');
room2colliders.c3 = new smallCollisionSprite( maxTilesX-5, maxTilesY-4, 'candelabrum');
room2colliders.c4 = new smallCollisionSprite( maxTilesX-3, maxTilesY-6, 'candelabrum');

//----


var room3colliders = {};
//left wall
room3colliders[0] = new wallCollider(1, maxTilesY, 0, 0, 0, 0);
//right wall
room3colliders[1] = new wallCollider(1, maxTilesY, maxTilesX, 0, 1, 0);
//candelabra
room3colliders.c1 = new smallCollisionSprite( 7, 3, 'candelabrum');
room3colliders.c2 = new smallCollisionSprite( (maxTilesX-9), 3, 'candelabrum');
room3colliders.c3 = new smallCollisionSprite( 7, (maxTilesY-4), 'candelabrum');
room3colliders.c4 = new smallCollisionSprite( (maxTilesX-9), (maxTilesY-4), 'candelabrum');
//pillars
room3colliders.p1 = new smallCollisionSprite( 7, (maxTilesY+1)/2 - 1, 'pillar');
room3colliders.p2 = new smallCollisionSprite( (maxTilesX-9), (maxTilesY+1)/2 - 1, 'pillar');

//----


var room4colliders = {};
//top corner wall
room4colliders[0] = new wallCollider(1, 2, maxTilesX, 0, 1, 0);
//bottom wall
room4colliders[1] = new wallCollider(maxTilesX, 0.7, 0, maxTilesY, 0, 1);
//left wall
room4colliders[2] = new wallCollider(1, maxTilesY, 0, 0, 0, 0);
//candelabra
room4colliders.c1 = new smallCollisionSprite( 3, (maxTilesY-7), 'candelabrum');
room4colliders.c3 = new smallCollisionSprite( 3, (maxTilesY-3), 'candelabrum');
room4colliders.c2 = new smallCollisionSprite( 7, (maxTilesY-3), 'candelabrum');
//pillars
room4colliders.p1 = new smallCollisionSprite( (maxTilesX - 2), 3, 'pillar');
room4colliders.p2 = new smallCollisionSprite( (maxTilesX - 2), (maxTilesY - 3.5) , 'pillar');

//----


var room5colliders = {};
//top wall
room5colliders[0] = new wallCollider(maxTilesX, 2, 0, 0, 0, 0);
//bottom wall
room5colliders[1] = new wallCollider(maxTilesX, 0.7, 0, maxTilesY, 0, 1);
//right wall
room5colliders[2] = new wallCollider(1, maxTilesY, maxTilesX, 0, 1, 0);
//pillars
room5colliders.p1 = new smallCollisionSprite( 2, 4, 'pillar');
room5colliders.p2 = new smallCollisionSprite( 6, 4, 'pillar');
room5colliders.p3 = new smallCollisionSprite( 2, (maxTilesY - 3.5), 'pillar');
room5colliders.p4 = new smallCollisionSprite( 6, (maxTilesY - 3.5), 'pillar');

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