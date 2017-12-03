import { App } from '../app';
import Letter from './letter'
import Word from './word'
import Crossword from './crossword'
import LetterPalette from './letterPalette'
import CluePhoto from './cluePhoto'

export default class GOFactory{
	constructor(){
		this.phaser = App.phaser;
	}
	
	letter(x, y, label = ''){
		let letter = new Letter(label);
		let l = letter.render();
		
		l.x = x;
		l.y = y;
		
		return letter;
	}

	letterPalette(x, y, columnNum, rowNum){
		let lp = new LetterPalette(columnNum, rowNum);
		let graph = lp.render(this.phaser);

		graph.x = x;
		graph.y = y;

		return lp;
	}
	
	photo(x, y){
		let cp = new CluePhoto();
		cp.render();

		cp.graph.x = x;
		cp.graph.y = y;

		return cp;
	}
	
	crossword(words){
		let crossword = new Crossword();
		crossword.render(words);

		return crossword;
	}
}