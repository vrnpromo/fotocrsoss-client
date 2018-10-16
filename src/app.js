import mainMenuState from './states/mainMenu.js'
import gameState from './states/game.js'
import Net from './net/Net'
import { AssetService } from './utils/AssetService';
import GOFactory from './fotoCross/GOFactory';

class App {
    constructor() {
        App.phaser = new Phaser.Game(760, 650, Phaser.CANVAS, 'game', {
            preload: preload,
            create: create
        });
    }
}

function preload() {
    App.net = new Net();
    App.storage = { onGeneralData: new Phaser.Signal() };
    App.assetService = new AssetService();
    App.factory = new GOFactory();
}

function create() {
    App.phaser.state.add('mainMenu', mainMenuState());
    App.phaser.state.add('game', gameState());

    //App.phaser.state.start('mainMenu');

    App.net.firstLoad(resp => {
        App.storage.generalData = resp.general[0][1];
        App.storage.userData = resp.user[0][1];
        App.storage.social = resp.social;
        //App.storage.onGeneralData.dispatch(App.storage.generalData);
        // дефолтные сохранения, если нет загруженных
        App.storage.storageData = {
            storage: {
                data: {
                    stages: {
                        '1': {
                            stageDynamicId: 0,
                            missionId: '1',
                            finishedWords: [1, 2, 3, 4, 5, 6],
                            selected: 7
                        }
                    }
                }
            }
        };
        console.log(App.storage);

        App.phaser.state.start('mainMenu');
    });

    // App.net.getGeneralData( resp => {
    //     App.storage.generalData = resp[0][1];
    //     App.storage.onGeneralData.dispatch(App.storage.generalData);
    //     console.log(`ok:${resp}`); // ['method', {data}]
    // }, e => {
    //     console.log(`err:${e}`);
    // });
}

export { App };

new App();