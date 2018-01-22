import {App} from './../app';

let instance = null;

export class AssetService{
    constructor(){
        if(instance)
            return instance;

        instance = this;
        
        App.phaser.load.image('bg', './data/Background.png');//t3
        App.phaser.load.image('bg_fot', './data/BackgroundFot.png');
        App.phaser.load.image('letter_empty', './data/Letter8x8.png');
        App.phaser.load.image('letter_over', './data/Letter8x8selected.png');
        App.phaser.load.image('letter_block', './data/Letter8x8blocked.png');
        
        App.phaser.load.image('tut_ok_normal', './data/tutorial/btn_ok_normal.png');
        App.phaser.load.image('tut_ok_over', './data/tutorial/btn_ok_over.png');
        App.phaser.load.image('tut_bg', './data/tutorial/bg.png');
        
        App.phaser.load.atlasXML('assets', './data/sprites.png', './data/sprites.xml');
        App.phaser.load.json('gdata', './data/gdata.json');

        return instance;
    }

    get(name){
        return {atlas:'assets', key: `${name}.png`};
    }

    // json with helpfull info (boosters names, tutorial imgs, etc.)
    getJson(){
       return App.phaser.cache.getJSON('gdata'); 
    }
}