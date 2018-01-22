import {App} from './../app'
import FadeOunIn from './../effects/fadeOutIn';
import { Btn } from '../gui/btn';
import { WrongAnswer, RightAswer } from '../gui/message';
import { DataLoader } from '../net/DataLoader';
import { ImgBtn } from '../gui/imgBtn';
import { MoneyBtn } from '../gui/moneyBtn';
import { GameFaq } from '../fotoCross/gameFaq';
import { Booster } from '../gui/boosters/booster';

let crossword;
let cluePhoto;
let letterPalette;
let selectedWord = null;

let wordsCount;
let data = {};


function crosswordSolved(){
	backToMenu();
}

function backToMenu(){
	App.phaser.state.start('mainMenu');
}

function renderBoosters(){
	let cont = App.phaser.add.group();

	let openLetter = new Booster('type0');
	cont.add(openLetter.graph);

	let removeLetter = new Booster('type1');
	removeLetter.graph.x = openLetter.graph.width + 8;
	cont.add(removeLetter.graph);

	let askFriend = new Booster('type2');
	askFriend.graph.x = removeLetter.graph.x + removeLetter.graph.width + 8;
	cont.add(askFriend.graph);

	cont.x = 750-304;
	cont.y = 70 + 304 + 14;
}

function renderCrossword(parsedLevel){
	crossword = App.factory.crossword(parsedLevel);
	let cw = crossword.graph;
	cw.x = 16;
	cw.y = 70;
	//add mouseDown event handler (phaser way)
	cw.children.forEach(wordGr => {
		wordGr.children.forEach(letterGr =>{
			letterGr.onChildInputDown.add((s,l) => {
				let targetWord = s.parent.parent.data.instance;

				if(selectedWord==targetWord){
					let letter = s.parent.data.instance;

					if(letter.label.length == 0 || letter.state == 'block')
						return;

					selectedWord.fillAt(letter.id, '');
					letter._palette.show();

					return;
				}

				if(selectedWord){
					selectedWord.free();
				}
				
				selectedWord = targetWord;
				selectedWord.setState('over');
				cw.bringToTop(selectedWord.graph);
				letterPalette.generate(selectedWord.text);
				console.log(selectedWord.text);

				FadeOunIn(App.phaser, cluePhoto.photo, () => cluePhoto.setPhoto('pic'+selectedWord.id));
			});
		});
	});
}

function renderLetterPalette(){
	letterPalette = App.factory.letterPalette(164, 650 - 142, 8, 2);
	let rightAswer;
	let wrongAnswer;

	letterPalette.graph.children.forEach(letter => {
		letter.onChildInputDown.add((s,l) => {
			let nextLetter = selectedWord.fill(letter.data.instance.label, letter.data.instance);
			if(nextLetter){
				let cross = crossword.map[(nextLetter.graph.parent.x + nextLetter.graph.x) / selectedWord.lw][(nextLetter.graph.parent.y + nextLetter.graph.y) / selectedWord.lh];
				//console.log(cross);

				letter.data.instance.hide();
			}

			if(selectedWord.isFilled() && nextLetter){
				if(selectedWord.isCorrect()){
					selectedWord.setState('block');

					for(let i=0; i< selectedWord.text.length; i++){
						let cross = crossword.map[selectedWord.graph.x / selectedWord.lw + i*selectedWord.direction][selectedWord.graph.y / selectedWord.lh + i*(!selectedWord.direction)];
						let orig = cross.find(letter => {return letter.parent.data.instance.id == selectedWord.id});

						cross.forEach(letter => {
							if(letter.parent.data.instance.id!=selectedWord.id){
								letter.parent.data.instance.fillAt(letter.data.instance.id, orig.data.instance.label);
								letter.data.instance.setState('block');
							}
						})
					}

					if(!rightAswer) {
						rightAswer = new RightAswer(selectedWord.text);
						rightAswer.graph.x = 0;
						rightAswer.graph.y = 0;

						setTimeout(() => {
							rightAswer.graph.destroy();
							rightAswer = null;

							--wordsCount;
							if(wordsCount == 0){
								crosswordSolved();
							}
						}, 2000);
					}
				}else{
					if(!wrongAnswer){
						wrongAnswer = new WrongAnswer();
						wrongAnswer.graph.graph.x = 286;
						wrongAnswer.graph.graph.y = 465;

						wrongAnswer.graph.callback = ()=>{ 
							wrongAnswer.graph.graph.destroy(); 
							wrongAnswer = null;
						};
					}
				}
			}					
		});
	});
}

function renderGUI(){
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

	let backBtn = new ImgBtn('btn_exit_game_normal','btn_exit_game_over', backToMenu);
	backBtn.graph.x = 10;
	backBtn.graph.y = 600;
}

function parseLevel(){
	var xml = App.phaser.cache.getXML('level');
	
	let parsedLevel = [];
	let count = 0;
	xml.querySelectorAll('crossword>word').forEach((word, i) => {
		//console.log(word);
		let w = {
			id: i+1,
			img: word.querySelector('image1').textContent,
			text: word.querySelector('word').textContent,
			pos: {
				x: parseInt(word.querySelector('xp1').textContent),
				y: parseInt(word.querySelector('yp1').textContent),
				x2: parseInt(word.querySelector('xp2').textContent),
				y2: parseInt(word.querySelector('yp2').textContent)
			}
		}

		w.direction = (w.pos.x == w.pos.x2 ? 0 : 1); // 0 - vertical, 1 - horizontal
		
		parsedLevel.push(w);
		App.phaser.load.image('pic'+(++count), `${DataLoader.SERVER_IMGS_URL}/${w.img}`);
	});

	return parsedLevel;
}

export default function gameState() {	
	return {
		preload: function () {	
			App.phaser.add.sprite(0, 0, 'bg');	
			//gui
			//phaser.load.image('gui_game_btn', './data/ButtonsNormal.png');
			let mission_stat = App.storage.generalData['mission_stat'].find( m => m.id == App.storage.missionId);
			//${mission_stat.path}
			//App.phaser.load.xml('level', './data/levels/901.xml', false);
			App.phaser.load.xml('level', `${DataLoader.SERVER_LEVELS_URL}/${mission_stat.path}`, false);
		},
		create: function(){			
			cluePhoto = App.factory.photo(750 - 304, 70);		
			
			renderBoosters();
						
			let parsedLevel = parseLevel();

			wordsCount = parsedLevel.length;

			renderCrossword(parsedLevel);

			renderLetterPalette();

			App.phaser.load.onLoadComplete.addOnce(()=> {
				selectedWord = crossword.graph.children[0].data.instance;
				selectedWord.setState('over');
				crossword.graph.bringToTop(selectedWord.graph);
				letterPalette.generate(selectedWord.text);
				cluePhoto.setPhoto('pic'+selectedWord.id);

				console.log(selectedWord.text);
			}, this);
			
			renderGUI();
			
			App.phaser.load.start();
		},
		update: function(){

		},
		render: function(){

		}
	}
}
