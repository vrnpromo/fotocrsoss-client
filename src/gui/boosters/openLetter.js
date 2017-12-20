import { App } from "../../app";

function getFrameName(state = 'normal'){
    return `btn_buy_booster_${state}`;
}

export class OpenLetter {
    constructor(callback = null){
        let imgData = App.assetService.get(getFrameName('normal'));
        let sprite = App.phaser.add.sprite(0, 0, imgData.atlas, imgData.key);
		sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        
        sprite.events.onInputOver.add(()=>{
            sprite.frameName = App.assetService.get(getFrameName('over')).key;
        });

        sprite.events.onInputOut.add(()=>{
            sprite.frameName = App.assetService.get(getFrameName('normal')).key;
        });

        sprite.events.onInputDown.add(()=>{
            if(this.callback)
                this.callback();
        });
        
        this.data = {instance: this};
        this.graph = sprite;
        this.callback = callback;

        // group.onChildInputDown.add((target)=>{
        //     if(callback)
        //         callback();
        // });
    }
}