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
	console.log("running init");
  gameClient.setClientConnectionListener(game, game.onControllerConnected);
  gameClient.setClientDisconnectionListener(game, game.onControllerDisconnected);
//  gameClient.setScreenConnectionListener(game. game.onScreenConnected);
 // gameClient.setScreenDisconnectionListener(game. game.onScreenDisconnected);
  gameClient.exposeRpcMethod("setPlayerInput", game, game.setPlayerInput);
	};

game.onControllerConnected = (id) =>
	{
	var current = game.state.current;
	console.log("Controller connecting");
	if (current === 'play')
		{
		console.log("Connecting player");
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
		game.state.getCurrentSate().onControllerDisconnected(id);
		}
	};

game.setPlayerInput = (id, input) =>
	{
	var current = game.state.current;
	console.log("setting input");
	if (current === 'play')
		{
		game.state.getCurrentState().setPlayerInput(id, input);
		}
	};
}



