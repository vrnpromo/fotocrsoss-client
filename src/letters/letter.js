export default{
	create: function(phaser, x, y, label, asset = 'letter_empty') {
		let bmp = phaser.add.bitmapData(32, 32);
		bmp.draw(asset, 0, 0, 32, 32);
	 //    // draw to the canvas context like normal
	 //    bmd.ctx.beginPath();
	 //    bmd.ctx.rect(0,0,32,32);
	 //    bmd.ctx.fillStyle = color;
	 //    bmd.ctx.fill();

	    // use the bitmap data as the texture for the sprite
	    let style = { font: "24px Arial", fill: "#000000", align: "center" };
		//let btn = phaser.add.button(phaser.world.centerX - 95, phaser.world.centerY, 'gui_game_btn', ()=>{phaser.state.start('game');}, this);
		let group = phaser.add.group();
		//group.inputEnableChildren = true;
		group.create(0, 0, bmp);
	    phaser.add.text(7, 3, label, style, group);

	    group.x = x;
	    group.y = y;

	    return group; //48
	}
}