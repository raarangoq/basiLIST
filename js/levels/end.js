var image;

end = {
	create: function(){
		image = game.add.sprite(0, 0, 'end');
		game.global.level++;
		game.global.is_playing = false;
	},

	update: function(){
		if(keyboard.enterKey()){
			game.global.level = 1;
			game.global.is_playing = true;
			game.state.start('level' + game.global.level);
		}
	}
}