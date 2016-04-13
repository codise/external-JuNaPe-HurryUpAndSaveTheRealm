'use strict';

var bossPatterns = {};

//spiral shot patterns

//boss1
bossPatterns.spiral1 = {
	patternRate: 4000,
	movementScheme: ['random'],
	attackScheme: 'spiral',
	fireRate: 500,
	moveRate: 500,
	maxSpeed: 25,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletLifespan: 4500,
	bulletAmount: 5,
	shotRotation: 15,
	shotAngleVariance: 0,
	bulletGraphic: 'enemyBullet4',
};

//boss1
bossPatterns.spiral1Reverse = {
	patternRate: 4000,
	movementScheme: ['random'],
	attackScheme: 'spiral',
	fireRate: 500,
	moveRate: 500,
	maxSpeed: 25,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletLifespan: 4500,
	bulletAmount: 5,
	shotRotation: -15,
	shotAngleVariance: 5,
	bulletGraphic: 'enemyBullet4',
};

//boss1
bossPatterns.spiral2 = {
	patternRate: 3000,
	movementScheme: ['shake'],
	attackScheme: 'spiral',
	fireRate: 350,
	moveRate: 200,
	maxSpeed: 30,
	bulletDamage: 10,
	bulletSpeed: 350,
	bulletLifespan: 3000,
	bulletAmount: 5,
	shotRotation: 25,
	shotAngleVariance: 0,
	bulletGraphic: 'enemyBullet5',
};

//boss2
bossPatterns.spiral3 = {
	patternRate: 3500,
	movementScheme: ['shake'],
	attackScheme: 'spiral',
	fireRate: 350,
	moveRate: 800,
	maxSpeed: 30,
	bulletDamage: 10,
	bulletSpeed: 350,
	bulletLifespan: 3000,
	bulletAmount: 5,
	shotRotation: 25,
	shotAngleVariance: 0,
	bulletGraphic: 'enemyBullet10',
};

//boss2
bossPatterns.spiral4 = {
	patternRate: 2000,
	movementScheme: ['random'],
	attackScheme: 'spiral',
	fireRate: 600,
	moveRate: 800,
	maxSpeed: 30,
	bulletDamage: 10,
	bulletSpeed: 350,
	bulletLifespan: 3000,
	bulletAmount: 8,
	shotRotation: 25,
	shotAngleVariance: 0,
	bulletGraphic: 'enemyBullet10',
};

//boss2
bossPatterns.spiralNova1 = {
	patternRate: 1000,
	movementScheme: ['random'],
	attackScheme: 'spiral',
	fireRate: 10000,
	moveRate: 500,
	maxSpeed: 10,
	bulletDamage: 10,
	bulletSpeed: 500,
	bulletLifespan: 3000,
	bulletAmount: 30,
	shotRotation: 0,
	shotAngleVariance: 0,
	bulletGraphic: 'enemyBullet11',
	onlyOnce: true,
	texture: 2,
};


//burst shot patterns

//boss1
bossPatterns.burst1 = {
	patternRate: 5000,
	movementScheme: ['random'],
	attackScheme: 'burst',
	bulletAmount: 5,
	burstSpreadAngle: 25,
	shotAngleVariance: 2,
	fireRate: 800,
	moveRate: 700,
	maxSpeed: 45,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletSpeedVariance: 0,
	bulletLifespan: 4500,
	bulletGraphic: 'enemyBullet6',
};

//boss1
bossPatterns.burst2 = {
	patternRate: 3500,
	movementScheme: ['random'],
	attackScheme: 'burst',
	bulletAmount: 7,
	burstSpreadAngle: 20,
	shotAngleVariance: 0,
	fireRate: 700,
	moveRate: 400,
	maxSpeed: 60,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletSpeedVariance: 0,
	bulletLifespan: 4500,
	bulletGraphic: 'enemyBullet6',
};

