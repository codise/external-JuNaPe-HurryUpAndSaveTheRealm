'use strict';

var gameWidth = window.innerWidth * window.devicePixelRatio;
var gameHeight = window.innerHeight * window.devicePixelRatio;
var wantedGameWidth = 1920;
var wantedGameHeight = 1080;

scalingFactors = { "x": gameWidth / wantedGameWidth,
									 "y": gameHeight / wantedGameHeight};

var gameConfig = {width: gameWidth,
									height: gameHeight,
									renderer: Phaser.CANVAS,
									parent: 'gameDiv',
									transparent: false,
									antialiasing: false,
									forceSetTimeout: false};
									
var game = new Phaser.Game(gameConfig);


var game_state = {};
var serverAddress = 'localhost';


game_state.main = function ()
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
	self.id = getParameter('id');
	if (!self.id)
		{
		self.id = 1;
		}

	gameClient.connect(serverAddress, gamePort, self.id, self.clientConnected);
	//console.log("Game.js Connecting to: "+serverAddress+ "Port: "+gamePort);

	game.load.image('player1', 'assets/player_classes/knightx.png');
	game.load.image('player2', 'assets/player_classes/elfx.png');
	game.load.image('player3', 'assets/player_classes/warlockx.png');
	game.load.image('player4', 'assets/player_classes/ninjax.png');
	game.load.image('player5', 'assets/player_classes/magex.png');
	game.load.image('player6', 'assets/player_classes/vikingx.png');
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

	game.physics.startSystem(Phaser.Physics.ARCADE);
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

self.onScreenConnected = (id) =>
	{
	//console.log("OwnScreen::onScreenConnected() "+ id);
	//console.log("Currently connected screens: " + gameClient.getConnectedScreenIds());
	};

self.onScreenDisconnected = (id) =>
	{
	//console.log("OwnScreen::onScreenDisconnected() "+id);
	//console.log("Currently connected screens: " + gameClient.getConnectedScreenIds());
	};

self.clientConnected = () =>
	{
	//console.log("DemoScreen::screenConnected()");

	gameClient.setClientConnectionListener(self, self.onControllerConnected);
	gameClient.setClientDisconnectionListener(self, self.onControllerDisconnected);
	gameClient.setScreenConnectionListener(self, self.onScreenConnected);
	gameClient.setScreenDisconnectionListener(self, self.onScreenDisconnected);


	gameClient.exposeRpcMethod("setPlayerInput", self, self.setPlayerInput);

	gameClient.callClientRpc(1, "setStickPosition", [211,100],  self, null);
	gameClient.callClientRpc(1, "getStickPosition", [],  self, function(err, data)
		{
		//console.log("Stick position received: "+data);
		});

	};
};

game.state.add('main', game_state.main);
game.state.start('main');
