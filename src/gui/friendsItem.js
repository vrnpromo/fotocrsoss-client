import { ImgBtn } from "./imgBtn";
import { App } from "../app";

export class FriendItem {
    constructor(isEmpty = false) {
        let group = App.phaser.add.group();
        //group.inputEnableChildren = true;

        // let graphics = App.phaser.add.graphics(0, 0);
        // graphics.beginFill(0xFFFFFF, 1);
        // graphics.lineStyle(2, 0xCDCDCD, 1);
        // graphics.drawRect(0, 0, width, height);
        // graphics.endFill();
        // group.add(graphics);
        

        if (isEmpty) {
            let btn = new ImgBtn('btn_invite_friends2_normal', 'btn_invite_friends2_over');
            btn.graph.x = 0;
            btn.graph.y = 0;
            btn.graph.inputEnabled = true;
            btn.graph.input.useHandCursor = true;

            group.add(btn.graph);
        }else{
            let imgData = App.assetService.get('img_friend_element_back');
            group.create(0, 0, imgData.atlas, imgData.key);
        }
        //this.lvlMissionCount = App.phaser.add.text(0, 140, '0 / 40', { font: "24px Arial", fill: "#000000", align: "center" }, group);
        //this.lvlMissionCount.x = (this.width >> 1) - (this.lvlMissionCount.width>>1);

        group.data = { instance: this };
        this.graph = group;
    }
}