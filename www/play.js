'use strict';

var playState = function ()
{
var self = this;

self.roundManager;

var weaponManager;
self.enemyManager;
self.bulletManager;
var effectManager;

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

	self.bulletManager = new BulletManager(game);
	effectManager = new EffectManager(game);
	self.enemyManager = new EnemyManager(game, self.bulletManager, effectManager);
	
	weaponManager = new WeaponManager(game);
	
	game.world.setBounds(0, 0, 10 * gameWidth, 10 * gameHeight);

	self.roundManager = new RoundManager(game, self.bulletManager, self.enemyManager, weaponManager, effectManager);
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