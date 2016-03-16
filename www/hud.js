'use strict';

function Hud(game, target)
{

var self = this;

var healthBarOutline = game.add.graphics(0,0);
var healthBarFill = game.add.graphics(0,0);
var textureWidth = target.sprite.width;
var textureHeight = target.sprite.height;

healthBarOutline.lineStyle(2,0x000000,1);
healthBarOutline.drawRect(target.sprite.X, target.sprite.Y, 100, 15);
healthBarFill.beginFill(0xff3300);
healthBarFill.drawRect(target.sprite.X, target.sprite.Y, (target.currentHealth/target.maxHealth*100), 13);
healthBarFill.endFill();

target.sprite.addChild(healthBarOutline);
target.sprite.addChild(healthBarFill);

healthBarOutline.x = (-textureWidth/2)-25;
healthBarFill.x = (-textureWidth/2)-25;
healthBarOutline.y = (textureHeight/2) + 5;
healthBarFill.y = (textureHeight/2) + 5;

var nameText;

self.updateHealthBar = function()
	{
	healthBarFill.clear();
	healthBarFill.beginFill(0xFF3300);
	healthBarFill.drawRect(target.sprite.X,target.sprite.Y,(target.currentHealth/target.maxHealth*100),13);
	healthBarFill.endFill();
	};

self.setName = function(name)
	{
		nameText = game.add.text(target.sprite.X, target.sprite.Y, name);
		target.sprite.addChild(nameText);
		nameText.x = (-textureWidth/2);
		nameText.y = (textureWidth/2) - 100;
	};
}
