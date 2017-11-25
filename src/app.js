import mainMenuState from './states/mainMenu.js'
import gameState from './states/game.js'
import Net from './net/Net'

let phaser = new Phaser.Game(760, 650, Phaser.CANVAS, 'game');

phaser.state.add('mainMenu', mainMenuState(phaser));
phaser.state.add('game', gameState(phaser));

phaser.state.start('mainMenu');

new Net().puzzle_getCategorys((e)=>{console.log(e)}, e=>{console.log(e);});
//start(key, clearWorld, clearCache, parameter)