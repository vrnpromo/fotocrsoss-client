import { ImgBtn } from "./imgBtn";
import { App } from "../app";

export class FriendItem {
    constructor(data = null) {
        let group = App.phaser.add.group();

        if (data) {
            this.fid = data.id;

            let imgData = App.assetService.get('img_friend_element_back');
            let bg = App.phaser.add.image(0, 0, imgData.atlas, imgData.key);
            group.add(bg);

            this.name = App.phaser.add.text(0, 78, data.nickname ? data.nickname : `${data.first_name} ${data.last_name}`, { font: "18px Arial", fill: "#000000", align: "center" }, group);
            if (this.name.width > bg.width)
                this.name.width = bg.width - 4;
            this.name.x = (bg.width >> 1) - (this.name.width >> 1);

            let onComplete = function(){
                let img = App.phaser.add.image(0, 0, `social_friend_${this.fid}`);
                img.x = (bg.width >> 1) - (img.width >> 1);
                img.y = (bg.height >> 1) - (img.height >> 1);
                group.add(img);
            }; 
    
            App.phaser.load.image(`social_friend_${data.id}`, data.img);
            App.phaser.load.onLoadComplete.addOnce(onComplete.bind(this), this);
            App.phaser.load.start();

        } else {
            let btn = new ImgBtn('btn_invite_friends2_normal', 'btn_invite_friends2_over');
            btn.graph.x = 0;
            btn.graph.y = 0;
            btn.graph.inputEnabled = true;
            btn.graph.input.useHandCursor = true;

            group.add(btn.graph);
        }

        group.data = { instance: this };
        this.graph = group;
    }
}