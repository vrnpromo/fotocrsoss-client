import { App } from "../app";
import { ImgBtn } from "./imgBtn";

export class MoneyBtn{
    constructor(){
        this.graph = App.phaser.add.group();

        let imgData = App.assetService.get('img_money_back');
        this.graph.create(0,0, imgData.atlas, imgData.key);

        let addMoney = new ImgBtn('btn_add_money_normal','btn_add_money_over');
        this.graph.add(addMoney.graph);

        addMoney.graph.x = 130;
        addMoney.graph.y = 10;
    }

}