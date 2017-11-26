import App from '././../app';
import FadeOunIn from './../effects/fadeOutIn';

export default class Word{
    constructor(text, direction = 0){
        this.text = text;
        this.direction = direction; // 0 - horizontal, 1 - vertical
        this.graph = null;
    }

    render(){
        let cont = App.phaser.add.group();      
        let length = this.text.length - 1;

        for(let i = 0; i < this.text.length; i++){
            let letter = App.factory.letter((this.direction==0 ? 0 : i) * 32, (this.direction == 1 ? 0 : i) * 32, this.text[i]);
            letter.wordId = i+1;

            cont.add(letter.graph);
        }

        this.graph = cont;
        return cont;
    }
}