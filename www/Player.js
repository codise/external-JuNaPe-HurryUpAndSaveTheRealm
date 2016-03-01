'use strict';

function Player(game, x, y, bulletmanager, id)
{
var self = this;

self.input;

self.id = id;

self.game = game;
self.bulletManager = bulletmanager;
self.maxSpeed = 400;
var sprites = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6']
var randomSprite = sprites[Math.floor((Math.random() * 6))];
self.playerSprite = self.game.add.sprite(x, y, randomSprite);
self.playerSprite.anchor.setTo(0.5, 0.5);
self.flipped = false;
var textureWidth = self.playerSprite.width;
var textureHeight = self.playerSprite.height;


self.game.physics.enable(self.playerSprite, Phaser.Physics.ARCADE);
self.playerSprite.body.collideWorldBounds = true;

self.fireRate = 100;
self.nextFire = 0;

self.maxHealth = 1000;
self.currentHealth = self.maxHealth;

self.dead = false;
self.respawnTime = 100;
self.nextRespawn = 0;

self.healthBarOutline = game.add.graphics(0,0);
self.healthBarFill = game.add.graphics(0,0);
self.healthBarOutline.lineStyle(2,0x000000,1);
self.healthBarOutline.drawRect(self.playerSprite.X, self.playerSprite.Y, 100, 15);
self.healthBarFill.beginFill(0xff3300);
self.healthBarFill.drawRect(self.playerSprite.X, self.playerSprite.Y, (self.currentHealth/self.maxHealth*100), 13);
self.healthBarFill.endFill();
self.playerSprite.addChild(self.healthBarOutline);
self.playerSprite.addChild(self.healthBarFill);
self.healthBarOutline.x = - textureWidth/2;
self.healthBarFill.x = -textureWidth/2;;
self.healthBarOutline.y = textureHeight/2;
self.healthBarFill.y = textureHeight/2;


self.setInput = (input) =>
    {
    self.input = input;
    }


self.update = () =>
	{
  if (!self.dead)
  {
    if (self.input != undefined)
    {
      var i = self.input;
      if(!(i.X == 0 && i.Y ==0)) 
      {
      var direction = new Phaser.Point();
      direction.x = i.X;
      direction.y = i.Y;
      self.game.physics.arcade.velocityFromAngle(headingToAngle(direction), 100, self.playerSprite.body.velocity);
      } else {
        self.playerSprite.body.velocity.x = 0;
        self.playerSprite.body.velocity.y = 0;
      }
      if (self.playerSprite.body.velocity.x > 0 && self.flipped)
      {
      self.playerSprite.scale.x = 1;
      self.flipped = false;
      } else if (self.playerSprite.body.velocity.x < 0 && !self.flipped)
      {
      self.playerSprite.scale.x = -1;
      self.flipped = true;
      }

      if ((i.sX != 0 || i.sX != 0) && (self.game.time.now > self.nextFire))
      {
        self.nextFire = self.game.time.now + self.fireRate;
        var heading = new Phaser.Point();
        heading.x = i.sX;
        heading.y = i.sY;
        self.bulletManager.createBullet('magic', self.id, headingToAngle(heading), self.playerSprite.position);
      }
    }
    //We should only check for collisions when there are collidable objects on screen
    if(self.bulletManager.enemyBulletCount > 0)
      {
        for (var i = 0; i < self.bulletManager.enemyBulletGroups.length; i++)
        {
          self.game.physics.arcade.overlap(self.bulletManager.enemyBulletGroups[i], self.playerSprite, self.playerHit, null, self);
        }
      }
  } else if (self.dead && self.nextRespawn < 0)
  {
    self.playerSprite.exists = true;
    self.dead = false;
    self.currentHealth = self.maxHealth;
  } else
  {
    self.nextRespawn--;
  }
	};

self.playerHit = function(player, bullet)
  {
    self.takeDamage(10);
    bullet.kill();
  };


self.takeDamage = function(damage)
  {
    self.currentHealth = self.currentHealth-damage;
    if(self.currentHealth <= 0) {
      self.dead = true;
      self.kill();
      self.currentHealth = 0;
    }
    updateHealthBar();
  };

 var updateHealthBar = function()
  {
    self.healthBarFill.clear();
    self.healthBarFill.beginFill(0xFF3300);
    self.healthBarFill.drawRect(self.playerSprite.X,self.playerSprite.Y,(self.currentHealth/self.maxHealth*100),13);
    self.healthBarFill.endFill();
  };

self.kill = () =>
	{
  self.playerSprite.exists = false;
  self.nextRespawn = self.respawnTime;
	};

var headingToAngle = (heading) =>
  {
    var vector = new Phaser.Point();
    vector.x = -1;
    vector.y = 0;
    return (Phaser.Point.angle(heading, vector) * 360/Math.PI);
  }

}
