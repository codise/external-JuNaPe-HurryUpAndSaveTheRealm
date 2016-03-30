'use strict';

var roundOverState = function ()
{
var self = this;
var roundScores;

var scoreText;

var loopTimeout;

self.preload = function ()
	{
	roundScores = game.roundScoreTable;
	scoreText = game.add.text(100, 100, genScore(roundScores), {font: "30px Calibri",  fill: "#ffffff"});
	loopTimeout = game.time.now + 3000;
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
