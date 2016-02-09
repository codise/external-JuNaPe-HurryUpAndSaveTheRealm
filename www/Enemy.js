'use strict';

function Enemy(game, x, y)
{
var self = this;


self.game = game;
self.maxSpeed = 150;

self.enemySprite = self.game.add.sprite(x, y, 'enemy_hellbug');
self.enemySprite.anchor.setTo(0.5, 1);
self.flipped = false;

self.game.physics.enable(self.enemySprite, Phaser.Physics.ARCADE);
self.enemySprite.body.collideWorldBounds = true;



self.nextMove = 0;
self.moveRate = 2500;
self.xDirection = [1, -1];
self.yDirection = [1, -1];

self.update = () =>
    {
    if(self.game.time.now > self.nextMove) 
    {
    self.enemySprite.body.velocity.x = self.xDirection[Math.floor(Math.random() * 2)]*50;
    self.enemySprite.body.velocity.y = self.yDirection[Math.floor(Math.random() * 2)]*50;
    self.nextMove = self.game.time.now + self.moveRate;
    }
    if (self.enemySprite.body.velocity.x > 0 && self.flipped)
    {
    self.enemySprite.scale.x = 1;
    self.flipped = false;
    } else if (self.enemySprite.body.velocity.x < 0 && !self.flipped)
    {
    self.enemySprite.scale.x = -1;
    self.flipped = true;
    }
    
    };

self.kill = () =>
    {
    self.enemySprite.kill();
    };
}
