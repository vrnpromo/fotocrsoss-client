import { App } from "../app";
import { ImgBtn } from "../gui/imgBtn";
import axios from 'axios';

export class GameFaq {
    constructor(word) {
        let graphics = App.phaser.add.graphics(0, 0);
        graphics.beginFill(0x000000, 0.2);
        graphics.drawRect(0, 0, App.phaser.world.width, App.phaser.world.height);
        graphics.endFill();

        let group = App.phaser.add.group();
        group.inputEnableChildren = true;
        group.add(graphics);

        let bg = group.create(0,0, 'tut_bg');
        bg.x = (App.phaser.world.width >> 1) - (bg.width >> 1);
        bg.y = (App.phaser.world.height >> 1) - (bg.height >> 1);

        let prev = new ImgBtn('btn_list_category_normal', 'btn_list_category_over');
        let next = new ImgBtn('btn_list_category_normal', 'btn_list_category_over');
        next.graph.scale.x = -1;

        let closeBtn = new ImgBtn('btn_exit_game_normal', 'btn_exit_game_over', () => {
            if (this.onClose)
                this.onClose();
        });

        prev.graph.visible = false;
        next.graph.visible = false;
        closeBtn.graph.visible = false;

        group.add(prev.graph);
        group.add(next.graph);
        group.add(closeBtn.graph);

        let render = function () {
            let current = 0;
            let img = group.create(0, 0, imgs[current]);

            img.x = (App.phaser.world.width >> 1) - (img.width >> 1);
            img.y = (App.phaser.world.height >> 1) - (img.height >> 1);

            if(imgs.length>1){
                prev.graph.x = img.x - prev.graph.width - 4;
                prev.graph.y = img.y + (img.height >> 1) - (prev.graph.height >> 1);
                prev.callback = ()=>{
                    if(current - 1 >= 0)
                        img.loadTexture(imgs[--current]);
                }

                next.graph.x = img.x + img.width + prev.graph.width + 4;
                next.graph.y = img.y + (img.height >> 1) - (prev.graph.height >> 1);
                next.callback = ()=>{
                    if(current + 1 < imgs.length)
                        img.loadTexture(imgs[++current]);
                }

                prev.graph.visible = true;
                next.graph.visible = true;
            }

            closeBtn.graph.x = img.x + (img.width >> 1) - (closeBtn.graph.width >> 1);
            closeBtn.graph.y = img.y + img.height + 4;            
            closeBtn.graph.visible = true;
        }

        let imgs = [];
        var json = App.phaser.cache.getJSON('tutorial');
        
        if (App.phaser.cache.checkImageKey('tutorial_0')) {
            json.imgs.forEach((img, i) => {
                imgs.push(`tutorial_${i}`);
            });

            render();
        } else {
            App.phaser.load.onLoadComplete.addOnce(() => {
                render();
            }, this);

            json.imgs.forEach((img, i) => {
                App.phaser.load.image(`tutorial_${i}`, './data/tutorial/' + img);
                imgs.push(`tutorial_${i}`);
            });

            App.phaser.load.start();
        }

        this.graph = group;
    }
}