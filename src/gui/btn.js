import { App } from "../app";

export class Btn {
    constructor(width = 96, height = 96, label = ''){
        let bd = App.phaser.add.bitmapData(width, height);
        bd.draw('gui_game_btn',0, 0, width, height);

        let group = App.phaser.add.group();
        
        let sprite = group.create(0, 0, bd);
        sprite.inputEnabled = true;
		sprite.input.useHandCursor = true;

        this.label = App.phaser.add.text(8, 6, label, { font: "24px Arial", fill: "#000000", align: "center" }, group);
        this.graph = group;
    }
}