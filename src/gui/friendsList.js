import { HorizontalListController } from "./controllers/horizontalListController";
import { FriendItem } from "./friendsItem";
import { App } from "../app";
import { ImgBtn } from "./imgBtn";

let mask = null;
let controller = null;

export class FriendsList {
    constructor() {
        this.graph = App.phaser.add.group();
        this.size = 5;
        this.space = 8

        this.friends = App.phaser.add.group();
        mask = App.phaser.add.graphics(0, 0);
        this.friends.mask = mask;
        this.graph.add(this.friends);
        this.graph.add(mask);

        let prev = new ImgBtn('btn_list_friends_left_normal', 'btn_list_friends_left_over');
        let next = new ImgBtn('btn_list_friends_left_normal', 'btn_list_friends_left_over');
        let invite = new ImgBtn('btn_invite_friends_normal', 'btn_invite_friends_over');
        next.graph.scale.x = -1;
        invite.graph.x = 90;

        prev.graph.y = 60 + 25;
        next.graph.y = 60 + 25;
        invite.graph.y = 0;

        this.graph.add(prev.graph);
        this.graph.add(next.graph);
        this.graph.add(invite.graph);

        mask.inputEnabled = false;
        controller = new HorizontalListController(this.size, this.friends, prev, next);
        invite.callback = () => App.net.showInviteFriendsBox();
    }

    fill(data) {
        if (!data.count)
            data = {
                count: 0,
                items: []
            }

        this.friends.removeAll();
        this.friends.x = 0;
        this.friends.y = 60;

        data['items'].forEach((f, i) => {
            let fi = new FriendItem({
                nickname: f.nickname,
                first_name: f.first_name,
                last_name: f.last_name,
                img: f.photo_50
            });

            fi.graph.x = i * (fi.graph.width + this.space);
            fi.graph.y = 0;

            this.friends.add(fi.graph);
        });

        if (data.count < this.size) {
            let n = this.size - data.count;
            let last = this.friends.children[this.friends.children.length - 1];
            let sx = this.friends.children.length > 0 ? last.x + last.width + this.space: 0;
            //пустые ячейки для друзей, вывожу хотя бы 1 в конце.
            for (let i = 0; i < (n > 0 ? n : 1); i++) {
                let f = new FriendItem();

                f.graph.x = sx + i * (f.graph.width + this.space);
                f.graph.y = 0;

                this.friends.add(f.graph);

                f.graph.onChildInputDown.add((target) => {
                    App.net.showInviteFriendsBox();
                });
            }
        }

        mask.beginFill(0xffffff);
        mask.drawRect(0, 0, this.size * (this.friends.children[0].width + this.space), this.friends.children[0].height);
        mask.x = this.friends.x;
        mask.y = this.friends.y;
        controller.update();
    }
}