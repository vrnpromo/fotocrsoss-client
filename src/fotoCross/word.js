import App from '././../app';
import FadeOunIn from './../effects/fadeOutIn';

export default class Word{
    constructor(text, direction = 0){
        this.id = null;
        this.graph = null;

        this.text = text;
        this.direction = direction; // 0 - vertical, 1 - horizontal
    }

    render(){
        let cont = App.phaser.add.group();      
        let length = this.text.length - 1;

        for(let i = 0; i < this.text.length; i++){
            let letter = App.factory.letter((this.direction==0 ? 0 : i) * 32, (this.direction == 1 ? 0 : i) * 32, this.text[i]);
            cont.add(letter.graph);
        }

        cont.data = {instance: this};
        this.graph = cont;
        return cont;
    }

    setState(state){
		this.graph.children.forEach(letter => {
            letter.data.instance.setState(state);
        })
	}
}