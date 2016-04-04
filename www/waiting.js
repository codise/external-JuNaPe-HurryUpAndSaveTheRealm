'use strict';

var waitingState = function ()
{
var self = this;
var waitingText;
var baseWText = 'Waiting for players';
var pText;
var playersWaitingText = 'Number of currently connected players: ';
var countDownText;
var cdText = 'Game starting in: ';
var playerCount = Object.keys(game.playerList).length;
var countDown;
var lastDroppedCD = 0;



self.preload = function ()
	{
	waitingText = game.add.text(80, 150, baseWText, {font: '30px Courier', fill: '#ffffff'});
	pText = game.add.text(80, 200, playersWaitingText + playerCount, {font: '30px Courier', fill: '#ffffff'});
	countDownText = game.add.text(80, 250, '', {font: '30px Courier', fill: '#ffffff'});
	countDown = 8;
	game.waitingRoomIds = [];
	};

self.update = function ()
	{
	playerCount = Object.keys(game.playerList).length;
	if (playerCount < 1)
		{
		if (waitingText.text.length < baseWText.length + 5)
			{
			waitingText.text = waitingText.text + '.';
			} else
			{
			waitingText.text = baseWText;
			}
		pText.text = playersWaitingText + playerCount;
		countDownText.text = '';
		} else
		{
		pText.text = playersWaitingText + playerCount;
		if (countDown < 1)
			{
			game.state.start('play');
			}
		if (lastDroppedCD + 1000 < game.time.now)
			{
			countDown--;
			lastDroppedCD = game.time.now;
			}

		countDownText.text = cdText + countDown;
		}
	};
	
self.onControllerConnected = function (id)
	{
	game.playerList[id] = {};
	/*
	game.waitingRoomIds.push(id);
	playerCount++;
	*/
	//
	};

self.onControllerDisconnected = function (id)
	{
	delete game.playerList[id];
		/*
	var index = game.waitingRoomIds.indexOf(id);
	if (index > -1)
		{
		game.waitingRoomIds.splice(index, 1);
		}
	if (playerCount > 1)
		{
		playerCount--;
		}
		*/

	};

}
