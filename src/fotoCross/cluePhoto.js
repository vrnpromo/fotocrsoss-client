export default class CluePhoto{
    constructor(){
        this.graph = null
        this.photo = null // pointer to phaser.sprite
    }

    setPhoto(val){
        if(!this.photo){
            this.photo = this.graph.create(0, 0, val);

            this.photo.x = 4;
            this.photo.y = 4;
            this.photo.scale.setTo(0.98,0.98);
        }else{
            this.photo.loadTexture(val);
        }
    }

    render(phaser){
        this.graph = phaser.add.group();
        this.graph.create(0,0, 'bg_fot');

        return this.graph;
    }
}