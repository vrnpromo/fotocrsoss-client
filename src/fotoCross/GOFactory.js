import {letter} from './../letters/letter.js'

export default class GOFactory{
	constructor(phaser){
		this.phaser = phaser;
	}

	letter(x, y, label){
		let letter = new Letter(label);
		let l = letter.render();

		l.x = x;
		l.y = y;

		return l;
	}

	photo(){
		return phaser.add.sprite();
	}

	crossword(){
		return phaser.add.sprite();
	}
}