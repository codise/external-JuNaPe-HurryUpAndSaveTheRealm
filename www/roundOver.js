'use strict';

var roundOverState = function ()
{
var self = this;
var finalScores;

var scoreText;

self.preload = function ()
	{
	finalScores = game.roundScoreTable;
	scoreText = game.add.text(100, 100, genScore(finalScores), {font: "20px Calibri",  fill: "#ffffff"});
	};

var genScore = function (table)
	{
	var text = 'Final scores: \n';

	for (var i = 0; i < table.length; i++)
		{
		if (table[i].name != undefined)
			{
			text += table[i].name + " :: " + table[i].score + "\n";
			}
		}
	return text;
	};
}
