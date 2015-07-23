



function create() {
	// Se dá el tamaño del mundo del juego
	game.world.setBounds(0, 0, 1200, 1000);
	// Se habilita la física del juego
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// el Fondo
	game.add.sprite(0, 0, 'ground');
	addWalls();
	// El fuego de fondo
	addFires();
	// El jugador
	addPlayer();
	

	// El orbe rojo
	//addOrb();
	p_orb = new Orb();
	

	// Se agrega la primer serpiente
	addSnake();

	// Se inicializa la variable time_init_attack, que indica cuando inicia un ataque por parte del
	// jugador
	time_init_attack = game.time.time;

	// se requiren dos variables para saber si el jugador está atacando y su dirección


	// El teclado para procesar la entrada
	keyboard = game.input.keyboard;
	// La camara del juego seguirá al jugador
	game.camera.follow(player);



	text = game.add.text(20, 20, 'inicio', { fontSize: '32px', fill: '#000'});
	text.fixedToCamera = true;
}

// Pequeñas animaciones de fuego sobre el muro superior
function addFires(){
	fires = game.add.group();

	for (var i=0; i<3; i++){
		pedestal = fires.create(324 + i*284, 74, 'pedestal');
		fire = fires.create(321 + i*284, 49, 'fire');
		fire.animations.add('fire', [0, 1], 10, true);
		fire.animations.play('fire');
	}
}

// Se edicionan los muros al juego
function addWalls(){
	walls = game.add.group();
	walls.enableBody = true;

	wall = walls.create(0, 950, 'footwall');
	wall.body.immovable = true;
	wall = walls.create(0, 0, 'upperwall');
	wall.body.immovable = true;
	wall.body.setSize(1200, 85, 0, 0);
	wall = walls.create(0, 0, 'lateralwall');
	wall.body.immovable = true;
	wall = walls.create(1140, 0, 'lateralwall2');
	wall.body.immovable = true;
}






