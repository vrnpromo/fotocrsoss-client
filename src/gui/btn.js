import { App } from "../app";

export class Btn {
    constructor(width = 96, height = 96, label = '', callback = null){
        let bd = App.phaser.add.bitmapData(width, height);
        bd.draw('gui_game_btn',0, 0, width, height);

        let group = App.phaser.add.group();
        
        let sprite = group.create(0, 0, bd);
        sprite.inputEnabled = true;
		sprite.input.useHandCursor = true;

        this.label = App.phaser.add.text(0, 0, label, { font: "24px Arial", fill: "#000000", align: "center", wordWrap: true }, group);
        //this.label.width = width;
        this.label.lineSpacing = -10;
        this.label.x = (width>>1) - (this.label.width>>1);
        this.label.y = (height>>1) - (this.label.height>>1);
        

        this.graph = group;

        group.onChildInputDown.add((target)=>{
            if(callback)
                callback();
        });
    }
}