'use strict';

function creditBoard (game, position)
{
var self = this;

var parseCredits = function ()
	{
	var text = '';
	for (var i in creditInfo)
		{
		var whos = '';

		for (var t in creditInfo[i].who)
			{
			whos += creditInfo[i].who[t] + ', ';
			}
		text += creditInfo[i].what + ' - ' + whos + '\n';
		}

	return text;
	};


var creditInfo = [ {what: 'Programming', who: ['Katiska', 'Novitsky', 'Sibakov', 'Janika']},
									 {what: 'Art', who: ['Taipale', 'Risto']},
									 {what: 'Music', who: ['Kevin MacLeod (incompetech.com)']} ];

var creditText = game.add.text(position.x, position.y, '', {font: '25px Courier', fill: '#ffffff'});

var loaded = false;

self.update = function ()
	{
	if (!loaded)
		{
		if (creditText != undefined)
			{
			console.log("whee");
			creditText.text = parseCredits();
			loaded = true;
			}
		}
	};
}


