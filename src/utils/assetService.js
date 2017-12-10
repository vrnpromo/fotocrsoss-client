import {App} from './../app';

let instance = null;

export class AssetService{
    constructor(){
        if(instance)
            return instance;

        instance = this;
        App.phaser.load.atlasXML('assets', './data/sprites.png', './data/sprites.xml');

        return instance;
    }

    get(name){
        return {atlas:'assets', key: `${name}.png`};
    }
}