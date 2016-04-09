'use strict';

/*==========================================
|                  UTIL                    |
|     Here you'll find useful functions    |
==========================================*/

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

var pickRandomFromDictionary = function (dict)
  {
  var keys = Object.keys(dict);
  var object
  object = dict[keys[ keys.length * Math.random() << 0]];
  return object;
  };



