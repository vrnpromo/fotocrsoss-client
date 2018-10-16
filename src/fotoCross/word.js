import {App} from '././../app';
import FadeOunIn from './../effects/fadeOutIn';

export default class Word{
    constructor(text, direction = 0){
        this.id = null;
        this.graph = null;

        this.text = text; // actual word
        this.textArr = []; // guess word
        this.direction = direction; // 0 - vertical, 1 - horizontal

        this.lw = 34; // letter width
        this.lh = 34; // letter height
    }

    render(){
        let cont = App.phaser.add.group();
        let length = this.text.length - 1;

        for(let i = 0; i < this.text.length; i++){
            let letter = App.factory.letter((this.direction==0 ? 0 : i) * this.lw, (this.direction == 1 ? 0 : i) * this.lh);//this.text[i]
            letter.id = i;
            cont.add(letter.graph);
            this.textArr.push('');
        }

        cont.data = {instance: this};
        this.graph = cont;
        return cont;
    }

    fill(letter, letterFromPalette){
        let nextLetter = null;
        let index;

        this.graph.children.some((letter, i) => {
            if(letter.data.instance.label.length == 0){
                nextLetter = letter.data.instance;
                index = i;
            }

            return nextLetter != null;
        });

        if(nextLetter){
            nextLetter.text = letter;
            nextLetter._palette = letterFromPalette;
            this.textArr[index] = letter;

            return nextLetter;
        }

        return false;
    }

    fillAt(index, letter){
        this.graph.children[index].data.instance.text = letter;
        this.textArr[index] = letter;
    }

    free(){
        this.graph.children.forEach(letter => {
            let ld = letter.data.instance;
            ld.setState('default');
            this.fillAt(ld.id, '');
        });
    }

    isFilled(){
        return this.textArr.join('').length === this.text.length;
    }

    isCorrect(){
        return this.text === this.textArr.join('');
    }

    setState(state){
        this.graph.children.forEach(letter => {
            letter.data.instance.setState(state);
        });
    }
}