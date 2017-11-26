import mainMenuState from './states/mainMenu.js'
import gameState from './states/game.js'
import Net from './net/Net'


//start(key, clearWorld, clearCache, parameter)
export default class App{
    constructor(){
        let phaser = new Phaser.Game(760, 650, Phaser.CANVAS, 'game');
        App.phaser = phaser;
        
        phaser.state.add('mainMenu', mainMenuState(phaser));
        phaser.state.add('game', gameState(phaser));
        
        phaser.state.start('mainMenu');
        
        new Net().puzzle_getCategorys((e)=>{console.log(`ok:${e}`)}, e=>{console.log(`err:${e}`);});
    }
}

new App();