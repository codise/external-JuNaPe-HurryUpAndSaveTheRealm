'use strict';

var gameWidth = 800;
var gameHeight = 600;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');
var game_state = {};

game_state.main = function ()
{
	var self = this;
	var player;
	var players = {}
	var playerGroup;

	self.preload = () =>
		{
		var id = getParameter('id');
		if (!id) id = 1;

		gameClient.connect("localhost", 8082, id, self.clientConnected);
		}

	self.create = () =>
		{
		game.stage.disableVisibilityChange = true;

		game.physics.startSystem(Phaser.Physics.ARCADE);

		playerGroup = game.add.group();
		}

	self.setPlayerInput = (id, input) =>
		{
		players[id].setInput(input);
		}

	self.update = () =>
		{
		}

	self.render = () => {}


