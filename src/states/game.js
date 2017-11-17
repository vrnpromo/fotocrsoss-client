export default function gameState(phaser) {
	let data = {}

	function drawRect(x,y, color='#ff0000'){
		var bmd = phaser.add.bitmapData(32, 32);

	    // draw to the canvas context like normal
	    bmd.ctx.beginPath();
	    bmd.ctx.rect(0,0,32,32);
	    bmd.ctx.fillStyle = color;
	    bmd.ctx.fill();

	    // use the bitmap data as the texture for the sprite
	    var sprite = phaser.add.sprite(x*32, y*32, bmd);
	}

	return {
		preload: function (){
			phaser.load.xml('level', './data/levels/901.xml', false);

		},
		create: function(){
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

			phaser.load.onLoadComplete.add(()=>{
				var s = phaser.add.sprite(80, 0, 'pic1');

				s.x = 500;
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
