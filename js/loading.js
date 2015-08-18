
// Variables para controlar la entrada por teclado
var keyboard;


loading = {
	preload: function(){

	game.load.image('end', 'assets/pics/end.png');
	game.load.image('initmenu', 'assets/pics/initmenu.png');
	game.load.image('lose', 'assets/pics/lose.png');
	game.load.image('win', 'assets/pics/win.png');
	game.load.image('pause', 'assets/pics/pause.png');

	// Cargar ambiente del nivel 1
	game.load.image('level1-ground', 'assets/pics/level1/ground.png');
	game.load.image('level1-footwall', 'assets/pics/level1/footwall.png');
	game.load.image('level1-upperwall', 'assets/pics/level1/upperwall.png');
	game.load.image('level1-lateralwall', 'assets/pics/level1/lateralwall.png');
	game.load.image('level1-lateralwall2', 'assets/pics/level1/lateralwall2.png');


	// Cargar ambiente del nivel 2
	game.load.image('level2-ground', 'assets/pics/level2/ground.png');
	//game.load.image('level2-footwall', 'assets/pics/level2/footwall.png');
	//game.load.image('level2-upperwall', 'assets/pics/level2/upperwall.png');
	//game.load.image('level2-lateralwall', 'assets/pics/level2/lateralwall.png');
	//game.load.image('level2-lateralwall2', 'assets/pics/level2/lateralwall2.png');

	// Cargar ambiente del nivel 3
	game.load.image('level3-ground', 'assets/pics/level3/ground.png');
	game.load.image('level3-footwall', 'assets/pics/level3/footwall.png');
	game.load.image('level3-upperwall', 'assets/pics/level3/upperwall.png');
	game.load.image('level3-lateralwall', 'assets/pics/level3/lateralwall.png');
	game.load.image('level3-lateralwall2', 'assets/pics/level3/lateralwall2.png');

	// Cargar ambiente del nivel 4
	game.load.image('level4-ground', 'assets/pics/level4/ground.png');

	// Cargar el ambiente del nivel 5
	game.load.image('level5-ground', 'assets/pics/level5/ground.png');
	game.load.image('level5-footwall', 'assets/pics/level5/footwall.png');
	game.load.image('level5-upperwall', 'assets/pics/level5/upperwall.png');
	game.load.image('level5-lateralwall', 'assets/pics/level5/lateralwall.png');
	game.load.image('level5-lateralwall2', 'assets/pics/level5/lateralwall2.png');	

	game.load.spritesheet('fire', 'assets/pics/fire.png', 32, 32);
	game.load.image('pedestal', 'assets/pics/pedestal.png');

	// La imagen del jugador
	game.load.spritesheet('player', 'assets/pics/player.png', 70, 70);

	// Barra de salud del jugador
	game.load.image('healthbar', 'assets/pics/healthbar.png');
	game.load.spritesheet('heart', 'assets/pics/heart.png', 14, 16);

	// Los items del juego
	game.load.spritesheet('redorb', 'assets/pics/redorb.png', 24, 32);

	// La serpiente principal
	game.load.spritesheet('snake', 'assets/pics/snake.png', 50, 50);

	// El ataque del jugador
	game.load.spritesheet('attack','assets/pics/attackzone.png', 30, 30);
	},

	
	create: function(){
		addKeyboard();

		game.state.start('initMenu');
	}
}