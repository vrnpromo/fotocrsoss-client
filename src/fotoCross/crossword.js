import {App} from './../app'
import Word from './word'

export default class Crossword{
    constructor(){
        this.map = [];
        this.graph = null;
    }

    render(words){
        let cont = App.phaser.add.group();
        let x, y;

        words.forEach(word => {
            let w = new Word(word.text, word.direction);
            w.id = word.id;

            cont.add(w.render(this.phaser));
            w.graph.x = word.pos.x * w.lw;
            w.graph.y = word.pos.y * w.lh;


            for(let i=0; i< word.text.length; i++){
                x = word.pos.x + i * word.direction;
                y = word.pos.y + i*(!word.direction);

                if(!this.map[x])
                    this.map[x] = [];

                if(this.map[x][y])
                    this.map[x][y].push(w.graph.children[i]);
                else
                    this.map[x][y] = [w.graph.children[i]];
            }
        });

        words.forEach(word => {
            x = word.pos.x;
            y = word.pos.y;
            this.map[x][y].forEach(letter => {
                let ids = words.filter(w=>{return w.pos.x === x && w.pos.y === y}).map(w => w.id);
                letter.data.instance.setPrefix(ids.join('\\'));
            });
        });

        cont.data = {instance: this};
        this.graph = cont;
        return cont;
    }

    fillWords(idArr) {
        let words = this.graph.children;

        words.forEach(word => {
            let wordId = word.data.instance.id;

            if (idArr.indexOf(wordId) >= 0) {
                let selectedWord = word.data.instance;

                for(let i=0; i< selectedWord.text.length; i++){
                    let cross = this.map[selectedWord.graph.x / selectedWord.lw + i*selectedWord.direction][selectedWord.graph.y / selectedWord.lh + i*(!selectedWord.direction)];

                    cross.forEach(letter => {
                        let word = letter.parent.data.instance;
                        let charId = letter.data.instance.id;
                        let char = word.text[charId];

                        word.fillAt(charId, char);
                        letter.data.instance.setState('block');
                        word.textArr[charId] = char;
                    });
                }
                selectedWord.setState('block');
            }
        });
    }
}