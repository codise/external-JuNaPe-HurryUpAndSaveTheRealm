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

var getMaxValue = function(value)
	{
	var currMax = 0;
	if(value == 'range')
		{
		for(var i = 0; i < 6; i++)
			{
			var value = players[i]["bulletSpeed"] * players[i]["bulletLifespan"] / 1000;
			if(currMax < value)
				{
				currMax = value;
				}
			}
		//console.log("getMaxValue range:" + currMax);
		return currMax;
		}
	else
		{
		for(var i = 0; i < 6; i++)
			{
			var value = players[i][value];
			if(currMax < value)
				{
				currMax = value;
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
		//console.log("value: " + value);
		maxValue = maxValues["range"];
		//console.log("maxrange:" + maxValue);
		}
	else if(type == 'health')
		{
		value = players[id]["maxHealth"];
		maxValue = maxValues["health"];
		}
	else if(type == 'speed')
		{
		value = players[id]["bulletSpeed"];
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