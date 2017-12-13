import {App} from './../app';

let instance = null;

export class AssetService{
    constructor(){
        if(instance)
            return instance;

        instance = this;
        
        App.phaser.load.image('bg', './data/Background.png');//t2
        App.phaser.load.image('bg_fot', './data/BackgroundFot.png');
        App.phaser.load.image('letter_empty', './data/Letter8x8.png');
        App.phaser.load.image('letter_over', './data/Letter8x8selected.png');
        App.phaser.load.image('letter_block', './data/Letter8x8blocked.png');

        App.phaser.load.atlasXML('assets', './data/sprites.png', './data/sprites.xml');

        return instance;
    }

    get(name){
        return {atlas:'assets', key: `${name}.png`};
    }
}