import { App } from "../app";
import { SelectLevelBtn } from "./selectLevelBtn";
import { HorizontalListController } from "./controllers/horizontalListController";
import { ImgBtn } from "./imgBtn";

let mask = null;
let controller = null;

export class StagesList{
    constructor(){
        this.graph = App.phaser.add.group();

        this.stages = App.phaser.add.group();
        mask = App.phaser.add.graphics(0, 0);
        this.stages.mask = mask;
        this.graph.add(this.stages);
        this.graph.add(mask);

        let prev = new ImgBtn('btn_list_category_normal','btn_list_category_over');
        let next = new ImgBtn('btn_list_category_normal','btn_list_category_over');
        next.graph.scale.x = -1;
        
        prev.graph.y = 60;
        next.graph.y = 60;

        this.graph.add(prev.graph);
        this.graph.add(next.graph);

        mask.inputEnabled = false;
        controller = new HorizontalListController(3, this.stages, prev, next);
    }

	fill(data) {
		if(!data)
			return;

        this.stages.removeAll();
        this.stages.x = 0;
        this.stages.y = 0;

        let selectLevel;
		data['stage_stat'].forEach( (stage, i) => {
			selectLevel = new SelectLevelBtn(stage.description);

			selectLevel.stageId = stage.id;
			selectLevel.missionId = (data['mission_stat'].find(m => m.stage_stat_id == stage.id) || {}).id;
			selectLevel.setProgress(0, data['mission_stat'].filter(m => m.stage_stat_id == stage.id).length);

			selectLevel.graph.x = i * (selectLevel.width + 8);
			selectLevel.graph.y = 0;
			
			this.stages.add(selectLevel.graph);

			selectLevel.graph.onChildInputDown.add((target)=>{
				App.storage.stageId = target.parent.data.instance.stageId;
				App.storage.missionId = target.parent.data.instance.missionId;
				console.log(App.storage.stageId, App.storage.missionId);
				App.phaser.state.start('game');}
			);
		});

		mask.beginFill(0xffffff);
        mask.drawRect(0, 0, 3 * (selectLevel.width + 8), selectLevel.height);
        mask.x = this.stages.x;
        mask.y = this.stages.y;
        controller.update();
	}
}