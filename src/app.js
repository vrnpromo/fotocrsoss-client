import mainMenuState from './states/mainMenu.js'
import gameState from './states/game.js'
import Net from './net/Net'
import { AssetService } from './utils/AssetService';

class App{
    constructor(){
        App.phaser = new Phaser.Game(760, 650, Phaser.CANVAS, 'game', { 
            preload: preload, 
            create: create 
        });
    }
}

function preload(){
    App.net = new Net();
    App.storage = {onGeneralData: new Phaser.Signal()};
    App.assetService = new AssetService();
}

function create(){
    App.phaser.state.add('mainMenu', mainMenuState());
    App.phaser.state.add('game', gameState());
    
    App.phaser.state.start('mainMenu');
    
    App.net.getGeneralData( resp => {
        App.storage.generalData = resp[0][1];
        App.storage.onGeneralData.dispatch(App.storage.generalData);
        console.log(`ok:${resp}`); // ['method', {data}]
    }, e => {
        console.log(`err:${e}`);
    });
}

export {App};

new App();