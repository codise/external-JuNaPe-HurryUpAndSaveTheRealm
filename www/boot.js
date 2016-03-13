'use strict';

var bootState = function ()
{
var self = this;

self.create = () =>
	{
	game.screenId = getParameter('id');
	if (!game.screenId)
		{
		game.screenId = 1;
		}
	game.connectionManager = new ConnectionsManager(game)
  game.connectionManager.connect(serverAddress, gamePort, game.screenId);
	game.physics.startSystem(Phaser.Physics.ARCADE);

  game.state.start('load');
	};

}
