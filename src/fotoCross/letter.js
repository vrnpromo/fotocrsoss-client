import App from './../app'

export default class Letter{
	constructor(label) {
		this.label = label; // string
		this.state = 'default';
		
		this.graph = null // pointer to phaser.group
		this._label = null // pointer to phaser.text
	}
	
	set text(val) {
		this.label = val.toUpperCase();
		this._label.setText(this.label);
	}
	
	render(asset = 'letter_empty') {
		let bmp =  App.phaser.add.bitmapData(32, 32);
		bmp.draw(asset, 0, 0, 32, 32);
		
		let style = { font: "24px Arial", fill: "#000000", align: "center" };
		//let btn = phaser.add.button(phaser.world.centerX - 95, phaser.world.centerY, 'gui_game_btn', ()=>{phaser.state.start('game');}, this);
		let group = App.phaser.add.group();
		group.inputEnableChildren = true;
		let sprite = group.create(0, 0, bmp);
		sprite.input.useHandCursor = true;
		
		this._label =  App.phaser.add.text(7, 3, this.label, style, group);
		this.graph = group;
		
		group.data = {instance: this};
		this._label.inputEnabled = false;
		
		return group; //48
	}

	setState(state){
		let key;

		switch(state){
			case 'default': key='letter_empty'; break;
			case 'over': key='letter_over'; break;
			case 'block': key='letter_block'; break;
		}

		let bmd = App.phaser.add.bitmapData(32, 32);
		bmd.draw(key, 0, 0, 32, 32);
		this.graph.children[0].setTexture(bmd.texture);
	}
}