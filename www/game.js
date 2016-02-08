'use strict';

var gameWidth = window.innerWidth * window.devicePixelRatio;
var gameHeight = window.innerHeight * window.devicePixelRatio;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');
var game_state = {};

game_state.main = function ()
{
var self = this;
self.player;
//self.players = {}
//self.playerGroup;

self.preload = () =>
  {
  self.id = getParameter('id');
  if (!self.id) self.id = 1;

  gameClient.connect("localhost", 8082, self.id, self.clientConnected);

  game.load.image('sky', 'assets/bg/sky.png');
  game.load.image('player', 'assets/player_classes/knight.png');
  }

self.create = () =>
  {
  game.stage.disableVisibilityChange = true;
  self.bg = game.add.sprite(0, 0, 'sky');
  self.bg.height = gameHeight;
  self.bg.width = gameWidth;
  self.bg.smoothed = false;


  game.physics.startSystem(Phaser.Physics.ARCADE);

  //playerGroup = game.add.group();
  }

self.setPlayerInput = (id, input) =>
  {
  if (self.player != undefined)
  {
    console.log("setting player input X: " + input.X);
    self.player.setInput(input);
  }
  };

self.update = () =>
  {
  if (self.player != undefined)
  {
    self.player.update();
  }
  };

self.render = () => {};


self.onControllerConnected = (id) =>
  {
  self.player = new Player(game, game.world.width/2, game.world.height/2);
  //players[id] = new Player(game, game.world.width/2, game.world.height/2);
  //playerGroup.add(players[id]);
  };

self.onControllerDisconnected = (id) =>
  {
  //playerGroup.remove(players[id]);
  //players[id].kill();
  if (self.player != undefined)
  {
  self.player.kill();
  self.player = undefined;
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
