import Letter from './letter'

export default class LetterPalette{
    constructor(columnNum, rowNum){
        this.columnNum = columnNum;
        this.rowNum = rowNum;

        this.graph = null;
    }

    render(phaser){
        let cont = phaser.add.group();

        for(let i=0; i < this.rowNum; i++)
            for(let j=0; j < this.columnNum; j++){
                let letter = new Letter(String.fromCharCode(Math.floor(Math.random() * 32) + 1072)).render();
                letter.x = j * (32+4);
                letter.y = i * (32+4);

                cont.add(letter);
            }
        
        cont.data = {instance: this};
        this.graph = cont;
        return cont;
    }

    generate(word){
        let wLength = word.length;
        let w = word.split('');
        let letters = [];

        for(let i=0; i<this.graph.children.length; i++)
            letters.push(i < wLength
                ? w.splice(Math.floor(Math.random()*w.length), 1)[0]
                : String.fromCharCode(Math.floor(Math.random() * 32) + 1072)
            );

        this.graph.children.forEach((letter, i) => {
            letter.data.instance.text = letters.splice(Math.floor(Math.random()*letters.length), 1)[0]; //shuffle
        })
    }
}