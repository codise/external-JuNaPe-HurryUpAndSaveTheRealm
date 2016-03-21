'use strict';

function EffectManager(game)
{
var self = this;

self.createDeathEffect = (target) =>
	{
	var effect = game.add.sprite(target.sprite.position.x, target.sprite.position.y, 'explosion');
	effect.anchor.setTo(0.5, 0.5);
	effect.animations.add('kaboom');
	effect.animations.play('kaboom', 30, false, true);
	};
}
