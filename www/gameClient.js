'use strict';

function getParameter(val) 
{
	var result = null,
	tmp = [];
	location.search.substr(1).split("&").forEach(function (item) 
		{
		tmp = item.split("=");
		if (tmp[0] === val) 
			result = decodeURIComponent(tmp[1]);
		});
	return result;
}


function GameClient () 
{
var self = this;

var screens= new Object();
var clients = new Object();

var clientConnectionListener = null;
var clientDisconnectionListener = null;
var screenConnectionListener = null;
var screenDisconnectionListener = null;

var serverConnection = new WebSocketRpcConnection();

self.callScreenRpc = (screenId, method, params, object, callback) =>
	{
	serverConnection.getCommunicator().callRpc("callScreenRpc", [screenId, method, params], object, callback);
	}

self.callClientRpc = (clientId, method, params, object, callback) =>
	{
	serverConnection.getCommunicator().callRpc("callClientRpc", [clientId, method, params], object, callback);
	}

self.exposeRpcMethod = (name, object, method) =>
	{
	serverConnection.getCommunicator().exposeRpcMethod(name, object, method);
	}

self.getConnectedClientIds = () =>
	{
	return Object.keys(clients);
	}

self.getConnectedScreenIds = () =>
	{
	return Object.keys(screens);
	}

self.setClientConnectionListener = (object_, listener_) =>
	{
	clientConnectionListener = {object: object_, listener: listener_}; 
	};

self.setClientDisconnectionListener = (object_, listener_) =>
	{
	clientDisconnectionListener = {object: object_, listener: listener_};
	};

self.setScreenConnectionListener = (object_, listener_) =>
	{
	screenConnectionListener = {object: object_, listener: listener_}; 
	};

self.setScreenDisconnectionListener = (object_, listener_) =>
	{
	screenDisconnectionListener = {object: object_, listener: listener_};
	};


//Events from the game server

self.onClientConnected = (id) =>
	{
	console.log("GameClient::onClientConnected() "+id);
	clients[id] = true;

	if (clientConnectionListener)
		{
		clientConnectionListener.listener.call(clientConnectionListener.object, id);
		}
	};

self.onClientDisconnected = (id) =>
	{
	console.log("GameClient::onClientDisconnected() "+id);
	if (clients[id])
		delete clients[id];

	if (clientDisconnectionListener)
		{
		clientDisconnectionListener.listener.call(clientDisconnectionListener.object, id);
		}
	};

self.onScreenConnected = (id) =>
	{
	console.log("GameClient::onScreenConnected() "+id);
	screens[id] = true;
	if (screenConnectionListener)
		{
		screenConnectionListener.listener.call(screenConnectionListener.object, id);
		}
	};

self.onScreenDisconnected = (id) =>
	{
	console.log("GameClient::onScreenDisconnected() "+id);
	if (screens[id])
		delete screens[id];

	if (screenDisconnectionListener)
		{
		screenDisconnectionListener.listener.call(screenDisconnectionListener.object, id);
		}
	};

self.connect = (host, port, id, callback) =>
	{
	var opts = {};
	opts.host = host;
	opts.port = port;
	if (id)
		opts.id = id;

	serverConnection.connect(opts, () =>
		{
		self.exposeRpcMethod("onClientConnected", self, self.onClientConnected);	
		self.exposeRpcMethod("onClientDisconnected", self, self.onClientDisconnected);	
		self.exposeRpcMethod("onScreenConnected", self, self.onScreenConnected);	
		self.exposeRpcMethod("onScreenDisconnected", self, self.onScreenDisconnected);	

		callback();
		});
	};
}

var gameClient = new GameClient();
