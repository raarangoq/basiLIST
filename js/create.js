



function create() {

	addLevel();
	addKeyboard();
	// Pueden existir varios orbes al mismo tiempo
	red_orb = addOrb();


	// El jugador
	addPlayer();
	


	// Se agrega la primer serpiente
	addSnake();

	

	// Las interfaces del juego
	gui = new GUI();
	gui.updateHealthBar(player.health);


	game.camera.follow(player); // La camara del juego seguirá al jugador



	text = game.add.text(20, 20, 'inicio', { fontSize: '32px', fill: '#000'});
	text.fixedToCamera = true;
}








