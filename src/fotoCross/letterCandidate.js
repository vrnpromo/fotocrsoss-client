import { App } from './../app'
import { ImgBtn } from '../gui/imgBtn';

export class LetterCandidate {
    constructor(label = '') {
        this.label = label; // string

        this.id = null;
        this.graph = null // pointer to phaser.group
        this._palette = null;
        this._label = null // pointer to phaser.text
    }

    set text(val) {
        this.label = val.toUpperCase();
        this._label.setText(this.label);
    }

    render() {
        let style = { font: "28px Arial", fill: "#000000", align: "center" };
        let group = App.phaser.add.group();

        let bg = new ImgBtn('letter_candidate_normal', 'letter_candidate_over');
        group.add(bg.graph);

        this._label = App.phaser.add.text(14, 8, this.label, style, group);
        this.graph = group;

        group.data = { instance: this };
        this._label.inputEnabled = false;

        return group;
    }

    hide() {
        this.graph.visible = false;
    }

    show() {
        this.graph.visible = true;
    }
}