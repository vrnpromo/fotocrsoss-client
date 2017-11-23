export default function(phaser) {
	return{
		preload:()=>{
			phaser.load.image('bg', './data/Background.png');//t2
						
			//gui
			phaser.load.image('gui_game_btn', './data/ButtonsNormal.png');
			phaser.load.image('gui_game_btn_over', './data/ButtonsOver.png');
		},
		create:()=>{
			phaser.add.sprite(0, 0, 'bg');

			let style = { font: "24px Arial", fill: "#000000", align: "center" };
			//let btn = phaser.add.button(phaser.world.centerX - 95, phaser.world.centerY, 'gui_game_btn', ()=>{phaser.state.start('game');}, this);
			let group = phaser.add.group();
			group.inputEnableChildren = true;

			group.create(0,0, 'gui_game_btn');
			let label = phaser.add.text(12, 12, "Start", style, group);

			group.onChildInputDown.add(()=>{phaser.state.start('game');});

			group.x = phaser.world.centerX - 46;
			group.y = phaser.world.centerY - 46;
			// var button = game.make.button(game.world.centerX - 95, 400, 'button', removeGroup, this, 2, 1, 0);

		  //   button.onInputOver.add(over, this);
		  //   button.onInputOut.add(out, this);

		  	phaser.state.start('game'); // for test
		},
		update:()=>{},
		render:()=>{}
	}
}