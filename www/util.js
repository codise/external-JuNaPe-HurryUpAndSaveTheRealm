'use strict';

/*==========================================
|                  UTIL                    |
|     Here you'll find useful functions    |
==========================================*/

/**
* Get a point a minimum distance away from all players
* @param {game} game - The game object
* @param {playerList} List - The list containing all player objects
* @param {minimumDistance} Int - The minimum distance from players to spawn from
* @param {maxTryCount} Int - The maximum amount of attempts until returning null
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
* @param {players} List - List of all players
* @param {position} Point - The position to which compare
* @return {Int} The distance in pixels from position to the closest player
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
* @param {dict} Array - The dictionary from which we pick an object
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


