import { App } from "../app";

export class ImgBtn {
    constructor(frameNormal = '', frameOver = '', callback = null){
        //let group = App.phaser.add.group();
        //group.inputEnableChildren = true;

        let imgData = App.assetService.get(frameNormal);
        let sprite = App.phaser.add.sprite(0, 0, imgData.atlas, imgData.key);
		sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        
        sprite.events.onInputOver.add(()=>{
            sprite.frameName = App.assetService.get(frameOver).key;
        });

        sprite.events.onInputOut.add(()=>{
            sprite.frameName = App.assetService.get(frameNormal).key;
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