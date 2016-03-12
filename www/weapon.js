'use strict';

function Weapon(weaponName, playerPosition)
{
var self = this;
self.weaponSprite = game.add.sprite(playerPosition.x, playerPosition.y, weaponName);
//self.weaponSprite.anchor.set(_, _);
}