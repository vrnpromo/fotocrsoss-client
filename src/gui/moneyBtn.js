import { App } from "../app";
import { ImgBtn } from "./imgBtn";

export class MoneyBtn {
    constructor() {
        this.graph = App.phaser.add.group();

        let imgData = App.assetService.get('img_money_back');
        this.graph.create(0, 0, imgData.atlas, imgData.key);

        this.label = App.phaser.add.text(54, 14, App.storage.userData ? App.storage.userData.user.money1 : '0', { font: "24px Arial", fill: "#000000", align: "center" }, this.graph);
        this.label.x = 54 + 30 - (this.label.width >> 1);

        let addMoney = new ImgBtn('btn_add_money_normal', 'btn_add_money_over');
        this.graph.add(addMoney.graph);

        addMoney.graph.x = 130;
        addMoney.graph.y = 10;
    }

    setMoney(value) {
        this.label.setText(value);
        this.label.x = 54 + 30 - (this.label.width >> 1);
    }
}