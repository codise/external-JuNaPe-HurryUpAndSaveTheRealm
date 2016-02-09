'use strict';

var w = window.innerWidth * window.devicePixelRatio;
var h = window.innerHeight * window.devicePixelRatio;

var gameController = new Phaser.Game(w, h, Phaser.AUTO, 'controllerDiv'); 
var controller_state = {};

controller_state.main = function ()
{
var self = this;
self.id;

self.game = gameController;

self.preload = () =>
	{
	self.id = getParameter("id");
	if (!self.id) self.id = self.game.rnd.integerInRange(0, 1000);

	gameClient.connect("localhost", 8081, self.id, self.clientConnected);
	};

self.render = () => {};

self.create = () =>
	{
	self.game.scale.fullScreenScaleMode = Phaser.ScaleManager.Exact_FIT;
	self.game.stage.disableVisibilityChange = true;

	var joystickRadius = 80;

  self.joystick1 = self.game.plugins.add(new Phaser.Plugin.VirtualJoystick(self));
	self.joystick1.init(self.game.world.width/4, self.game.world.height/2, joystickRadius*2, joystickRadius/3*4);
	self.joystick1.start();

  self.joystick2 = self.game.plugins.add(new Phaser.Plugin.VirtualJoystick(self));
  self.joystick2.init(self.game.world.width - self.game.world.width/4, self.game.world.height/2, joystickRadius*2, joystickRadius/3 *4);
  self.joystick2.start();
	};

self.update = () =>
	{
var input = {X:self.joystick1.deltaX, Y:self.joystick1.deltaY, sX:self.joystick2.deltaX, sY:self.joystick2.deltaY};
  console.log("sending input" + input.X);
	gameClient.callScreenRpc(1, "setPlayerInput", [self.id, input], self, null);
	};

self.clientConnected = () =>
	{
	gameClient.exposeRpcMethod("setStickPosition", self, self.setStickPosition);
	gameClient.exposeRpcMethod("getStickPosition", self, self.getStickPosition);
	};

self.setStickPosition = function(position)
	{
	console.log("DemoController::setStickPosition() "+position);
	};

self.getStickPosition = function(connectionId, callback)
	{
	callback(null, [666,667]);
	};

}

gameController.state.add('main', controller_state.main);
gameController.state.start('main');
