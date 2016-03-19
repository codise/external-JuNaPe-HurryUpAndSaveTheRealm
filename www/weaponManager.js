'use strict';

function WeaponManager(game)
{
	var self = this;
/*var weaponDictionary = {};
var weaponList = [];*/

self.createWeapon = (player, spriteName) =>
	{

	var weaponName = spriteName + "Weapon";
	var weapon = new Weapon(game, player, weaponName);
	return weapon;
	};

}
