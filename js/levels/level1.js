

// Los objetos del juego
var red_orb;
var player;
//var attack;

var gui;
var level;

var snakeHeads = [];
// fna bfask
var text;
var texta;


level1 = {
	create: function() {

		// Se dá el tamaño del nivel
		game.world.setBounds(0, 0, 1200, 1000);
		// Se habilita la física del juego
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// el Fondo
		level = game.add.sprite(0, 0, 'ground');

		level.walls = game.add.group();
		level.fires = game.add.group();

		// Funciones que se llaman al instanciar un Level
		this.addFires();
		this.addWalls();
		
		// Pueden existir varios orbes al mismo tiempo
		red_orb = addOrb();
		// El jugador
		addPlayer();


	text = game.add.text(20, 20, 'inicio', { fontSize: '32px', fill: '#000'});
	text.fixedToCamera = true;
	texta = game.add.text(20, 60, 'inicio', { fontSize: '32px', fill: '#000'});
	texta.fixedToCamera = true;

		// Se agrega la primer serpiente
		snakeHeads[0] = addSnakeSegment('');
		snakeHeads[0].addSegment();

		snakeHeads[1] = addSnakeSegment('');
		snakeHeads[1].addSegment();


		// Las interfaces del juego
		gui = new GUI();
		gui.updateHealthBar(player.health);

		game.camera.follow(player); // La camara del juego seguirá al jugador

	text.text = "cargando...";
	},



	update: function(){

		// Las colisiones del juego
		game.physics.arcade.collide(player, level.walls);
		for(var i=0; i<snakeHeads.length; i++){
			this.collideSnake(snakeHeads[i]);
		}

		// Solapamientos entre objetos
		if(	game.physics.arcade.overlap(player, red_orb) )	{
			player.collectOrbPlayer(red_orb);
			setAllTargetsSnake();
		}
		// Si alguna de las serpientes atrapan algún orbe
		for(var i=0; i<snakeHeads.length; i++){ 
			if( game.physics.arcade.overlap(snakeHeads[i], red_orb) ){
				snakeHeads[i].collectOrbSnake(red_orb);
			}
		}



		player.updatePlayer();
		for(var i=0; i<snakeHeads.length; i++) {
			snakeHeads[i].updateSnake();
		}


	},

	// Pequeñas animaciones de fuego sobre el muro superior
	addFires: function(){
		var fire;
		var pedestal;
		for (var i=0; i<3; i++){
			pedestal = level.fires.create(324 + i*284, 74, 'pedestal');
			fire = level.fires.create(321 + i*284, 49, 'fire');
			fire.animations.add('fire', [0, 1], 10, true);
			fire.animations.play('fire');
		}
	},

	// Se edicionan los muros al juego
	addWalls: function(){	
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
	},


	collideSnake: function(segment){
		game.physics.arcade.collide(segment, level.walls);

		// No se debe permitir que el serpiente infrinja daño a un jugador que no puede moverse
		if(player.canMove)
			game.physics.arcade.collide(segment, player, this.snakeHitsPlayer);
			
		// Cuando el ataque impacta a un segmento de serpiente	
		if(player.is_attacking)
			if( game.physics.arcade.overlap(segment, player.attack) )
				segment.destroySegment();


		if(segment.next != ''){
			this.collideSnake(segment.next);
		}
	},


	snakeHitsPlayer: function(segment, player){
		player.hitPlayer(segment);
		if(player.health <=0)
			game.state.start('lose');
	},


	render: function(){
		if(snakeHeads[0])
			texta.text = snakeHeads[0].target 
					+ '\n X: ' + snakeHeads[0].target_x
					+ '\n Y: ' + snakeHeads[0].target_y ;

		
	}

}