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
                let letter = new Letter(String.fromCharCode(Math.floor(Math.random() * 32) + 1072)).render(phaser);
                letter.x = j * (32+4);
                letter.y = i * (32+4);

                cont.add(letter);
            }
        
        this.graph = cont;
        return cont;
    }
}