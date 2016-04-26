'use strict';

	//Graveyard of the Fallen King
var round5 = {};

//----

var room1colliders = {};

//----

var room2colliders = {};

//----

var room3colliders = {};

//----

var room4colliders = {};

//----


round5.rooms = [
	{"roomBg": "Demo5Map1.png", "colliders": room1colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map2.png", "colliders": room2colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map3.png", "colliders": room3colliders, "moveDirection": "east", "moveSpeed": "normal"},
	{"roomBg": "Demo5Map4.png", "colliders": room4colliders, "moveDirection": "null", "moveSpeed": "stop"},
	];
round5.boss = 'king';
