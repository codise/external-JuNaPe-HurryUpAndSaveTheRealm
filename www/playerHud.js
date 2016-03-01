'use strict';

function playerHud(game, player)
{

var self = this;
var Player = player;
var game = game;

var healthBarOutline = game.add.graphics(0,0);
var healthBarFill = game.add.graphics(0,0);
var textureWidth = Player.playerSprite.width;
var textureHeight = Player.playerSprite.height;

healthBarOutline.lineStyle(2,0x000000,1);
healthBarOutline.drawRect(Player.playerSprite.X, Player.playerSprite.Y, 100, 15);
healthBarFill.beginFill(0xff3300);
healthBarFill.drawRect(Player.playerSprite.X, Player.playerSprite.Y, (Player.currentHealth/Player.maxHealth*100), 13);
healthBarFill.endFill();

Player.playerSprite.addChild(healthBarOutline);
Player.playerSprite.addChild(healthBarFill);

healthBarOutline.x = - textureWidth/2;
healthBarFill.x = -textureWidth/2;;
healthBarOutline.y = textureHeight/2;
healthBarFill.y = textureHeight/2;

 self.updateHealthBar = function() 
  {
    healthBarFill.clear();
    healthBarFill.beginFill(0xFF3300);
    healthBarFill.drawRect(Player.playerSprite.X,Player.playerSprite.Y,(Player.currentHealth/Player.maxHealth*100),13);
    healthBarFill.endFill(); 
  }; 
}