// Se especifica el tamaño de ventana de 800x600
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.global = {
	level : 5,
	is_playing : false
}

game.state.add('loading', loading, true);

game.state.add('lose', lose);
game.state.add('win', win);

game.state.add('initMenu', initMenu);
game.state.add('level1', level1);
game.state.add('level2', level2);
game.state.add('level3', level3);
game.state.add('level4', level4);
game.state.add('level5', level5);

game.state.add('end', end);
