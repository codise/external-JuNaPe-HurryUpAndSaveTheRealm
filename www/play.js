'use strict';

var playState = function ()
{
var self = this;

self.roundManager;

self.enemyManager;
self.bulletManager;

var resizeGame = () =>
	{
	var height = window.innerHeight * window.devicePixelRatio;
	var width = window.innerWidth * window.devicePixelRatio;

	if (game != undefined)
		{
		game.width = width;
		game.height = height;
		game.stage.bounds.width = width;
		game.stage.bounds.height = height;

		if (game.renderType === 1)
			{
			game.renderer.resize(width, height);
			Phaser.Canvas.setSmoothingEnabled(game.context, false);
			}
		}
	};

window.onresize = resizeGame;

self.preload = () =>
	{
	game.stage.disableVisibilityChange = true;

	self.bulletManager = new self.bulletManager(game);
	self.enemyManager = new self.enemyManager(game, self.bulletManager);

	game.world.setBounds(0, 0, 10 * gameWidth, 10 * gameHeight);

	self.roundManager = new self.roundManager(game, self.bulletManager, self.enemyManager);
	self.roundManager.loadRound("assets/maps/rounds/round.json");
	};
	

self.create = () =>
	{
	for (var i = 0; i < game.waitingRoomIds.length ; i++)
		{
		self.roundManager.newPlayer(game.waitingRoomIds[i]);
		};
	};

self.setPlayerInput = (id, input) =>
	{
	self.roundManager.setPlayerInput(id, input);
	};

self.update = () =>
	{
	self.roundManager.update();
	if (self.roundManager.roundOver)
		{
		game.roundScoreTable = self.roundManager.getScoreTable();
		game.state.start('roundOver');
		}
	};

self.render = () => {};


self.onControllerConnected = (id) =>
	{
	self.roundManager.newPlayer(id);
	};

self.onControllerDisconnected = (id) =>
	{
	self.roundManager.disconnectPlayer(id);
	};

};
