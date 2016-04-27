'use strict';

var loadState = function ()
	{
	var self = this;
	var loadingText;

	self.preload = function ()
		{

		// Load waiting state demo video
		
		game.load.video('demo', 'assets/video/placeholder_demo.mp4');

		// Load level backgrounds
	
		//Round1
		game.load.image('DemoMap1.png', 'assets/maps/backgrounds/DemoMap1.png');
		game.load.image('DemoMap2.png', 'assets/maps/backgrounds/DemoMap2.png');
		game.load.image('DemoMap3.png', 'assets/maps/backgrounds/DemoMap3.png');
		game.load.image('DemoMap4.png', 'assets/maps/backgrounds/DemoMap4.png');
		game.load.image('DemoMap5.png', 'assets/maps/backgrounds/DemoMap5.png');

		//Round2
		game.load.image('Demo2Map1.png', 'assets/maps/backgrounds/Demo2Map1.png');
		game.load.image('Demo2Map2.png', 'assets/maps/backgrounds/Demo2Map2.png');
		game.load.image('Demo2Map3.png', 'assets/maps/backgrounds/Demo2Map3.png');
		game.load.image('Demo2Map4.png', 'assets/maps/backgrounds/Demo2Map4.png');
		game.load.image('Demo2Map5.png', 'assets/maps/backgrounds/Demo2Map5.png');

		//Round3
		game.load.image('Demo3Map1.png', 'assets/maps/backgrounds/Demo3Map1.png');
		game.load.image('Demo3Map2.png', 'assets/maps/backgrounds/Demo3Map2.png');
		game.load.image('Demo3Map3.png', 'assets/maps/backgrounds/Demo3Map3.png');
		game.load.image('Demo3Map4.png', 'assets/maps/backgrounds/Demo3Map4.png');
		game.load.image('Demo3Map5.png', 'assets/maps/backgrounds/Demo3Map5.png');

		//Round4
		game.load.image('Demo4Map1.png', 'assets/maps/backgrounds/Demo4Map1.png');
		game.load.image('Demo4Map2.png', 'assets/maps/backgrounds/Demo4Map2.png');
		game.load.image('Demo4Map3.png', 'assets/maps/backgrounds/Demo4Map3.png');
		game.load.image('Demo4Map4.png', 'assets/maps/backgrounds/Demo4Map4.png');

		//Round5
		game.load.image('Demo5Map1.png', 'assets/maps/backgrounds/Demo5Map1.png');
		game.load.image('Demo5Map2.png', 'assets/maps/backgrounds/Demo5Map2.png');
		game.load.image('Demo5Map3.png', 'assets/maps/backgrounds/Demo5Map3.png');
		game.load.image('Demo5Map4.png', 'assets/maps/backgrounds/Demo5Map4.png');
		
		//Generics
		
		game.load.image('generic_map_FloorOnly', 'assets/maps/backgrounds/Generics/map_FloorOnly.png');

		//Deadends aka bossrooms
		game.load.image('generic_DeadEnd_FromEast1', 'assets/maps/backgrounds/Generics/DeadEnd_FromEast1.png');
		game.load.image('generic_DeadEnd_FromEast2', 'assets/maps/backgrounds/Generics/DeadEnd_FromEast2.png');	
		game.load.image('generic_DeadEnd_FromWest1', 'assets/maps/backgrounds/Generics/DeadEnd_FromWest1.png');

		//Entrances
		game.load.image('generic_Entrance_FromEast1', 'assets/maps/backgrounds/Generics/Entrance_FromEast1.png');
		game.load.image('generic_Entrance_FromEast2', 'assets/maps/backgrounds/Generics/Entrance_FromEast2.png');
		game.load.image('generic_Entrance_FromWest1', 'assets/maps/backgrounds/Generics/Entrance_FromWest1.png');

		//straight leftright
		game.load.image('generic_Straight_Vert1', 'assets/maps/backgrounds/Generics/Straight_Vert1.png');
		game.load.image('generic_Straight_Vert2', 'assets/maps/backgrounds/Generics/Straight_Vert2.png');
		game.load.image('generic_Straight_Vert3', 'assets/maps/backgrounds/Generics/Straight_Vert3.png');
		game.load.image('generic_Straight_Vert4', 'assets/maps/backgrounds/Generics/Straight_Vert4.png');

		//Straight updown
		game.load.image('generic_Straight_Hori_short_stairs1', 'assets/maps/backgrounds/Generics/Straight_Hori_short_stairs1.png');
		game.load.image('generic_Straight_Hori_short1', 'assets/maps/backgrounds/Generics/Straight_Hori_short1.png');
		game.load.image('generic_Straight_Hori_short2', 'assets/maps/backgrounds/Generics/Straight_Hori_short2.png');
		game.load.image('generic_Straight_Hori_short3', 'assets/maps/backgrounds/Generics/Straight_Hori_short3.png');
		game.load.image('generic_Straight_Hori_short_Enlarged1', 'assets/maps/backgrounds/Generics/Straight_Hori_short_Enlarged1.png');
		game.load.image('generic_Straight_Hori_short_Enlarged2', 'assets/maps/backgrounds/Generics/Straight_Hori_short_Enlarged2.png');



		//Turns
		game.load.image('generic_Turn_EtN1', 'assets/maps/backgrounds/Generics/Turn_EtN1.png');
		game.load.image('generic_Turn_EtN2', 'assets/maps/backgrounds/Generics/Turn_EtN2.png');
		game.load.image('generic_Turn_EtN3', 'assets/maps/backgrounds/Generics/Turn_EtN3.png');
		game.load.image('generic_Turn_EtS1', 'assets/maps/backgrounds/Generics/Turn_EtS1.png');
		game.load.image('generic_Turn_EtS2', 'assets/maps/backgrounds/Generics/Turn_EtS2.png');
		game.load.image('generic_Turn_WtN1', 'assets/maps/backgrounds/Generics/Turn_WtN1.png');
		game.load.image('generic_Turn_WtN2', 'assets/maps/backgrounds/Generics/Turn_WtN2.png');
		game.load.image('generic_Turn_WtS1', 'assets/maps/backgrounds/Generics/Turn_WtS1.png');
		game.load.image('generic_Turn_WtS2', 'assets/maps/backgrounds/Generics/Turn_WtS2.png');

		 
		 
		 
		 
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
		game.load.image('enemyBullet7', 'assets/projectiles/EnemyBullet_Sword_rt.png');
		game.load.image('enemyBullet8', 'assets/projectiles/enemyBullet_boss2.png');
		game.load.image('enemyBullet9', 'assets/projectiles/enemyBullet_boss2_Line.png');
		game.load.image('enemyBullet10', 'assets/projectiles/enemyBullet_fork.png');
		game.load.image('enemyBullet11', 'assets/projectiles/enemyBullet_Wave.png');
		game.load.image('enemyBullet12', 'assets/projectiles/enemyBullet_Slash.png');
		game.load.image('enemyBullet13', 'assets/projectiles/enemyBullet_Reaper.png');
		

		//load weapon sprites

		game.load.image('player1Weapon', 'assets/player_classes/weapons/knight1.png');
		game.load.image('player2Weapon', 'assets/player_classes/weapons/elfi1.png');
		game.load.image('player3Weapon', 'assets/player_classes/weapons/mage1.png');
		game.load.image('player4Weapon', 'assets/player_classes/weapons/viking1.png');
		game.load.image('player5Weapon', 'assets/player_classes/weapons/ninja1.png');
		game.load.image('player6Weapon', 'assets/player_classes/weapons/warlock1.png');


		// Load enemy assets

		game.load.image('enemy_hellbug', 'assets/enemies/enemy_05b.png');
		game.load.image('enemy_skeleton', 'assets/enemies/enemy_01b.png');
		game.load.image('enemy_slasher', 'assets/enemies/enemy_08b.png');
		game.load.image('enemy_ghost', 'assets/enemies/enemy_04b.png');
		game.load.image('boss_tentaclemonster', 'assets/enemies/enemy_06b.png');
		game.load.image('boss_king1', 'assets/enemies/enemy_10.png');
		game.load.image('boss_king2', 'assets/enemies/enemy_10_2.png');
		game.load.image('boss_king3', 'assets/enemies/enemy_10_3.png');

		// Load effects

		game.load.spritesheet('explosion', 'assets/effects/placeholder_explosion.png', 64, 64, 23);
		game.load.spritesheet('spawn', 'assets/effects/SpawnCloud.png', 100, 100, 6);

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

		// Load QR
		game.load.image('qr_niko', 'assets/QR/niko.jpg');
		game.load.image('qr_janika', 'assets/QR/janika.jpg');

    // Load score background

    game.load.image('scoreBackground', 'assets/other/placeholder_scoreBackground.jpg');
		
		};

self.create = function ()
	{
	game.state.start('waiting');
	};

}
	
