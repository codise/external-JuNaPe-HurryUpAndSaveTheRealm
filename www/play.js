'use strict';

var playState = function ()
{
var self = this;

self.roundManager;

var weaponManager;
self.enemyManager;
self.bulletManager;
var powerupManager;

window.onresize = resizeGame;

self.preload = function ()
	{
	game.time.advancedTiming = true;
	game.stage.disableVisibilityChange = true;
	
	self.bulletManager = new BulletManager(game);
	self.enemyManager = new EnemyManager(game, self.bulletManager);
	
	weaponManager = new WeaponManager(game);
	powerupManager = new PowerupManager(game);

	game.world.setBounds(0, 0, 10 * gameWidth, 10 * gameHeight);

	self.roundManager = new RoundManager(game, self.bulletManager, self.enemyManager, weaponManager, powerupManager);
	if (game.currentRound == undefined || game.currentRound + 1 >= rounds.length)
		{
		game.currentRound = 0;
		} else
		{
		game.currentRound += 1;
		}
	self.roundManager.loadRound(rounds[game.currentRound]);
	};
	

self.create = function ()
	{
	var playerIds = Object.keys(game.playerList);
	for (var i = 0; i < playerIds.length ; i++)
		{
		self.roundManager.newPlayer(playerIds[i]);
		};
	};

self.setPlayerInput = function (id, input)
	{
	self.roundManager.setPlayerInput(id, input);
	};

self.update = function ()
	{
	self.roundManager.update();
	if (self.roundManager.roundOver)
		{
		game.effectManager.popUpList = [];
		game.roundScoreTable = self.roundManager.getScoreTable();
		game.state.start('roundOver');
		}
	};

self.render = function ()
	{
	};


self.onControllerConnected = function (id)
	{
	game.playerList[id] = {};
	self.roundManager.newPlayer(id);
	};

self.onControllerDisconnected = function (id)
	{
	self.roundManager.disconnectPlayer(id);
	delete game.playerList[id];
	};
};
