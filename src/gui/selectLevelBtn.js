import {App} from './../app'

export class SelectLevelBtn{
    constructor(lvlDescription){
        let width = 410;
        let height = 106;

        let group = App.phaser.add.group();
        group.inputEnableChildren = true;

        let graphics = App.phaser.add.graphics(0, 0);
        graphics.beginFill(0xFFFFFF, 1);
        graphics.lineStyle(2, 0xCDCDCD, 1);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();

        let btn = App.phaser.add.group();

        btn.create(0, 0, 'gui_game_btn');
        let label = App.phaser.add.text(12, 12, "Играть", { font: "24px Arial", fill: "#000000", align: "center" }, btn);

        btn.x = width - 100;
        btn.y = 4;     

        group.add(graphics);
        group.add(btn);

        this.lvlDescription = App.phaser.add.text(12, 12, lvlDescription, { font: "24px Arial", fill: "#000000", align: "center" }, group);
        this.lvlMissionCount = App.phaser.add.text(width - 160, 12, '0 / 40', { font: "24px Arial", fill: "#000000", align: "center" }, group);

        group.data = {instance: this};
        this.graph = group;
        this.stageId = null;
        this.missionId = 0;
    }

    setProgress(current, all){
        this.lvlMissionCount.setText(`${current}/${all}`);
    }
}