'use strict';

var playState = function ()
{
var self = this;

var roundManager;

var enemyManager;
var bulletManager;

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

	bulletManager = new BulletManager(game);
	enemyManager = new EnemyManager(game, bulletManager);

	game.world.setBounds(0, 0, 10 * gameWidth, 10 * gameHeight);

	roundManager = new RoundManager(game, bulletManager, enemyManager);
	roundManager.loadRound("assets/maps/rounds/round.json");
	};
	

self.create = () =>
	{
		for (var i = 0; i < game.waitingRoomIds.length ; i++)
			{
			roundManager.newPlayer(game.waitingRoomIds[i]);
			};
	};

self.setPlayerInput = (id, input) =>
	{
	roundManager.setPlayerInput(id, input);
	};

self.update = () =>
	{
	roundManager.update();
	if (roundManager.roundOver)
		{
		game.roundScoreTable = roundManager.getScoreTable();
		game.state.start('roundOver');
		}
	};

self.render = () => {};


self.onControllerConnected = (id) =>
	{
	roundManager.newPlayer(id);
	};

self.onControllerDisconnected = (id) =>
	{
	roundManager.disconnectPlayer(id);
	};

};