'use strict';

var loadState = function ()
	{
	var self = this;
	var loadingText;

	self.preload = function ()
		{
		// Load player sprites

		game.load.image('player1', 'assets/player_classes/knight.png');
		game.load.image('player2', 'assets/player_classes/elf.png');
		game.load.image('player3', 'assets/player_classes/mage.png');
		game.load.image('player4', 'assets/player_classes/viking.png');
		game.load.image('player5', 'assets/player_classes/ninja.png');
		game.load.image('player6', 'assets/player_classes/warlock.png');
		game.load.image('empty', 'assets/other/empty.png');

		// Load bullet sprites

		game.load.image('magic', 'assets/projectiles/bullet.png');
		game.load.image('bullet1', 'assets/projectiles/bullet1.png');
		game.load.image('bullet2', 'assets/projectiles/bullet2.png');
		game.load.image('bullet3', 'assets/projectiles/bullet3.png');
		game.load.image('bullet4', 'assets/projectiles/bullet4.png');
		game.load.image('bullet5', 'assets/projectiles/bullet5.png');
		game.load.image('bullet6', 'assets/projectiles/bullet6.png');

		game.load.image('enemyBullet1', 'assets/projectiles/enemyBullet.png');
		game.load.image('enemyBullet2', 'assets/projectiles/enemyBullet_spike.png');
		game.load.image('enemyBullet3', 'assets/projectiles/enemyBullet_bone.png');
		game.load.image('enemyBullet4', 'assets/projectiles/enemyBullet_YellowStar.png');
		game.load.image('enemyBullet5', 'assets/projectiles/enemyBullet_RED.png');
		game.load.image('enemyBullet6', 'assets/projectiles/Fireball.png');

		//load weapon sprites

		game.load.image('player1Weapon', 'assets/player_classes/weapons/knight1.png');
		game.load.image('player2Weapon', 'assets/player_classes/weapons/elfi1.png');
		game.load.image('player3Weapon', 'assets/player_classes/weapons/mage1.png');
		game.load.image('player4Weapon', 'assets/player_classes/weapons/viking1.png');
		game.load.image('player5Weapon', 'assets/player_classes/weapons/ninja1.png');
		game.load.image('player6Weapon', 'assets/player_classes/weapons/warlock1.png');


		// Load enemy assets

		game.load.image('enemy_hellbug', 'assets/enemies/enemy_05.png');
		game.load.image('enemy_skeleton', 'assets/enemies/enemy_01.png');
		game.load.image('enemy_slasher', 'assets/enemies/enemy_08.png');
		game.load.image('enemy_tentaclemonster', 'assets/enemies/enemy_06.png');

		// Load effects

		game.load.spritesheet('explosion', 'assets/effects/placeholder_explosion.png', 64, 64, 23);

		//Load powerup sprites
		game.load.image('item_book', 'assets/decorations/Book.png');
		game.load.image('item_ATK_Bonus', 'assets/decorations/PickUp_AttackBonus.png');
		game.load.image('item_SPD_Bonus', 'assets/decorations/PickUp_SpeedBonus.png');
		game.load.image('item_Heal', 'assets/decorations/PickUp_HealthBonus.png');
		game.load.image('item_Chest', 'assets/decorations/Chest_Gold.png');

		//Load particles
		game.load.image('particle_blue','assets/particles/SmallBlingBlue.png');
		game.load.image('particle_red','assets/particles/SmallBlingRed.png');

		// Set loadingtext
	
		loadingText = game.add.text(80, 150, 'Loading ...', {font: '30px Courier', fill: '#ffffff'});

		};

self.create = function ()
	{
	game.state.start('waiting');
	};

}
	
