'use strict';

function BossMonster (bossInfo, position, enemyManager)
{
var self = this;

self.sprite = game.add.sprite(position.x, position.y, bossInfo.sprite);
self.sprite.anchor.setTo(0.5, 0.5);

var nextMove = 0;
var moveRate = bossInfo.moveRate;
var movementScheme = bossInfo.movementScheme;

var attackSchemes = bossInfo.attackSchemes;

self.maxHealth = bossInfo.maxHealth;
self.currentHealth = maxHealth;

var healthBar = new playerHud(game, self);

//var mPlayers = players;


self.update = (players) =>
	{
	mPlayers = players;

	if (game.time.now > nextMove)
		{
		move();
		}

	attack();
	healthBar.updateHealthBar();
	}

var move = () =>
	{
	switch (movementScheme)
		{
		case 'wobble':
			self.sprite.angle = self.sprite.angle + Math.random();
			break;
		default:

		}

	};

var attack = () =>
	{
	

	};


