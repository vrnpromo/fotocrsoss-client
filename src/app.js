import gameState from './states/game.js'

let phaser = new Phaser.Game(760, 650, Phaser.CANVAS, 'game');

phaser.state.add('game', gameState(phaser));

phaser.state.start('game');
