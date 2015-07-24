
function Level(){
	// Se dá el tamaño del mundo del juego
	game.world.setBounds(0, 0, 1200, 1000);
	// Se habilita la física del juego
	game.physics.startSystem(Phaser.Physics.ARCADE);
	// el Fondo
	this.gameObject = game.add.sprite(0, 0, 'ground');

	
	this.walls = game.add.group();
	this.fires = game.add.group();

	// Funciones que se llaman al instanciar un Level
	addFires(this);
	addWalls(this);
}

// Pequeñas animaciones de fuego sobre el muro superior
function addFires(level){
	var fire;
	for (var i=0; i<3; i++){
		pedestal = level.fires.create(324 + i*284, 74, 'pedestal');
		fire = level.fires.create(321 + i*284, 49, 'fire');
		fire.animations.add('fire', [0, 1], 10, true);
		fire.animations.play('fire');
	}
}

// Se edicionan los muros al juego
function addWalls(level){	
	level.walls.enableBody = true;

	var wall = level.walls.create(0, 950, 'footwall');
	wall.body.immovable = true;
	wall = level.walls.create(0, 0, 'upperwall');
	wall.body.immovable = true;
	wall.body.setSize(1200, 85, 0, 0);
	wall = level.walls.create(0, 0, 'lateralwall');
	wall.body.immovable = true;
	wall = level.walls.create(1140, 0, 'lateralwall2');
	wall.body.immovable = true;
}
