'use strict';

var gameWidth = window.innerWidth * window.devicePixelRatio;
var gameHeight = window.innerHeight * window.devicePixelRatio;
var wantedGameWidth = 1920;
var wantedGameHeight = 1080;

scalingFactors = { "x": gameWidth / wantedGameWidth,
                   "y": gameHeight / wantedGameHeight};

var gameConfig = {width: gameWidth,
                  height: gameHeight,
                  renderer: Phaser.CANVAS,
                  parent: 'gameDiv',
                  transparent: false,
                  antialiasing: false,
                  forceSetTimeout: false};

var game = new Phaser.Game(gameConfig);


game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('waiting', waitingState);
game.state.add('play',  playState);
game.state.add('roundOver', roundOverState);


game.state.start('boot');
