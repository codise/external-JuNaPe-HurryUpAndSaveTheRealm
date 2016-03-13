'use strict';

function BossMonster (bossInfo, enemyManager)
{
var self = this;

self.sprite = game.add.sprite(position.x, position.y, bossInfo.sprite);
self.sprite.anchor.setTo(0.5, 0.5);

var nextMove = 0;
var moveRate = bossInfo.moveRate;
var movementScheme = bossInfo.movementScheme;

var attackSchemes = bossInfo.attackSchemes;

