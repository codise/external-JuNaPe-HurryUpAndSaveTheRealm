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


	self.onControllerConnected = (id) =>
		{
		players[id] = new Player(game, game.world.width/2, game.world.height/2);
		playerGroup.add(players[id]);
		};

  self.onControllerDisconnected = function(id)
    {
    console.log("OwnScreen::onControllerDisconnected() "+id);
    console.log("Currently connected controllers: " + gameClient.getConnectedClientIds());
    
    playerGroup.remove(players[id]);
    //players[id].kill();
    delete players[id];
    
    };  
  
  self.onScreenConnected = function(id)
    {
    console.log("OwnScreen::onScreenConnected() "+id);
    console.log("Currently connected screens: " + gameClient.getConnectedScreenIds());
    //gameClient.callServerRpc(1, "method", ["hello server"],  self, null);
    };
  
  self.onScreenDisconnected = function(id)
    {
    console.log("OwnScreen::onScreenDisconnected() "+id);
    console.log("Currently connected screens: " + gameClient.getConnectedScreenIds());
    };  

	self.clientConnected = function()
		{
		console.log("DemoScreen::screenConnected()");

		gameClient.setClientConnectionListener(self, self.onControllerConnected);
		gameClient.setClientDisconnectionListener(self, self.onControllerDisconnected);
		gameClient.setScreenConnectionListener(self, self.onScreenConnected);
		gameClient.setScreenDisconnectionListener(self, self.onScreenDisconnected);


		gameClient.exposeRpcMethod("setPlayerInput", self, self.setPlayerInput);

		gameClient.exposeRpcMethod("setOrientation", self, self.setOrientation);

		gameClient.callClientRpc(1, "setStickPosition", [211,100],  self, null);      
		gameClient.callClientRpc(1, "getStickPosition", [],  self, function(err, data)
		{
		console.log("Stick position received: "+data);
		});

		};
};

game.state.add('main', game_state.main);
game.state.start('main');