//boss1 rage
//haulikkomainen ellei jopa liekinheittimen kaltainen ampumispatterni
bossPatterns.burst3 = {
	patternRate: 2400,
	movementScheme: ['random'],
	attackScheme: 'burst',
	bulletAmount: 5,
	burstSpreadAngle: 4,
	shotAngleVariance: 10,
	fireRate: 600,
	moveRate: 400,
	maxSpeed: 60,
	bulletDamage: 10,
	bulletSpeed: 250,
	bulletSpeedVariance: 50,
	bulletLifespan: 4500,
	bulletGraphic: 'enemyBullet5',
};



//boss2
bossPatterns.burst4 = {
	patternRate: 6000,
	movementScheme: ['charge'], //moves at one player for the duration of the pattern
	attackScheme: 'burst',
	stickToTarget: false,	//move and shoot at the same target(only with charge movement atm)
												//false would allow for moving at one target and shooting at other targets randomly
	bulletAmount: 7,
	burstSpreadAngle: 5,
	shotAngleVariance: 10,
	fireRate: 1200,
	moveRate: 600,
	maxSpeed: 100,
	bulletDamage: 10,
	bulletSpeed: 280,
	bulletSpeedVariance: 60,
	bulletLifespan: 4500,
	bulletGraphic: 'enemyBullet12',
};

//boss2
bossPatterns.burstSlash1 = {
	patternRate: 6000,
	movementScheme: ['charge'], //moves at one player for the duration of the pattern
	attackScheme: 'burst',
	stickToTarget: true,	//move and shoot at the same target(only with charge movement atm)
												//false would allow for moving at one target and shooting at other targets randomly
	bulletAmount: 5,
	burstSpreadAngle: 10,
	shotAngleVariance: 0,
	fireRate: 1200,
	moveRate: 600,
	maxSpeed: 120,
	bulletDamage: 10,
	bulletSpeed: 350,
	bulletSpeedVariance: 0,
	bulletLifespan: 1000,
	bulletGraphic: 'enemyBullet11',
	texture: 0,
};

//unused, same as burst4 but stickToTarget = false
bossPatterns.burst5 = {
	patternRate: 6000,
	movementScheme: ['charge'], //moves at one player for the duration of the pattern
	attackScheme: 'burst',
	stickToTarget: false,	//move and shoot at the same target(only with charge movement atm)
												//false would allow for moving at one target and shooting at other targets randomly
	bulletAmount: 7,
	burstSpreadAngle: 5,
	shotAngleVariance: 10,
	fireRate: 1200,
	moveRate: 600,
	maxSpeed: 100,
	bulletDamage: 10,
	bulletSpeed: 280,
	bulletSpeedVariance: 60,
	bulletLifespan: 4500,
	bulletGraphic: 'enemyBullet3',
};


//line shooting patterns

//boss2
bossPatterns.line1 = {
	patternRate: 1000,
	movementScheme: ['charge'],
	attackScheme: 'line',
	bulletAmount: 13,
	
	fireRate: 10000,
	moveRate: 400,
	maxSpeed: 10,
	
	bulletSpeed: 100,
	bulletSpeedVariance: 30,
	bulletLifespan: 4500,
	
	bulletGraphic: 'enemyBullet7',
	bulletDamage: 50,
	
	lineBulletGraphic: 'enemyBullet9',
	lineBulletDamage: 10,

	texture: 1,
};

//boss2 																						TODO
bossPatterns.line2 = {
	patternRate: 3000,
	movementScheme: ['charge'],
	attackScheme: 'line',
	bulletAmount: 13,
	
	stickToTarget: true,
	fireRate: 900,
	moveRate: 400,
	maxSpeed: 60,
	
	bulletSpeed: 100,
	bulletSpeedVariance: 30,
	bulletLifespan: 4500,
	
	bulletGraphic: 'enemyBullet8',
	bulletDamage: 20,
	
	lineBulletGraphic: 'enemyBullet9',
	lineBulletDamage: 10,

};




















