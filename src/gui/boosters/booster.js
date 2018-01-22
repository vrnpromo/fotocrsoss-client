import { App } from "../../app";

function getFrameName(state = 'normal'){
    return `btn_buy_booster_${state}`;
}

export class Booster {
    constructor(callback = null){
        this.id = 'type0';
        
        let group = App.phaser.add.group();

        let imgData = App.assetService.get(getFrameName('normal'));
        let sprite = App.phaser.add.sprite(0, 0, imgData.atlas, imgData.key);
		sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        group.add(sprite);

        let booster_set_stat = App.storage.generalData.shop_booster_set_stat.find(b => b.id == App.storage.generalData.shop_booster_stat[0].id);
        let booster_stat = App.storage.generalData.booster_stat.find(b => b.id == booster_set_stat.type);
        //let json = App.storage.generalData.shop_booster_set_stat.find(b => b.id == App.storage.generalData.shop_booster_stat[0].id) ;
        this.label = App.phaser.add.text(4, 4, booster_stat.name, { font: "14px Arial", fill: "#000000", align: "center", wordWrap: true }, group);
        this.priceOrCount = App.phaser.add.text(34, 40, '0', { font: "18px Arial", fill: "#000000", align: "center", wordWrap: true }, group);
        
        this.label.lineSpacing = -6;

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
        this.graph = group;
        this.callback = callback;

        // group.onChildInputDown.add((target)=>{
        //     if(callback)
        //         callback();
        // });
    }
}