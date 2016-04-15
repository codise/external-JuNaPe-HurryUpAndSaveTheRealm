'use strict';

function Weapon(game, player, weaponName)
{
	var self = this;
	self.sprite = game.add.sprite(player.sprite.position.x, player.sprite.position.y, weaponName);
	game.physics.enable(self.sprite, Phaser.Physics.ARCADE);
	self.sprite.anchor.set(-1.3, 0.5);
	self.sprite.scale.x = scalingFactors.x;
	self.sprite.body.setSize(self.sprite.width, self.sprite.height);
	self.sprite.scale.y = scalingFactors.y;

	self.update = function(flipped, input)
		{
		self.sprite.position = player.sprite.position;
		if(flipped)
			{
			self.sprite.scale.x = scalingFactors.x;
			self.sprite.scale.y = -scalingFactors.y;
			}
		else
			{
			self.sprite.scale.x = scalingFactors.x;
			self.sprite.scale.y = scalingFactors.y;
			}
		if(input.shootAngle == 0)
			{
			self.sprite.angle = 0;
			if(flipped)
				{
				self.sprite.scale.x = -scalingFactors.x;
				self.sprite.scale.y = scalingFactors.y;
				}
			}	
		};
}
