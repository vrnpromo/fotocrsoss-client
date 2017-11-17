import gameState from './states/game.js'

let phaser = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

phaser.state.add('game', gameState(phaser));

phaser.state.start('game');
