'use strict';

//var gameWidth = window.innerWidth * window.devicePixelRatio;
//var gameHeight = window.innerHeight * window.devicePixelRatio;
var gameWidth = 1920;
var gameHeight = 1080;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');
var game_state = {};
var serverAddress = 'localhost';


game_state.main = function ()
{
var self = this;
//self.player;
//self.enemies = {}
self.playerGroup;


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
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.stage.disableVisibilityChange = true;
	self.bg = game.add.sprite(0, 0, 'map');
	self.bg.height = gameHeight;
	self.bg.width = gameWidth;
	self.bg.smoothed = false;
	self.players = {};

	game.physics.startSystem(Phaser.Physics.ARCADE);

	self.bulletManager = new bulletManager(game);
	self.enemyManager = new EnemyManager(game, self.bulletManager);

	//self.enemies[0] = new Enemy(game, self.bulletManager, game.world.width/3, game.world.height/3);
	self.playerGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
	self.playerGroup.enableBody = true;
	}

self.setPlayerInput = (id, input) =>
	{
	if (self.players[id] != undefined)
		{
		self.players[id].setInput(input);
		}
	};

self.update = () =>
	{
	// self.bulletManager.createBullet('magic', 0, {x:0.5, y:0.5}, {x:100, y:100});
	self.bulletManager.update();
	for (var id in self.players)
		{
		if (self.players[id] != undefined)
			{
			self.players[id].update()
			}
		}
	self.enemyManager.update(self.players);
	game.physics.arcade.collide(self.playerGroup);
	game.physics.arcade.collide(self.enemyManager.enemyGroup);
	game.physics.arcade.collide(self.playerGroup, self.enemyManager.enemyGroup);  
	for (var i = 0; i < self.bulletManager.playerBulletGroups.length; i++)
		{
		game.physics.arcade.collide(self.bulletManager.playerBulletGroups[i], self.playerGroup);
		game.physics.arcade.collide(self.bulletManager.playerBulletGroups[i], self.enemyManager.enemyGroup);
		}
	};

self.render = () => {};


self.onControllerConnected = (id) =>
	{
	//self.player = new Player(game, game.world.width/2, game.world.height/2);
	self.players[id] = new Player(game, game.world.width/2, game.world.height/2, self.bulletManager, id);
	self.playerGroup.add(self.players[id].playerSprite);
	};

self.onControllerDisconnected = (id) =>
	{
	//playerGroup.remove(players[id]);
	//players[id].kill();
	if (self.players[id] != undefined)
		{
		self.players[id].kill();
		self.players[id] = undefined;
		self.playerGroup.remove(players[id].playerSprite);
		//playerGroup.remove(players[id]);
		}
	};

self.onScreenConnected = (id) =>
	{
	console.log("OwnScreen::onScreenConnected() "+ id);
	console.log("Currently connected screens: " + gameClient.getConnectedScreenIds());
	//gameClient.callServerRpc(1, "method", ["hello server"],  self, null);
	};

self.onScreenDisconnected = (id) =>
	{
	console.log("OwnScreen::onScreenDisconnected() "+id);
	console.log("Currently connected screens: " + gameClient.getConnectedScreenIds());
	};

self.clientConnected = () =>
	{
	console.log("DemoScreen::screenConnected()");
	
	gameClient.setClientConnectionListener(self, self.onControllerConnected);
	gameClient.setClientDisconnectionListener(self, self.onControllerDisconnected);
	gameClient.setScreenConnectionListener(self, self.onScreenConnected);
	gameClient.setScreenDisconnectionListener(self, self.onScreenDisconnected);
	
	
	gameClient.exposeRpcMethod("setPlayerInput", self, self.setPlayerInput);
	
	gameClient.callClientRpc(1, "setStickPosition", [211,100],  self, null);
	gameClient.callClientRpc(1, "getStickPosition", [],  self, function(err, data)
		{
		console.log("Stick position received: "+data);
		});
	
	};
};

game.state.add('main', game_state.main);
game.state.start('main');
