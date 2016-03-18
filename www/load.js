'use strict';

var loadState = function ()
	{
	var self = this;
	var loadingText;

	self.preload = () =>
		{
		// Load player sprites

		game.load.image('player1', 'assets/player_classes/knight.png');
		game.load.image('player2', 'assets/player_classes/elf.png');
		game.load.image('player3', 'assets/player_classes/warlock.png');
		game.load.image('player4', 'assets/player_classes/ninja.png');
		game.load.image('player5', 'assets/player_classes/mage.png');
		game.load.image('player6', 'assets/player_classes/viking.png');
		game.load.image('empty', 'assets/other/empty.png');

		// Load bullet sprites

		game.load.image('magic', 'assets/projectiles/bullet.png');
		game.load.image('enemyBullet', 'assets/projectiles/enemyBullet.png');

		//load weapon sprites

		game.load.image('player1Weapon', 'assets/player_classes/weapons/knight1.png');
		game.load.image('player2Weapon', 'assets/player_classes/weapons/elfi1.png');
		game.load.image('player3Weapon', 'assets/player_classes/weapons/warlock1.png');
		game.load.image('player4Weapon', 'assets/player_classes/weapons/ninja1.png');
		game.load.image('player5Weapon', 'assets/player_classes/weapons/mage1.png');
		game.load.image('player6Weapon', 'assets/player_classes/weapons/viking1.png');


		// Load enemy assets

		game.load.image('enemy_hellbug', 'assets/enemies/enemy_05.png');
		game.load.image('enemy_skeleton', 'assets/enemies/enemy_01.png');
		game.load.image('enemy_slasher', 'assets/enemies/enemy_08.png');
		game.load.image('enemy_tentaclemonster', 'assets/enemies/enemy_06.png');

		// Set loadingtext
	
		loadingText = game.add.text(80, 150, 'Loading ...', {font: '30px Courier', fill: '#ffffff'});

		};

self.create = () =>
	{
	game.state.start('waiting');
	};

}
	
