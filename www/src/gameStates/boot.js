'use strict';

var bootState = function ()
{
var self = this;

var muteButton;
var startButton;

game.mute = false;

self.preload = function ()
	{
	game.load.spritesheet('muteButton', 'assets/other/mutebutton.png', 100, 100);
  game.load.image('startButton', 'assets/other/startButton.png');
	};

self.create = function ()
	{
	game.screenId = getParameter('id');
	if (!game.screenId)
		{
		game.screenId = 1;
		}
	game.connectionManager = new ConnectionsManager(game)
	game.connectionManager.connect(serverAddress, gamePort, game.screenId);
	game.physics.startSystem(Phaser.Physics.ARCADE);

	muteButton = game.add.button(game.world.centerX - 95, 400, 'muteButton', setMute, self, 2, 0);
	startButton = game.add.button(game.world.centerX - 95, 500, 'startButton', startGame);

	};


var setMute = function ()
	{
	if (game.mute === false)
		{
		muteButton.setFrames(3, 1);
		game.mute = true;
		} else
		{
		muteButton.setFrames(2, 0);
		game.mute = false;
		}
	};

var startGame = function ()
	{
	game.state.start('load');
	};


}
