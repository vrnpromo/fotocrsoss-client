import App from './../app'
import GOFactory from './../fotoCross/GOFactory';
import FadeOunIn from './../effects/fadeOutIn';

export default function gameState(phaser) {
	let data = {}
	let factory = new GOFactory(phaser);
	App.factory = factory;
	
	return {
		preload: function () {
			//phaser.load.image('bg', './data/Background.png');//t2
			phaser.load.image('bg_fot', './data/BackgroundFot.png');
			phaser.load.image('letter_empty', './data/Letter8x8.png');
			
			//gui
			//phaser.load.image('gui_game_btn', './data/ButtonsNormal.png');
			
			phaser.load.xml('level', './data/levels/901.xml', false);
			
		},
		create: function(){
			phaser.add.sprite(0, 0, 'bg');
			
			let cluePhoto = factory.photo(750 - 304, 70);		
			
			let btnCont = phaser.add.group();
			btnCont.create(0,0, 'gui_game_btn');
			btnCont.create(96 + 12, 0, 'gui_game_btn');
			btnCont.create((96 + 12)*2, 0, 'gui_game_btn');
			btnCont.create((96 + 12)*3, 0, 'gui_game_btn');
			btnCont.x = 750-304;
			btnCont.y = 70 + 304 + 14;
			btnCont.scale.setTo(0.72, 0.72);
			
			factory.letterPalette(150, 650 - 140, 10, 2);
			
			//this.pet.loadTexture('pet_black_hat');
			// var button = game.make.button(game.world.centerX - 95, 400, 'button', removeGroup, this, 2, 1, 0);
			
			//   button.onInputOver.add(over, this);
			//   button.onInputOut.add(out, this);
			
			// item.events.onInputDown.add(select);
			//    	item.events.onInputUp.add(release);
			//    	item.events.onInputOut.add(moveOff);
			
			var xml = phaser.cache.getXML('level');
			
			let parsedLevel = [];
			let count = 0;
			xml.querySelectorAll('crossword>word').forEach(word => {
				//console.log(word);
				let w = {
					img: word.querySelector('image1').textContent,
					text: word.querySelector('word').textContent,
					pos: {
						x: parseInt(word.querySelector('xp1').textContent),
						y: parseInt(word.querySelector('yp1').textContent),
						x2: parseInt(word.querySelector('xp2').textContent),
						y2: parseInt(word.querySelector('yp2').textContent)
					}
				}

				w.direction = (w.pos.x == w.pos.x2 ? 0 : 1); // 0 - horizontal, 1 - vertical
				
				parsedLevel.push(w);
				phaser.load.image('pic'+(++count), `./data/imgs/${w.img}`);
			});

			let crossword = factory.crossword(parsedLevel);
			crossword.x = crossword.y = 16;
			//add mouseDown event handler (phaser way)
			crossword.children.forEach(wordGr => {
				wordGr.children.forEach(letterGr =>{
					letterGr.onChildInputDown.add((s,l) => {
						FadeOunIn(App.phaser, cluePhoto.photo, () => cluePhoto.setPhoto('pic'+s.parent.data.instance.wordId));
					});
				});
			})

			phaser.load.onLoadComplete.add(()=> {
				//var s = phaser.add.sprite(80, 0, 'pic1');
				cluePhoto.setPhoto('pic1');
			}, this);
			
			phaser.load.start();
		},
		update: function(){
			
		},
		render: function(){
			//phaser.debug.text('BIBA BIBA BIBA', 360, 96, 'rgb(255,0,0)');
		}
	}
}
