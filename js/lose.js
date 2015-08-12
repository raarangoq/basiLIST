var image;

lose = {
	create: function(){
		image = game.add.sprite(0, 0, 'lose');
	},

	update: function(){
		if(keyboard.enterKey()){
			game.state.start('level1');
		}
	}
}