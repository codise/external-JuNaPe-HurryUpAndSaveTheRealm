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

		
var creditInfo = [ 					{what: 'To ', who: ['OhtuProjekti-course, University of Helsinki CS, spring 2016']},
									{what: 'Programming', who: ['Ahti Katiska', 'Niko Novitsky', 'Markus Sibakov', 'Janika Kääriäinen', 'Valtter Taipale']},
									{what: 'Game Design', who: ['Valtter Taipale', 'Markus Sibakov', 'Niko Novinsky', 'Janika Kääriäinen']},
									{what: 'Art', who: ['Valtter Taipale', 'Risto Ollila', 'Markus Sibakov']},
									{what: 'Music', who: ['Kevin MacLeod (incompetech.com)']},
									{what: 'Thanks', who: ['Matti Luukkainen', 'Leftpad','Our families', 'All the Cats of Earth']}
									];

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


