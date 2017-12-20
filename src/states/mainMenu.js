import { App } from "../app";
import {AssetService} from './../utils/assetService';
import { SelectLevelBtn } from "../gui/selectLevelBtn";
import { Btn } from "../gui/btn";
import { StagesList } from "../gui/stagesList";
import { ImgBtn } from "../gui/imgBtn";
import { MoneyBtn } from "../gui/moneyBtn";
import { GameFaq } from "../fotoCross/gameFaq";

export default function() {
	return{
		preload:()=>{
			
		},
		create:()=>{
			App.phaser.add.sprite(0, 0, 'bg');

			let stages = new StagesList();
			
			stages.graph.x = 70;
			stages.graph.y = 200;

			// App.storage.onGeneralData.addOnce((data)=> {
			// 	updateGUI();
			// });

			let saleBtn = new ImgBtn('btn_action_normal','btn_action_over');
			saleBtn.graph.x = 12;
			saleBtn.graph.y = 8;

			let faqBtn = new ImgBtn('btn_help_normal','btn_help_over');
			faqBtn.graph.x = 568;
			faqBtn.graph.y = 8;

			faqBtn.callback = ()=>{
				let faq = new GameFaq();
				faq.onClose = ()=>{
					faq.graph.destroy();
					faq = null;
				}
			}

			let sndBtn = new ImgBtn('btn_sound_on_normal','btn_sound_on_over');
			sndBtn.graph.x = 704;
			sndBtn.graph.y = 8;

			let moneyBtn = new MoneyBtn();
			moneyBtn.graph.x = 292;
			moneyBtn.graph.y = 6;

			function updateGUI(){
				stages.fill(App.storage.generalData);
				moneyBtn.setMoney(App.storage.userData ? App.storage.userData.user.money1:'0');
			}

			updateGUI();
		},
		update:()=>{},
		render:()=>{}
	}
}