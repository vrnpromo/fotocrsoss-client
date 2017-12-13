import { App } from "../app";
import {AssetService} from './../utils/assetService';
import { SelectLevelBtn } from "../gui/selectLevelBtn";
import { Btn } from "../gui/btn";
import { StagesList } from "../gui/stagesList";
import { ImgBtn } from "../gui/imgBtn";
import { MoneyBtn } from "../gui/moneyBtn";

export default function() {
	return{
		preload:()=>{
			
		},
		create:()=>{
			App.phaser.add.sprite(0, 0, 'bg');

			let stages = new StagesList();
			
			stages.graph.x = 70;
			stages.graph.y = 200;

			stages.fill(App.storage.generalData);
			App.storage.onGeneralData.addOnce((data)=> stages.fill(data));


			let saleBtn = new ImgBtn('btn_action_normal','btn_action_over');
			saleBtn.graph.x = 10;
			saleBtn.graph.y = 10;

			let faqBtn = new ImgBtn('btn_help_normal','btn_help_over');
			faqBtn.graph.x = 568;
			faqBtn.graph.y = 10;

			let sndBtn = new ImgBtn('btn_sound_on_normal','btn_sound_on_over');
			sndBtn.graph.x = 704;
			sndBtn.graph.y = 10;

			let moneyBtn = new MoneyBtn();
			moneyBtn.graph.x = 280;
			moneyBtn.graph.y = 6;
		},
		update:()=>{},
		render:()=>{}
	}
}