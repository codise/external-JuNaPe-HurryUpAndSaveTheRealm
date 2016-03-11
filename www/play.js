'use strict';

var playState = function ()
{
var self = this;

self.roundManager;

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
//	gameClient.connect(serverAddress, gamePort, game.screenId, self.clientConnected);
	//console.log("Game.js Connecting to: "+serverAddress+ "Port: "+gamePort);

	game.load.image('player1', 'assets/player_classes/knightx.png');
	game.load.image('player2', 'assets/player_classes/elfx.png');
	game.load.image('player3', 'assets/player_classes/warlockx.png');
	game.load.image('player4', 'assets/player_classes/ninjax.png');
	game.load.image('player5', 'assets/player_classes/magex.png');
	game.load.image('player6', 'assets/player_classes/vikingx.png');
	game.load.image('empty', 'assets/other/empty.png');
	game.load.image('magic', 'assets/projectiles/bullet.png');
	game.load.image('enemyBullet', 'assets/projectiles/enemyBullet.png');
	game.load.image('flame', 'assets/projectiles/flame.png');
	game.load.image('enemy_hellbug', 'assets/enemies/enemy_05.png');
	game.load.image('enemy_skeleton', 'assets/enemies/enemy_01.png');
	game.load.image('map', 'assets/maps/castle_basic.png');
  
	}
self.create = () =>
	{
	//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.stage.disableVisibilityChange = true;

	bulletManager = new BulletManager(game);
	enemyManager = new EnemyManager(game, bulletManager);

	//This is bad

	game.world.setBounds(0, 0, 10 * gameWidth, 10 * gameHeight);

	self.roundManager = new RoundManager(game, bulletManager, enemyManager);
	self.roundManager.loadRound("assets/maps/rounds/round.json");
	}

self.setPlayerInput = (id, input) =>
	{
	self.roundManager.setPlayerInput(id, input);
	};

self.update = () =>
	{
	self.roundManager.update();
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
