'use strict';

function LoadingBar (game)
{
var self = this;

var screenMiddle = {y: game.camera.y + game.camera.height * 0.5,
										x: game.camera.x + game.camera.width * 0.5}

var barBg = game.add.graphics(0, 0);
var bar = game.add.graphics(0, 0);

var maxWidth = game.camera.width - 10;

barBg.lineStyle(2,0xFFFFFF, 1);
barBg.drawRect(screenMiddle.x - maxWidth/2, screenMiddle.y, maxWidth, 15);
bar.beginFill(0xff3300);
bar.drawRect(screenMiddle.x - maxWidth/2, 0, 13);
bar.endFill();

self.update = function (percentage)
	{
	bar.clear();
	bar.beginFill(0xff3300);
	bar.drawRect(screenMiddle.x - maxWidth/2, screenMiddle.y, (percentage/100) * maxWidth, 13);
	bar.endFill();
	};

}




