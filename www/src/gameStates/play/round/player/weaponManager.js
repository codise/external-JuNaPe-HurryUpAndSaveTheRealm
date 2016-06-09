'use strict';

function WeaponManager(game)
{
	var self = this;
	self.weaponGroup = game.add.group();

self.createWeapon = function (player, spriteName)
	{
	var weaponName = spriteName + "Weapon";
	var weapon = new Weapon(game, player, weaponName);
	self.weaponGroup.add(weapon.sprite);
	return weapon;
	};

}
