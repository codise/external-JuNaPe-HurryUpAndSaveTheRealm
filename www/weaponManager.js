'use strict';

function WeaponManager(game)
{
var self = this;
var weaponDictionary = {};
self.weaponGroup = game.add.group();
self.weaponGroup.enableBody = true;
self.weaponGroup.physicsBodyType = Phaser.Physics.ARCADE;
//self.weaponList = []; 
/*self.update = () =>
{
}*/
self.getNewWeapon = (player) =>
    {
    //TODO
    var newWeapon = new Weapon(weaponInfo, player);
    self.weaponGroup.add(newWeapon.weaponSprite);
    newWeapon.weaponSprite.body.collideWorldBounds = true;
    return newWeapon;
    };
}