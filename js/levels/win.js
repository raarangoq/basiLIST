var image;

win = {
	create: function(){
		image = game.add.sprite(0, 0, 'win');
		game.global.level++;
		game.global.is_playing = false;
	},

	update: function(){
		if(keyboard.enterKey()){
			game.global.is_playing = true;
			game.state.start('level' + game.global.level);
		}
	}
}