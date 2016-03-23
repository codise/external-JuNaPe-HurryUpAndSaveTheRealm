'use strict';

function EffectManager(game)
{
var self = this;

var scale = function (sprite)
	{
	sprite.scale.x = scalingFactors.x;
	sprite.scale.y = scalingFactors.y;
	};

self.createDeathEffect = function (target)
	{
	var effect = game.add.sprite(target.sprite.position.x, target.sprite.position.y, 'explosion');
	scale(effect);
	effect.anchor.setTo(0.5, 0.5);
	effect.animations.add('kaboom');
	effect.animations.play('kaboom', 30, false, true);
	};
}
