'use strict';

function ConnectionsManager(game)
{
var self = this;

self.connect = (address, port, id) =>
	{
	gameClient.connect(address, port, id, init);
	};

var init = () =>
	{
  gameClient.setClientConnectionListener(game, game.onControllerConnected);
  gameClient.setClientDisconnectionListener(game, game.onControllerDisconnected);
  gameClient.exposeRpcMethod("setPlayerInput", game, game.setPlayerInput);
	};

game.onControllerConnected = (id) =>
	{
	var current = game.state.current;
	if (current === 'play')
		{
		game.state.getCurrentState().onControllerConnected(id);
		} else if (current  === 'waiting')
		{
		game.state.getCurrentState().onControllerConnected(id);
		}
	};

game.onControllerDisconnected = (id) =>
	{
	var current = game.state.current;
	if (current === 'play')
		{
		game.state.getCurrentState().onControllerDisconnected(id);
		} else if (current  === 'waiting')
		{
		game.state.getCurrentState().onControllerDisconnected(id);
		}
	};

game.setPlayerInput = (id, input) =>
	{
	var current = game.state.current;
	if (current === 'play')
		{
		game.state.getCurrentState().setPlayerInput(id, input);
		}
	};
}



