export default function gameState(phaser) {
	let data = {}

	function drawRect(x,y, color='#ff0000'){
		var bmp = phaser.add.bitmapData(32, 32);
		bmp.draw('letter_empty', 0, 0, 32, 32);
	 //    // draw to the canvas context like normal
	 //    bmd.ctx.beginPath();
	 //    bmd.ctx.rect(0,0,32,32);
	 //    bmd.ctx.fillStyle = color;
	 //    bmd.ctx.fill();

	    // use the bitmap data as the texture for the sprite
	    var sprite = phaser.add.sprite(x*32, y*32, bmp); //48
	}

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

			let photoCont = phaser.add.group();
			photoCont.create(0,0, 'bg_fot');
			photoCont.x = 750-304;
			photoCont.y = 70;
			//phaser.add.sprite(750-304, 0, 'bg_fot'); //304


			let btnCont = phaser.add.group();
			btnCont.create(0,0, 'gui_game_btn');
			btnCont.create(96 + 12, 0, 'gui_game_btn');
			btnCont.create((96 + 12)*2, 0, 'gui_game_btn');
			btnCont.create((96 + 12)*3, 0, 'gui_game_btn');
			btnCont.x = 750-304;
			btnCont.y = 70 + 304 + 14;
			btnCont.scale.setTo(0.72, 0.72);

			let letterCont = phaser.add.group();
			letterCont.create(0,0, 'letter_empty');
			letterCont.create(48+4,0, 'letter_empty');
			letterCont.create((48+4)*2,0, 'letter_empty');
			letterCont.create((48+4)*3,0, 'letter_empty');
			letterCont.create((48+4)*4,0, 'letter_empty');
			letterCont.create((48+4)*5,0, 'letter_empty');
			letterCont.create((48+4)*6,0, 'letter_empty');
			letterCont.create((48+4)*7,0, 'letter_empty');
			letterCont.create((48+4)*8,0, 'letter_empty');
			letterCont.create((48+4)*9,0, 'letter_empty');
			letterCont.x = 150;
			letterCont.y = 650-110;

			//this.pet.loadTexture('pet_black_hat');
		 	// var button = game.make.button(game.world.centerX - 95, 400, 'button', removeGroup, this, 2, 1, 0);

		  //   button.onInputOver.add(over, this);
		  //   button.onInputOut.add(out, this);

		  	// item.events.onInputDown.add(select);
     //    	item.events.onInputUp.add(release);
     //    	item.events.onInputOut.add(moveOff);

			var xml = phaser.cache.getXML('level');

			let count=0;
			xml.querySelectorAll('crossword>word').forEach(word=>{
				console.log(word);
				let img = word.querySelector('image1').textContent;
				let label = word.querySelector('word').textContent;
				let pos = {
					x: parseInt(word.querySelector('xp1').textContent) + 1,
					y: parseInt(word.querySelector('yp1').textContent) + 1,
					x2: parseInt(word.querySelector('xp2').textContent) + 1,
					y2: parseInt(word.querySelector('yp2').textContent) + 1
				}

				if(img && label){
		    		//data[label] = 'pic'+(++count);
		    		phaser.load.image('pic'+(++count), `./data/imgs/${img}`);

		    		drawRect(pos.x, pos.y);
		    		drawRect(pos.x2, pos.y2, '#00ff00');

		    		let length = label.length-1;
		    		console.log(pos.x, pos.y, pos.x2, pos.y2, length)
		    		if(pos.x == pos.x2){

		    			while(--length)
		    				drawRect(pos.x, pos.y < pos.y2? pos.y+length : pos.y - length, '#aa0000')
		    		}else{
		    			while(--length)
		    				drawRect(pos.x < pos.x2? pos.x+length : pos.x - length, pos.y, '#aa0000')
		    		}
		    	}
		    })

			phaser.load.onLoadComplete.add(()=> {
				//var s = phaser.add.sprite(80, 0, 'pic1');
				let s = photoCont.create(0, 0, 'pic1');
				s.x = 4;
				s.y = 4;
				s.scale.setTo(0.98,0.98);
			}, this);

			phaser.load.start();

    		//s.rotation = 0.14;
    		//s.x=0;
    		//s.y=0
    	},
    	update: function(){

    	},
    	render: function(){
			//phaser.debug.text('BIBA BIBA BIBA', 360, 96, 'rgb(255,0,0)');
		}
	}
}
