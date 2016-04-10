'use strict';

var bossPatterns = {};

//spiral shot patterns

bossPatterns.spiral1 = {
	patternRate: 3500,
	movementScheme: 'wobble',
	attackScheme: 'spiral',
	fireRate: 700,
	moveRate: 500,
	maxSpeed: 15,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletLifespan: 4500,
	shotDirectionAmount: 5,
	shotRotation: 15,
	shotAngleVariance: 2,
	bulletGraphic: 'enemyBullet4',
};

bossPatterns.spiral1Reverse = {
	patternRate: 3500,
	movementScheme: 'wobble',
	attackScheme: 'spiral',
	fireRate: 700,
	moveRate: 500,
	maxSpeed: 15,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletLifespan: 4500,
	shotDirectionAmount: 5,
	shotRotation: -15,
	shotAngleVariance: 2,
	bulletGraphic: 'enemyBullet4',
};

bossPatterns.spiral2 = {
	patternRate: 2500,
	movementScheme: 'shake',
	attackScheme: 'spiral',
	fireRate: 350,
	moveRate: 200,
	maxSpeed: 30,
	bulletDamage: 8,
	bulletSpeed: 350,
	bulletLifespan: 3000,
	shotDirectionAmount: 6,
	shotRotation: 20,
	shotAngleVariance: 0,
	bulletGraphic: 'enemyBullet5',
};

//burst shot patterns

bossPatterns.burst1 = {
	patternRate: 5000,
	movementScheme: 'wobble',
	attackScheme: 'burst',
	burstBulletAmount: 5,
	burstSpreadAngle: 30,
	shotAngleVariance: 0,
	fireRate: 900,
	moveRate: 500,
	maxSpeed: 15,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletSpeedVariance: 0,
	bulletLifespan: 4500,
	bulletGraphic: 'enemyBullet6',
};

bossPatterns.burst2 = {
	patternRate: 5000,
	movementScheme: 'wobble',
	attackScheme: 'burst',
	burstBulletAmount: 7,
	burstSpreadAngle: 25,
	shotAngleVariance: 0,
	fireRate: 800,
	moveRate: 200,
	maxSpeed: 60,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletSpeedVariance: 0,
	bulletLifespan: 4500,
	bulletGraphic: 'enemyBullet6',
};



































