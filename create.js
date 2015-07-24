



function create() {

	level = new Level();

	// El jugador
	player = new Player();
	// El orbe rojo
	red_orb = new Orb();
	// Las interfaces del jugador
	gui = new GUI();
	

	// Se agrega la primer serpiente
	addSnake();

	// El teclado para procesar la entrada
	keyboard = game.input.keyboard;	// La camara del juego seguirá al jugador
	addKeyProperties(keyboard);

	game.camera.follow(player.gameObject);



	text = game.add.text(20, 20, 'inicio', { fontSize: '32px', fill: '#000'});
	text.fixedToCamera = true;
}








