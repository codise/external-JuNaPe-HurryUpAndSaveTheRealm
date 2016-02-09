'use strict';

var gameWidth = window.innerWidth * window.devicePixelRatio;
var gameHeight = window.innerHeight * window.devicePixelRatio;

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'gameDiv');
var game_state = {};


game_state.main = function ()
{
var self = this;
//self.player;
//self.playerGroup;

self.preload = () =>
  {
  self.id = getParameter('id');
  if (!self.id) self.id = 1;

  gameClient.connect("localhost", 8082, self.id, self.clientConnected);

  game.load.image('sky', 'assets/bg/sky.png');
  game.load.image('player', 'assets/player_classes/knight.png');
  game.load.image('magic', 'assets/projectiles/bullet.png');
  }

self.create = () =>
  {
  game.stage.disableVisibilityChange = true;
  self.bg = game.add.sprite(0, 0, 'sky');
  self.bg.height = gameHeight;
  self.bg.width = gameWidth;
  self.bg.smoothed = false;
  self.players = {};

  game.physics.startSystem(Phaser.Physics.ARCADE);

  self.bulletManager = new bulletManager(game);

  //playerGroup = game.add.group();
  }

self.setPlayerInput = (id, input) =>
  {
  if (self.players[id] != undefined)
  {
    console.log("setting player input X: " + input.X + " Y: " + input.Y);
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
    self.players[id].update();
  }
  }
  };

self.render = () => {};


self.onControllerConnected = (id) =>
  {
  //self.player = new Player(game, game.world.width/2, game.world.height/2);
  self.players[id] = new Player(game, game.world.width/2, game.world.height/2, self.bulletManager, id);
  //playerGroup.add(players[id]);
  };

self.onControllerDisconnected = (id) =>
  {
  //playerGroup.remove(players[id]);
  //players[id].kill();
  if (self.players[id] != undefined)
  {
  self.players[id].kill();
  self.players[id] = undefined;
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
