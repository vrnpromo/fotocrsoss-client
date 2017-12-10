import {App} from './../app';
import { ImgBtn } from './imgBtn';

export class SelectLevelBtn{
    constructor(lvlDescription){
        this.width = 200;
        this.height = 240;

        let group = App.phaser.add.group();
        group.inputEnableChildren = true;

        // let graphics = App.phaser.add.graphics(0, 0);
        // graphics.beginFill(0xFFFFFF, 1);
        // graphics.lineStyle(2, 0xCDCDCD, 1);
        // graphics.drawRect(0, 0, width, height);
        // graphics.endFill();
        // group.add(graphics);
        let imgData = App.assetService.get('img_category_back');
        group.create(0, 0, imgData.atlas, imgData.key);

        let btn = new ImgBtn('btn_play_normal', 'btn_play_over');
        btn.graph.x = 8;
        btn.graph.y = this.height - 60;     

        group.add(btn.graph);

        this.lvlMissionCount = App.phaser.add.text(0, 140, '0 / 40', { font: "24px Arial", fill: "#000000", align: "center" }, group);
        this.lvlMissionCount.x = (this.width >> 1) - (this.lvlMissionCount.width>>1);

        group.data = {instance: this};
        this.graph = group;
        this.stageId = null;
        this.missionId = 0;
    }

    setProgress(current, all){
        this.lvlMissionCount.setText(`${current}/${all}`);
        this.lvlMissionCount.x = (this.width >> 1) - (this.lvlMissionCount.width>>1);
    }
}