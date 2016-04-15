'use strict';

/*==========================================
|                  UTIL                    |
|     Here you'll find useful functions    |
==========================================*/

/**
* Get a point a minimum distance away from all players
* @param {game} game - The game object
* @param {Array} playerList - The list containing all player objects
* @param {Number} minimumDistance - The minimum distance from players to spawn from
* @param {Number} maxTryCount - The maximum amount of attempts until returning null
* @return {Point} A Point at least minimumDistance away from all players or null in which case no monster is spawned
*/
var getPosMinDPlayers = function (game, playerList, minimumDistance, maxTryCount)
	{
	var tryCount = 0;

	var acceptablePosition = false;
	while (!acceptablePosition || (tryCount < maxTryCount && maxTryCount != undefined))
		{
		var randomPos = {};
		randomPos.x = game.camera.x + game.rnd.integerInRange(0, game.camera.width);
		randomPos.y = game.camera.y + game.rnd.integerInRange(0, game.camera.height);
		if (dClosestPlayer(playerList, randomPos) >= minimumDistance)
			{
			acceptablePosition = true;
			}
		tryCount++;
		}
	
	if (randomPos != undefined)
		{
		return randomPos;
		} else
		{
		return null;
		}
	};

/*
* Return the distance between the provided position and the closes player
* @param {Array} players - List of all players
* @param {Point} position - The position to which compare
* @return {Number} The distance in pixels from position to the closest player
*/
var dClosestPlayer = function (players, position)
  {
  var currentMin = 9999999; // Arbitrarily large number
  for (var id in players)
    {
    var player = players[id];
    if (player != undefined && !player.dead)
      {
      var distance = Math.sqrt( Math.pow( (player.sprite.position.x - position.x), 2 ) + 
                                Math.pow( (player.sprite.position.y - position.y), 2) );
      if (distance <= currentMin)
        {
        currentMin = distance;
        }
      }
    }
  return currentMin;
  };

/*
* Picks a random entry from a dictionary
* @param {Array} dict - The dictionary from which we pick an object
* @return {Object} A random object from the array
*/

var pickRandomFromDictionary = function (dict)
  {
  var keys = Object.keys(dict);
  var object
  object = dict[keys[ keys.length * Math.random() << 0]];
  return object;
  };

/*
* Resizes the game to fit new window dimensions
*/
var resizeGame = function ()
  {
  var height = window.innerHeight * window.devicePixelRatio;
  var width = window.innerWidth * window.devicePixelRatio;

  if (game != undefined)
    {
    game.width = width;
    game.height = height;
    game.stage.bounds.width = width;
    game.stage.bounds.height = height;

    if (game.renderType === 1)
      {
      game.renderer.resize(width, height);
      Phaser.Canvas.setSmoothingEnabled(game.context, false);
      }
    }
  };

/**
* Returns a list of players around the specified point
* @param {Array} players - List of all players. 
* @param {Point} point - The point around which to check
* @param {Number} sizeX - The radius of the square in X direction which we use to check
* @param {Number} sizeY - The radius of the square in Y direction which we use to check
* @return {Array} List of all players within the specified area, or undefined if no players found in the area
*/
var getPlayersAroundPoint = function (players,point,sizeX,sizeY)
{
	//We use the data provided to construct a square around the area

	//Bottom left
	var squarePointsA = {}	
	squarePointsA.x = point.x-sizeX;
	squarePointsA.y = point.x-sizeY;

	//Top right
	var squarePointsB = {}
	squarePointsB.x = point.x+sizeX;
	squarePointsB.y = point.x+sizeY;

	return getPlayersInArea(players,squarePointsA,squarePointsB);

}


/**
* Return a list of players inside the provided area defined by two points
* @param {Array} players - List of all players in the game
* @param {Point} botLeft - Represents the bottom left corner coordinates of the square
* @param {Point} topRight - Represents the top right corner coordinates of the square
* @return {Array} Array containing players inside the provided area or undefined if no players found in the area
*/
var getPlayersInArea = function (players, botLeft, topRight) 
{
	var returnPlayers = [];
	var keys = Object.keys(players);
	var curPos;
	for(var i = 0; i < Object.keys(players).length; i++)
		{
			curPos = players[keys[i]].sprite.position;
			if(curPos.x > botLeft.x && 
				 curPos.y > botLeft.y && 
				 curPos.x < topRight.x && 
				 curPos.y < topRight.y)
			{
				returnPlayers.push(players[keys[i]]);
			}
		}
		if(returnPlayers.length > 0) 
		{
			return returnPlayers;
		}
		return;
}