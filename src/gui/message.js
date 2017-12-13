import { App } from "../app";
import { ImgBtn } from "./imgBtn";

export class WrongAnswer{
    constructor(){        
        this.graph = new ImgBtn('btn_word_wrong_normal','btn_word_wrong_over');
    }
}

export class RightAswer{
    constructor(word){
        let graphics = App.phaser.add.graphics(0, 0);
        graphics.beginFill(0x000000, 0.2);
        graphics.drawRect(0, 0, App.phaser.world.width, App.phaser.world.height);
        graphics.endFill();

        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(2, 0xCDCDCD, 1);
        graphics.drawRect((App.phaser.world.width >> 1) - 300*0.5, (App.phaser.world.height >> 1) - 400*0.5, 300, 400);
        graphics.endFill();

        let group = App.phaser.add.group();
        group.inputEnableChildren = true;

        group.add(graphics);
        let title = App.phaser.add.text(0, 0, 'Слово разгадано!', { font: "24px Arial", fill: "#000000", align: "center" }, group);
        let answer = App.phaser.add.text(0, 0, word.toUpperCase(), { font: "24px Arial", fill: "#000000", align: "center" }, group);
        //this.label.width = width;
        title.x = (App.phaser.world.width>>1) - (title.width>>1);
        title.y = (App.phaser.world.height >> 1) - 400*0.5 + 32;
        
        answer.x = (App.phaser.world.width>>1) - (answer.width>>1);
        answer.y = (App.phaser.world.height>>1) - (answer.height>>1);
        
        this.graph = group;
    }
}

