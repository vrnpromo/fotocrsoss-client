import App from './../app'
import Word from './word'

export default class Crossword{
    constructor(){
        this.map = [];
        this.graph = null;
    }

    render(words){
        let cont = App.phaser.add.group();
        
        words.forEach(word => {
            let w = new Word(word.text, word.direction);
            cont.add(w.render(this.phaser));

            w.id = word.id;
            w.graph.x = word.pos.x * 32;
            w.graph.y = word.pos.y * 32;

            for(let i=0; i< word.text.length; i++){
                if(!this.map[word.pos.x + i * word.direction])
                    this.map[word.pos.x + i * word.direction] = [];

                if(this.map[word.pos.x + i * word.direction][word.pos.y + i*(!word.direction)])
                    this.map[word.pos.x + i * word.direction][word.pos.y + i*(!word.direction)].push(w.graph.children[i]);
                else
                    this.map[word.pos.x + i * word.direction][word.pos.y + i*(!word.direction)] = [w.graph.children[i]];
            }
        });

        cont.data = {instance: this};
        this.graph = cont;
        return cont;
    }
}