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
var playerCount = 0;
var countDown = 10;

var lastDroppedCD = 0;



self.preload = () =>
	{
	waitingText = game.add.text(80, 150, baseWText, {font: '30px Courier', fill: '#ffffff'});
	pText = game.add.text(80, 200, playersWaitingText + playerCount, {font: '30px Courier', fill: '#ffffff'});
	countDownText = game.add.text(80, 250, '', {font: '30px Courier', fill: '#ffffff'});

	game.waitingRoomIds = [];
	};

self.update = () =>
	{

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
		countDown = 10;
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
	
self.onControllerConnected = (id) =>
	{
	game.waitingRoomIds.push(id);
	playerCount++;
	};

self.onControllerDisconnected = (id) =>
	{
	var index = game.waitingRoomIds.indexOf(id);
	if (index > -1)
		{
		game.waitingRoomIds.splice(index, 1);
		}
	if (playerCount > 1)
		{
		playerCount--;
		}
	};

}
