import Letter from './letter'
import Word from './word'
import LetterPalette from './letterPalette'
import CluePhoto from './cluePhoto'

export default class GOFactory{
	constructor(phaser){
		this.phaser = phaser;
	}
	
	letter(x, y, label){
		let letter = new Letter(label);
		let l = letter.render(this.phaser);
		
		l.x = x;
		l.y = y;
		
		return letter;
	}

	letterPalette(x, y, columnNum, rowNum){
		let lp = new LetterPalette(columnNum, rowNum);
		let graph = lp.render(this.phaser);

		graph.x = x;
		graph.y = y;
	}
	
	photo(x, y){
		let cp = new CluePhoto();
		cp.render(this.phaser);

		cp.graph.x = x;
		cp.graph.y = y;

		return cp;
	}
	
	crossword(words){
		let cont = this.phaser.add.group();

		words.forEach(word => {
			let w = new Word(word.text, word.direction);
			cont.add(w.render(this.phaser));

			w.graph.x = word.pos.x * 32;
			w.graph.y = word.pos.y * 32;
		});

		return cont;
	}
}