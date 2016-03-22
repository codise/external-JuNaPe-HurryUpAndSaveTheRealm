'use strict';

function Hud(game, target)
{

var self = this;

var healthBarOutline = game.add.graphics(0,0);
var healthBarFill = game.add.graphics(0,0);
var healthBarSprite = game.add.sprite(0, 0);
var textureWidth = target.sprite.width;
var textureHeight = target.sprite.height;

healthBarOutline.lineStyle(2,0x000000,1);
healthBarOutline.drawRect(target.sprite.X, target.sprite.Y, 100, 15);
healthBarFill.beginFill(0xff3300);
healthBarFill.drawRect(target.sprite.X, target.sprite.Y, (target.currentHealth/target.maxHealth*100), 13);
healthBarFill.endFill();

healthBarSprite.addChild(healthBarOutline)
healthBarSprite.addChild(healthBarFill);

// This prevets flippingu

healthBarSprite.setScaleMinMax(1);;

target.sprite.addChild(healthBarSprite);

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
		scale();
	};

var scale = () =>
	{
	healthBarSprite.setScaleMinMax(scalingFactors.x, scalingFactors.y);

	if (nameText != undefined)
		{
		nameText.setScaleMinMax(scalingFactors.x, scalingFactors.y);
		}
	};


}
