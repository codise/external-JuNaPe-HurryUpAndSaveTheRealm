'use strict';

function powerup(game, powerUpManager, pUpInfo, pUpPos, players)
{
var self = this;
self.sprite = game.add.sprite(pUpPos.x, pUpPos.y, pUpInfo.sprite);
self.sprite.anchor.setTo(0.5, 0.5);
self.sprite.visible = true;

var powerUpManager = powerUpManager;
var pUpID = pUpInfo.pUpID;
var pUpDuration = pUpInfo.pUpDuration;
var pUpStats = pUpInfo.pUpStats;
var cameraPadding = 20;

var emitter = null;

self.update = function(players)
{
	scale();
  if (emitter === null)
    {
    createEmitter();
    }
	game.physics.arcade.overlap(players, self.sprite, self.triggerpUp, null, self);	
	checkCameraBounds();

}

self.getpUpID = function ()
{
	return pUpID;
};

self.triggerpUp = function (curpUp, player)
	{

		var playerObject = player.playerObj;
		if(pUpID == 'smallHeal') 
		{
			playerObject.heal(pUpStats);

		} 
		else if (pUpID == 'pointChest') 
		{
			playerObject.getPoints(pUpStats);
			game.effectManager.popupScoreText("+"+pUpStats,self.sprite);
		}
		else {
			playerObject.startPowerUp(pUpID, pUpDuration, pUpStats)
		}
		curpUp.dead = true;
	};

self.kill = function ()
	{
	self.sprite.destroy();
	emitter.destroy();
	};


/**
* Create particle emitter on the powerup
*/
var createEmitter = function ()
	{
    emitter = game.add.emitter(pUpPos.x, pUpPos.y, 20);
    emitter.makeParticles('particle_blue');
    emitter.setRotation(0, 0);
    emitter.setAlpha(0.3, 0.8);
    emitter.setScale(4*scalingFactors.x, scalingFactors.x, 4*scalingFactors.y, scalingFactors.y, 1000);
    emitter.gravity = -100;
    emitter.start(false, 500, 100);
	};

//We need to despawn powerups that go beyond the screen
var checkCameraBounds = function ()
	{
	if (self.sprite.position.x < game.camera.x + cameraPadding || self.sprite.position.x > game.camera.x + game.camera.width - cameraPadding || self.sprite.position.y < game.camera.y + cameraPadding || self.sprite.position.y > game.camera.y + game.camera.height - cameraPadding)
		{
			self.sprite.dead = true;
		}
	};	

var scale = function ()
	{
	self.sprite.scale.x = scalingFactors.x;
	self.sprite.scale.y = scalingFactors.y;
	};


}
