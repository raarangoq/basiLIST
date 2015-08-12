var image;

initMenu = {
	create: function(){
		image = game.add.sprite(0, 0, 'initmenu');
	},

	update: function(){
		if(keyboard.enterKey()){
			game.state.start('level1');
		}
	}
}