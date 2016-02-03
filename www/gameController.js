'use strict';

var w = window.innerWidth * window.devicePixelRatio;
var h = window.innerHeight * window.devicePixelRatio;

var gameController = new Phaser.gam(w, h, Phaser.AUTO, 'controllerDiv'); 
var controller_state = {};

controller_state.main = () =>
{
var self = this;
self.id;
self.joystick1;

self.game = gameController;

self.preload = () =>
	{
	self.id = getParameter("id");
	if (!self.id) self.id = game.rnd.integerInRange(0, 1000);

	gameClient.connect("localhost", 8081, self.id, self.clientConnected);
	};

self.render = () => {};

self.create = () =>
	{
	self.game.scale.fullScreenScaleMode = Phaser.ScaleManager.Exact_FIT;
	self.game.stage.disableVisibilityChange = true;

	var joystickRadius = 80;

	self.joystick1 = self.game.plugins.add( Phaser.Plugin.VirtualJoystick(this));
	self.joystick1.init(self.game.world.width/4, self.game.world.height/2, joystickRadius*2, joystickRaduis/3*4);
	self.joystick1.start()
	};

self.update = () =>
	{
	var input = {X: self.joystick1.deltaX, Y: self.joystick1.deltaY};
	gameClient.callScreenRpc(1, "setPlayerInput", [self.id, input], self, null);
	};

self.clientConnected = () =>
	{
	};

}

controller.state.add('main', controller_state.main);
controller.state.start('main');
