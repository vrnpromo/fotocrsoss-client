import { App } from "../../app";

export class HorizontalListController{
    constructor(pageSize, listGroup, btnPrev, btnNext, position = 0){
        this.position = position;
        this.pageSize = pageSize;
        this.size = 0;

        this.listGroup = listGroup;
        this.btnPrev = btnPrev.graph;
        this.btnNext = btnNext.graph;

        btnPrev.callback = this.prev.bind(this);
        btnNext.callback = this.next.bind(this);

        this.update();
    }

    update(){
        this.size = this.listGroup.children.length;

        if(this.size > this.pageSize){
            this.btnNext.x = this.listGroup.x + this.listGroup.mask.width - this.btnNext.width + 4;
            this.btnPrev.x = this.listGroup.x - this.btnPrev.width - 10;
            this.btnNext.visible = true;
            this.btnPrev.visible = true;
        }else{
            this.btnNext.visible = false;
            this.btnPrev.visible = false;
        }
    }

    next(){
        if(this.position + this.pageSize < this.size){
            ++this.position;

            App.phaser.add.tween(this.listGroup).to( { x: this.listGroup.mask.x - (this.listGroup.mask.width/this.pageSize)*this.position }, 200, Phaser.Easing.Linear.None, true);
        }
    }

    prev(){
        if(this.position > 0){
            --this.position;
            App.phaser.add.tween(this.listGroup).to( { x: this.listGroup.mask.x - (this.listGroup.mask.width/this.pageSize)*this.position }, 200, Phaser.Easing.Linear.None, true);
        }
    }
}