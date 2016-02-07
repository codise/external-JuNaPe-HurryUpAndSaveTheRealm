'use strict';

function Player(game, x, y)
{
var self = this;

self.input;

self.game = game;
self.maxSpeed = 400;

self.playerSprite = self.game.add.sprite(x, y, 'player');
self.playerSprite.anchor.setTo(0.5, 0.5);

self.game.physics.enable(self.playerSprite, Phaser.Physics.ARCADE);
self.playerSprite.body.collideWorldBounds = true;

self.setInput = (input) =>
	{
	self.input = input;
	}


self.update = () =>
	{
	if (self.input != undefined)
	{
    self.playerSprite.body.velocity.x = self.input.X * 100;
    self.playerSprite.body.velocity.y = self.input.Y * 100;
	}
	};
}
