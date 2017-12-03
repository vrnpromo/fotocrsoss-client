import mainMenuState from './states/mainMenu.js'
import gameState from './states/game.js'
import Net from './net/Net'


//start(key, clearWorld, clearCache, parameter)
export class App{
    constructor(){
        let phaser = new Phaser.Game(760, 650, Phaser.CANVAS, 'game');
        
        App.phaser = phaser;
        App.net = new Net();
        App.storage = {onGeneralData: new Phaser.Signal()};
        
        phaser.state.add('mainMenu', mainMenuState());
        phaser.state.add('game', gameState());
        
        phaser.state.start('mainMenu');
        
        App.net.getGeneralData( resp => {
            App.storage.generalData = resp[0][1];
            App.storage.onGeneralData.dispatch(App.storage.generalData);
            console.log(`ok:${resp}`); // ['method', {data}]
        }, e => {
            console.log(`err:${e}`);
        });
    }
}

new App();