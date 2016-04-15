'use strict';

var roundOverState = function ()
{
var self = this;
var roundScores;

var scoreText;
var countDownText;

var loopTimeout;
var cdText = 'Time remaining until next round: ';

var qr;
var qrText;

self.preload = function ()
	{
	qr = game.add.sprite(game.camera.x + game.camera.width, game.camera.y + game.camera.height, 'qr_niko'); //or: 'qr_janika'
	qr.scale.x = 1.5*scalingFactors.x;
	qr.scale.y = 1.5*scalingFactors.y;
	qr.anchor.setTo(1,1);
	qrText = game.add.text(0, 0, 'Join JuNaPe WLAN and scan here ---> ', {font: '25px Courier', fill: '#ffffff'});
	qrText.anchor.setTo(1,1);
	qrText.position.setTo(qr.position.x - qr.width, qr.position.y);
	roundScores = game.roundScoreTable;
	scoreText = game.add.text(100, 100, genScore(roundScores), {font: "30px Calibri",  fill: "#ffffff"});
	loopTimeout = game.time.now + 5000;
	countDownText = game.add.text(10, 10, "", {font: "20px Calibri",  fill: "#ffffff"});
	};

var genScore = function (table)
	{
	var text = 'Final scores: \n';

	for (var i = 0; i < table.length; i++)
		{
		if (table[i].name != undefined)
			{
			text += table[i].name + ": " + table[i].score + " / " + table[i].totalScore + "\n";
			}
		}
	return text;
	};

self.update = function ()
	{
	qr.bringToTop();
	qr.position.setTo(game.camera.x + game.camera.width, game.camera.y + game.camera.height);
	countDownText.text = cdText + (loopTimeout - game.time.now);
	if(game.time.now > loopTimeout)
		{
		game.state.start('waiting');
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
