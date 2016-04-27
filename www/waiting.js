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
var qr;
var qrText;

var demoVideo;
var demoVideoSprite;


self.preload = function ()
	{
	// Load and start video
	
	demoVideo = game.add.video('demo');
	demoVideo.mute = true;
	demoVideoSprite = demoVideo.addToWorld();
	demoVideoSprite.scale.x = ( 1920 / demoVideoSprite.width)  * scalingFactors.x;
	demoVideoSprite.scale.y = ( 1080 / demoVideoSprite.height) * scalingFactors.y;

	demoVideo.play(true);
	
	qr = game.add.sprite(game.camera.x + game.camera.width, game.camera.y + game.camera.height, 'qr_niko'); //or: 'qr_janika'
	qr.scale.x = 1.5*scalingFactors.x;
	qr.scale.y = 1.5*scalingFactors.y;
	qr.anchor.setTo(1,1);

	qrText = game.add.text(0, 0, 'Join JuNaPe WLAN and scan here ---> ', {font: '25px Courier', fill: '#ffffff'});
	qrText.anchor.setTo(1,1);
	qrText.position.setTo(qr.position.x - qr.width, qr.position.y);
	qrText.stroke = '#000000';
	qrText.strokeThickness = 6;


	waitingText = game.add.text(80, 150, baseWText, {font: '30px Courier', fill: '#ffffff'});
	waitingText.stroke = '#000000';
	waitingText.strokeThickness = 6;


	pText = game.add.text(80, 200, playersWaitingText + playerCount, {font: '30px Courier', fill: '#ffffff'});
	pText.stroke = '#000000';
	pText.strokeThickness = 6;

	countDownText = game.add.text(80, 250, '', {font: '30px Courier', fill: '#ffffff'});
	countDownText.stroke = '#000000';
	countDownText.strokeThickness = 6;
	countDown = 8;
	game.waitingRoomIds = [];
	game.time.advancedTiming = true;
	game.stage.disableVisibilityChange = true;

	};

self.update = function ()
	{
	qr.bringToTop();
	qr.position.setTo(game.camera.x + game.camera.width, game.camera.y + game.camera.height);
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
			demoVideoSprite.destroy();
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
	};

self.onControllerDisconnected = function (id)
	{
	delete game.playerList[id];
	};

}
