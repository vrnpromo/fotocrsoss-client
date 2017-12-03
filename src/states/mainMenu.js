import { App } from "../app";
import { SelectLevelBtn } from "../gui/selectLevelBtn";
import { Btn } from "../gui/btn";

export default function() {
	let stages;
	let mask;

	function updateStages(data) {
		if(!data)
			return;

		stages.removeAll();

		data['stage_stat'].forEach( (stage, i) => {
			let selectLevel = new SelectLevelBtn(stage.description);

			selectLevel.stageId = stage.id;
			selectLevel.missionId = (data['mission_stat'].find(m => m.stage_stat_id == stage.id) || {}).id;
			selectLevel.setProgress(0, data['mission_stat'].filter(m => m.stage_stat_id == stage.id).length);

			selectLevel.graph.x = 0;
			selectLevel.graph.y = i * 112;
			
			stages.add(selectLevel.graph);

			selectLevel.graph.onChildInputDown.add((target)=>{
				App.storage.stageId = target.parent.data.instance.stageId;
				App.storage.missionId = target.parent.data.instance.missionId;
				console.log(App.storage.stageId, App.storage.missionId);
				App.phaser.state.start('game');}
			);
		});

		stages.x = App.phaser.world.centerX - (stages.children[0].width>>1);
		stages.y = App.phaser.world.centerY - 200;

		mask.beginFill(0xffffff);
		mask.drawRect(stages.x, stages.y, stages.children[0].width, 3 * (stages.children[0].height+2));
	}

	return{
		preload:()=>{
			App.phaser.load.image('bg', './data/Background.png');//t2
						
			//gui
			App.phaser.load.image('gui_game_btn', './data/ButtonsNormal.png');
			App.phaser.load.image('gui_game_btn_over', './data/ButtonsOver.png');
		},
		create:()=>{
			App.phaser.add.sprite(0, 0, 'bg');

			stages = App.phaser.add.group();
			mask = App.phaser.add.graphics(0, 0);
			stages.mask = mask;

			updateStages(App.storage.generalData);
			App.storage.onGeneralData.addOnce(updateStages);


			let saleBtn = new Btn(120, 60, 'Акция', ()=>{});
			saleBtn.graph.x = 4;
			saleBtn.graph.y = 4;

			let faqBtn = new Btn(100, 50, 'Правила игры');
			faqBtn.graph.x = 134;
			faqBtn.graph.y = 6;

			let addBtn = new Btn(100, 50, 'Пригласить друзей');
			addBtn.graph.x = 244;
			addBtn.graph.y = 6;
			// var button = game.make.button(game.world.centerX - 95, 400, 'button', removeGroup, this, 2, 1, 0);

		  //   button.onInputOver.add(over, this);
		  //   button.onInputOut.add(out, this);

		  	//phaser.state.start('game'); // for test
		},
		update:()=>{},
		render:()=>{}
	}
}