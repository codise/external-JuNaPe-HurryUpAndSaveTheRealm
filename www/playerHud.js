'use strict';

function playerHud(game, player)
{

var self = this;

var healthBarOutline = game.add.graphics(0,0);
var healthBarFill = game.add.graphics(0,0);
var textureWidth = player.playerSprite.width;
var textureHeight = player.playerSprite.height;

healthBarOutline.lineStyle(2,0x000000,1);
healthBarOutline.drawRect(player.playerSprite.X, player.playerSprite.Y, 100, 15);
healthBarFill.beginFill(0xff3300);
healthBarFill.drawRect(player.playerSprite.X, player.playerSprite.Y, (player.currentHealth/player.maxHealth*100), 13);
healthBarFill.endFill();

player.playerSprite.addChild(healthBarOutline);
player.playerSprite.addChild(healthBarFill);

healthBarOutline.x = - textureWidth/2;
healthBarFill.x = -textureWidth/2;;
healthBarOutline.y = textureHeight/2;
healthBarFill.y = textureHeight/2;

self.updateHealthBar = function() 
	{
	healthBarFill.clear();
	healthBarFill.beginFill(0xFF3300);
	healthBarFill.drawRect(player.playerSprite.X,player.playerSprite.Y,(player.currentHealth/player.maxHealth*100),13);
	healthBarFill.endFill(); 
	}; 
}
