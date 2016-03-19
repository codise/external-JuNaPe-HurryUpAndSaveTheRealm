'use strict';

function Weapon(game, player, weaponName)
{
	var self = this;
	self.sprite = game.add.sprite(player.sprite.position.X, player.sprite.position.Y, weaponName);
	self.sprite.anchor.set(-1.3, 0.5);
	player.sprite.addChild(self.sprite);
	self.name = "kukkuu";
}
