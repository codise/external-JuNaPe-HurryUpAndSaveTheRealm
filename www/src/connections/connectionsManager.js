'use strict';

function ConnectionsManager(game)
{
var self = this;

self.connect = function (address, port, id)
	{
	gameClient.connect(address, port, id, init);
	};

var init = function ()
	{
	gameClient.setClientConnectionListener(game, game.onControllerConnected);
	gameClient.setClientDisconnectionListener(game, game.onControllerDisconnected);
	gameClient.exposeRpcMethod("setPlayerInput", game, game.setPlayerInput);
	};

game.onControllerConnected = function (id)
	{
	var current = game.state.current;
	if (current === 'play' || current === 'waiting' || current === 'roundOver')
		{
		game.state.getCurrentState().onControllerConnected(id);
		game.state.getCurrentState().onControllerConnected(id);
		}
	};

game.onControllerDisconnected = function (id)
	{
	var current = game.state.current;
	if (current === 'play' || current === 'waiting' || current === 'roundOver')
		{
		game.state.getCurrentState().onControllerDisconnected(id);
		}
	};

game.setPlayerInput = function (id, input)
	{
	var current = game.state.current;
	if (current === 'play')
		{
		game.state.getCurrentState().setPlayerInput(id, input);
		}
	};
}



