
function preload() {
	// Cargar ambiente
	game.load.image('ground', 'assets/pics/ground.png');
	game.load.image('footwall', 'assets/pics/footwall.png');
	game.load.image('upperwall', 'assets/pics/upperwall.png');
	game.load.image('lateralwall', 'assets/pics/lateralwall.png');
	game.load.image('lateralwall2', 'assets/pics/lateralwall2.png');
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
}