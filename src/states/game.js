import {App} from './../app'
import GOFactory from './../fotoCross/GOFactory';
import FadeOunIn from './../effects/fadeOutIn';
import { Btn } from '../gui/btn';
import { WrongAnswer, RightAswer } from '../gui/message';

export default function gameState() {
	let selectedWord = null;

	let data = {};

	let factory = new GOFactory(App.phaser);
	App.factory = factory;
	
	return {
		preload: function () {
			//phaser.load.image('bg', './data/Background.png');//t2
			App.phaser.load.image('bg_fot', './data/BackgroundFot.png');
			App.phaser.load.image('letter_empty', './data/Letter8x8.png');
			App.phaser.load.image('letter_over', './data/Letter8x8selected.png');
			App.phaser.load.image('letter_block', './data/Letter8x8blocked.png');
			//gui
			//phaser.load.image('gui_game_btn', './data/ButtonsNormal.png');
			let mission_stat = App.storage.generalData['mission_stat'].find( m => m.id == App.storage.missionId);
			//${mission_stat.path}
			//App.phaser.load.xml('level', './data/levels/901.xml', false);
			App.phaser.load.xml("level","lvl/001.xml", false)
			
		},
		create: function(){
			App.phaser.add.sprite(0, 0, 'bg');
			
			let cluePhoto = factory.photo(750 - 304, 70);		
			
			let btnCont = App.phaser.add.group();
			btnCont.create(0,0, 'gui_game_btn');
			btnCont.create(96 + 12, 0, 'gui_game_btn');
			btnCont.create((96 + 12)*2, 0, 'gui_game_btn');
			btnCont.create((96 + 12)*3, 0, 'gui_game_btn');
			btnCont.x = 750-304;
			btnCont.y = 70 + 304 + 14;
			btnCont.scale.setTo(0.72, 0.72);
						
			//this.pet.loadTexture('pet_black_hat');
			// var button = game.make.button(game.world.centerX - 95, 400, 'button', removeGroup, this, 2, 1, 0);
			
			//   button.onInputOver.add(over, this);
			//   button.onInputOut.add(out, this);
			
			// item.events.onInputDown.add(select);
			//    	item.events.onInputUp.add(release);
			//    	item.events.onInputOut.add(moveOff);
			
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
				App.phaser.load.image('pic'+(++count), `./img/${w.img}`);
			});

			let cw = factory.crossword(parsedLevel);
			let crossword = cw.graph;
			crossword.x = 16;
			crossword.y = 70;
			//add mouseDown event handler (phaser way)
			crossword.children.forEach(wordGr => {
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
						crossword.bringToTop(selectedWord.graph);
						letterPalette.generate(selectedWord.text);
						console.log(selectedWord.text);

						FadeOunIn(App.phaser, cluePhoto.photo, () => cluePhoto.setPhoto('pic'+selectedWord.id));
					});
				});
			});

			let letterPalette = factory.letterPalette(150, 650 - 140, 10, 2);

			letterPalette.graph.children.forEach(letter => {
				letter.onChildInputDown.add((s,l) => {
					let nextLetter = selectedWord.fill(letter.data.instance.label, letter.data.instance);
					if(nextLetter){
						let cross = cw.map[(nextLetter.graph.parent.x + nextLetter.graph.x) / 32][(nextLetter.graph.parent.y + nextLetter.graph.y) / 32];
						//console.log(cross);

						letter.data.instance.hide();
					}

					if(selectedWord.isFilled() && nextLetter){
						if(selectedWord.isCorrect()){
							selectedWord.setState('block');

							for(let i=0; i< selectedWord.text.length; i++){
								let cross = cw.map[selectedWord.graph.x / 32 + i*selectedWord.direction][selectedWord.graph.y / 32 + i*(!selectedWord.direction)];
								let orig = cross.find(letter => {return letter.parent.data.instance.id == selectedWord.id});

								cross.forEach(letter => {
									if(letter.parent.data.instance.id!=selectedWord.id){
										letter.parent.data.instance.fillAt(letter.data.instance.id, orig.data.instance.label);
										letter.data.instance.setState('block');
									}
								})
							}

							let m = new RightAswer(selectedWord.text);
							m.graph.x = 0;
							m.graph.y = 0;
							setTimeout(()=>{m.graph.destroy();m = null;}, 1000);
						}else{
							let m = new WrongAnswer();
							m.graph.x = 200;
							m.graph.y = 460;

							setTimeout(()=>{m.graph.destroy();m = null;}, 1000);
						}
					}					
				});
			});

			App.phaser.load.onLoadComplete.addOnce(()=> {
				selectedWord = crossword.children[0].data.instance;
				selectedWord.setState('over');
				crossword.bringToTop(selectedWord.graph);
				letterPalette.generate(selectedWord.text);
				cluePhoto.setPhoto('pic'+selectedWord.id);

				console.log(selectedWord.text);
			}, this);
			
			let saleBtn = new Btn(120, 60, 'Акция', ()=>{});
			saleBtn.graph.x = 4;
			saleBtn.graph.y = 4;

			let backBtn = new Btn(100, 40, 'В меню', ()=>{App.phaser.state.start('mainMenu');});
			backBtn.graph.x = 4;
			backBtn.graph.y = 600;

			App.phaser.load.start();
		},
		update: function(){

		},
		render: function(){

		}
	}
}
