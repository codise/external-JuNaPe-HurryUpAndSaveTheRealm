'use strict';

function ScoreBoard (game, position)
{
var self = this;

var scoreTable = [];

var scoreText = game.add.text(position.x, position.y, '', { font: 'Courier New', fontSize: '22px', fill: '#FFFFFF' });
scoreText.stroke = '#000000';
scoreText.strokeThickness = 4;

var lineCount = (scoreText.text.split('\n').length - 1)

var scoreBackground = game.add.sprite(position.x, position.y, 'scoreBackground');
scoreBackground.width = scoreText.width;
scoreBackground.height = lineCount * 22;
scoreBackground.alpha = 0.25;

self.sprite = game.add.sprite(position.x, position.y, 'empty');
self.sprite.addChild(scoreBackground);
self.sprite.addChild(scoreText);

self.getScoreTable = function ()
	{
	return scoreTable;
	};
	

self.update = function (players)
	{
	scoreTable = []
  for (var i in players) 
    {
    if (players[i] != undefined && game.playerList[players[i].id] != undefined)
      {
      scoreTable.push({"id": players[i].id, "name": players[i].playerName, "score": players[i].score, "totalScore": game.playerList[players[i].id].totalScore});
      }
    }
  scoreTable = scoreTable.sort(function (scoreEntryA, scoreEntryB) { return scoreEntryB.score - scoreEntryA.score; })
  scoreText.text = scoreTableToText(scoreTable);
	scoreBackground.width = scoreText.width;
	scoreBackground.height = scoreText.height;
	console.log(scoreBackground.height + "   " + (scoreText.text.split('\n').length - 1)); 
  self.sprite.position.x = game.camera.x + 16;
  self.sprite.position.y = game.camera.y + 16;
  };

var scoreTableToText = function (scoreTable)
  {
  var text = '';

	var longestName = 4;
	var longestScore = 5;
	var longestTotalScore = 11;
  for (var i in scoreTable)
    {
    if (scoreTable[i].name != undefined)
      {
      var nameLength = scoreTable[i].name.length;
      var scoreLength = (scoreTable[i].score + '').length;
      var totalScoreLength = (scoreTable[i].totalScore + '').length;

			if (nameLength> longestName) longestName = nameLength;
			if (scoreLength > longestScore) longestScore = scoreLength;
			if (totalScoreLength > longestTotalScore) longestTotalScore = totalScoreLength;

      text += '\n'
      			+ scoreTable[i].name + ' '.repeat(longestName - nameLength) + " :: " 
      			+ scoreTable[i].score + ' '.repeat(longestScore - scoreLength) + " | " 
      			+ scoreTable[i].totalScore + ' '.repeat(longestTotalScore - totalScoreLength);
	     }
    }
	var firstLine = 'Name' + ' '.repeat(longestName - 4) + " || "
									+ 'Score' + ' '.repeat(longestScore - 5) + " | "
									+ 'Total Score' + ' '.repeat(longestTotalScore - 11);

  return firstLine + text;
  };

}
