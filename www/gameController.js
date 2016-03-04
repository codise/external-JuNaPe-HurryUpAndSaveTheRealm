'use strict';

//var w = window.innerWidth * window.devicePixelRatio;
//var h = window.innerHeight * window.devicePixelRatio;

var w = 16 * 37;
var h = 9 * 30;
var serverAddress = 'localhost';

var gameController = new Phaser.Game(w, h, Phaser.CANVAS);

var controller_state = {};

controller_state.main = function ()
{
var self = this;
self.id;

self.game = gameController;
self.startMove = new Phaser.Point(0, 0);
self.endMove = new Phaser.Point(0, 0);
self.startShoot = new Phaser.Point(0, 0);
self.endShoot = new Phaser.Point(0, 0);
var anglePoint = new Phaser.Point(-1, 0);

self.moveStick = {pointer: false, pad: false};
self.shootStick = {pointer: false, pad: false};
var controllerpad1;
var controllerpad2;

self.preload = () =>
	{
	self.id = getParameter("id");
	if (!self.id)
		{
		self.id = self.game.rnd.integerInRange(0, 1000);
		}

	gameClient.connect(serverAddress, controllerPort, self.id, self.clientConnected);
	//console.log("Game.js Connecting to: "+serverAddress+ "Port: "+controllerPort);
	self.game.load.image('background', 'assets/bg/cbg.png');
	self.game.load.image('circlepad', 'assets/other/controller_circle.png');
	};

self.render = () => 
	{
	self.game.debug.pointer(gameController.input.mousePointer);
	self.game.debug.pointer(gameController.input.pointer1);
	self.game.debug.pointer(gameController.input.pointer2);
	};

self.create = () =>
	{
	self.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	self.game.stage.disableVisibilityChange = true;
	self.background = self.game.add.sprite(0, 0, 'background');
	self.background.height = h;
	self.background.width = w;
	self.background.smoothed = false;
	self.game.input.onDown.add(self.pointerOnDown, this);
	self.game.input.onUp.add(self.pointerOnUp, this);
	controllerpad1 = self.game.add.sprite(0, 0, 'circlepad');
	controllerpad1.exists = false;
	controllerpad2 = self.game.add.sprite(0, 0, 'circlepad');
	controllerpad2.exists = false;
	};

self.reservePointer = (stick, pointer, pad) =>
	{
	if(!stick.pointer)
		{
		stick.pointer = pointer;
		pad.exists = true;
		pad.x = pointer.position.x - 30;
		pad.y = pointer.position.y - 30;
		stick.pad = pad;
		/*
		if(pointer === self.moveStick.pointer)
			{
			//console.log('pointer reserved to move');
			} else if (pointer === self.shootStick.pointer)
			{
			//console.log('pointer reserved to shoot');
			}
			
		} else 
		{
		//console.log("** failed to reserve pointer **");
		*/
		}
	};

self.releasePointer = (pointer) =>
	{
	if(self.moveStick.pointer === pointer)
		{
		self.moveStick.pointer = false;
		self.moveStick.pad.exists = false;
		self.moveStick.pad = false;
		//console.log("released movestick");
		} else if (self.shootStick.pointer === pointer)
		{
		self.shootStick.pointer = false;
		self.shootStick.pad.exists = false;
		self.shootStick.pad = false;
		//console.log("released shootstick");
		} else 
		{
		//console.log("-- failed to release pointer --");
		}
	};

self.matchMoveStickCoords = (pointer) =>
	{
	self.startMove.x = pointer.position.x;
	self.startMove.y = pointer.position.y;
	self.endMove.x = pointer.position.x;
	self.endMove.y = pointer.position.y;
	};

self.matchShootStickCoords = (pointer) =>
	{
	self.startShoot.x = pointer.position.x;
	self.startShoot.y = pointer.position.y;
	self.endShoot.x = pointer.position.x;
	self.endShoot.y = pointer.position.y;
	};

self.pointerOnDown = function()
	{
	var pointer = arguments[0];
	var left = pointer.position.x < w/2;
	if(left)
		{
		self.reservePointer(self.moveStick, pointer, controllerpad1);
		self.matchMoveStickCoords(pointer);
		} else 
		{
		self.reservePointer(self.shootStick, pointer, controllerpad2);
		self.matchShootStickCoords(pointer);
		}
	};

self.pointerOnUp = function()
	{
	var pointer = arguments[0];
	if(pointer === self.moveStick.pointer)
		{
		self.matchMoveStickCoords(pointer);
		} else if (pointer === self.shootStick.pointer)
		{
		self.matchShootStickCoords(pointer);
		}
	self.releasePointer(pointer);
	};

self.dragPointer = (pointer) =>
	{
	if(pointer.isDown)
		{
		if(pointer === self.moveStick.pointer)
			{
			self.endMove.x = pointer.position.x;
			self.endMove.y = pointer.position.y;
			} else if (pointer === self.shootStick.pointer)
			{
			self.endShoot.x = pointer.position.x;
			self.endShoot.y = pointer.position.y;
			} else 
			{
			//console.log('^^ dragging unreserved pointer ^^' );
			console.log(pointer);
			}
		}
	};

var vectorizeInput = (start, end) =>
	{
	var target = new Phaser.Point(end.x - start.x, end.y - start.y);
	return target;//.normalize();
	}
	
self.update = () =>
	{
	self.dragPointer(self.game.input.pointer1);
	self.dragPointer(self.game.input.pointer2);
	self.dragPointer(self.game.input.mousePointer);
	
	var vectorMove = vectorizeInput(self.startMove, self.endMove);
	var normalShoot = vectorizeInput(self.startShoot, self.endShoot).normalize();
	
	var angle = Phaser.Point.angle(vectorMove, anglePoint) * 180/Math.PI;
	var length = vectorMove.getMagnitude() / 30;
	
	var input = {moveAngle:angle, moveLength:length, sX:normalShoot.x, sY:normalShoot.y};
	console.log(input);

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
