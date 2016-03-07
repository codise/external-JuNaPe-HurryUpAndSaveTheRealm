'use strict';

//var gameWidth = window.innerWidth * window.devicePixelRatio;
//var gameHeight = window.innerHeight * window.devicePixelRatio;
var gameWidth = 1920;
var gameHeight = 1080;

var gameConfig = {width: gameWidth,
									height: gameHeight,
									renderer: Phaser.AUTO,
									parent: 'gameDiv',
									transparent: false,
									antialiasing: true,
									forceSetTimeout: false};
									
var game = new Phaser.Game(gameConfig);
var game_state = {};
var serverAddress = 'localhost';


game_state.main = function ()
{
var self = this;

self.roundManager;

self.preload = () =>
	{
	self.id = getParameter('id');
	if (!self.id)
		{
		self.id = 1;
  	}
	
	gameClient.connect(serverAddress, 8082, self.id, self.clientConnected);
	
	game.load.image('player1', 'assets/player_classes/knightx.png');
	game.load.image('player2', 'assets/player_classes/elfx.png');
	game.load.image('player3', 'assets/player_classes/warlockx.png');
	game.load.image('player4', 'assets/player_classes/ninjax.png');
	game.load.image('player5', 'assets/player_classes/magex.png');
	game.load.image('player6', 'assets/player_classes/vikingx.png');
	game.load.image('magic', 'assets/projectiles/bullet.png');
	game.load.image('enemyBullet', 'assets/projectiles/enemyBullet.png');
	game.load.image('flame', 'assets/projectiles/flame.png');
	game.load.image('enemy_hellbug', 'assets/enemy_classes/monster_hellbug_360.png');
	game.load.image('enemy_skeleton', 'assets/enemy_classes/monster_skeleton.png');
	game.load.image('map', 'assets/maps/castle_basic.png');

  
	}
self.create = () =>
  {
	//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
	game.stage.disableVisibilityChange = true;
  game.world.setBounds(0, 0, 3 * gameWidth, 3 * gameHeight);
  self.roundManager = new RoundManager(game);
  self.roundManager.loadRound("assets/maps/rounds/round.json");



/*self.bg = game.add.sprite(0, 0, 'map');
	self.bg.height = gameHeight;
	self.bg.width = gameWidth;
	self.bg.smoothed = false;
  self.bulletManager = new bulletManager(game);
  self.enemyManager = new EnemyManager(game, self.bulletManager);
*/

/*	self.players = {};
  self.playerGroup = game.add.group();
	self.playerGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	self.playerGroup.enableBody = true;
*/

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

self.render = () => {game.debug.cameraInfo(game.camera, 32, 32)};


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
