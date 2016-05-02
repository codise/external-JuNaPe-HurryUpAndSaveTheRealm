'use strict';

function PlayerClassStats()
{
var self = this;

var players = playerPatterns;
var maxValues = {};

self.getMaxValues = function()
	{
	maxValues["range"] = getMaxValue('range');
	maxValues["health"] = getMaxValue('maxHealth');
	maxValues["speed"] = getMaxValue('baseMovementSpeed');
	maxValues["damage"] = getMaxValue('bulletDamage');
	maxValues["fireRate"] = getMaxValue('baseFireRate');
	};

var getMaxValue = function(type)
	{
	var currMax = 0;
	if(type == 'range')
		{
		for(var i = 0; i < 6; i++)
			{
			var currValue = players[i]["bulletSpeed"] * players[i]["bulletLifespan"] / 1000;
			if(currMax < currValue)
				{
				currMax = currValue;
				}
			}
		return currMax;
		}
	else
		{
		for(var i = 0; i < 6; i++)
			{
			var currValue = players[i][type];
			if(currMax < currValue)
				{
				currMax = currValue;
				}
			}
		return currMax;
		}
	};

self.getPlayerStatValue = function(id, type, barWidth)
	{
	var value;
	var maxValue;
	if(type == 'range')
		{
		value = players[id]["bulletSpeed"] * players[id]["bulletLifespan"] / 1000;
		maxValue = maxValues["range"];
		}
	else if(type == 'health')
		{
		value = players[id]["maxHealth"];
		maxValue = maxValues["health"];
		}
	else if(type == 'speed')
		{
		value = players[id]["baseMovementSpeed"];
		maxValue = maxValues["speed"];
		}
	else if(type == 'damage')
		{
		value = players[id]["bulletDamage"];
		maxValue = maxValues["damage"];
		}
	else if(type == 'fireRate')
		{
		value = players[id]["baseFireRate"];
		maxValue = maxValues["fireRate"];
		}
	value = (value/maxValue)*barWidth;
	return parseInt(value, 10);
	};

};
