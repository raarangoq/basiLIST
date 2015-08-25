

// Los objetos del juego
var red_orb;
var player;
//var attack;

var gui;
var level;

var snakeHeads = [];


var winImage;
var win = false;


var sound_backgroud;
var sound_snake;

levels = {
	create: function() {
		win = false;

		// Se dá el tamaño del nivel
		game.world.setBounds(0, 0, 1200, 1000);
		// Se habilita la física del juego
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// el Fondo
		level = game.add.sprite(0, 0, 'level' + game.global.level + '-ground');

		// El nivel 5 tiene caida libre por los lados, se usa un colider para saber si el jugador aún toca el suelo
		if(game.global.level == 5){
			game.physics.enable(level, Phaser.Physics.ARCADE);
			level.body.colliderWorldBounds = true;
			level.body.setSize(1035, 870, 86, 83); 
		}


		level.walls = game.add.group();
		level.fires = game.add.group();

		// Funciones que se llaman al instanciar un Level
		this.addFires();
		this.addWalls();
		
		// Pueden existir varios orbes al mismo tiempo
		red_orb = addOrb();
		// El jugador
		addPlayer();

		// Se agrega la primer serpiente
		snakeHeads = [];
		this.addSnakes();
		

		// Las interfaces del juego
		gui = new GUI();
		gui.updateHealthBar(player.health);

		game.camera.follow(player); // La camara del juego seguirá al jugador

		winImage = game.add.sprite(0, 0, 'win');
		winImage.fixedToCamera = true;
		winImage.visible = false;

		if(game.global.level < 5)
			sound_backgroud = game.add.audio('levelA', 0.5, true);
		else
			sound_backgroud = game.add.audio('levelB', 0.5, true);


		sound_backgroud.play();

		sound_snake = game.add.audio('roar');

	},



	update: function(){

		if(win == true){
			player.body.velocity.setTo(0, 0);
			if( keyboard.enterKey() )
				this.nextLevel();
			else
				return;
		}

		// Las colisiones del juego
		game.physics.arcade.collide(player, level.walls);
		game.physics.arcade.collide(player, level.fires);
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

		// Si el jugador cae en el nivel 5, pierde el juego
		if(game.global.level == 5)
			if( !game.physics.arcade.overlap(level, player) ){
				sound_backgroud.destroy();
				//Phaser.Sound.remove('environment');
				game.state.start('lose');
			}

	},

	// Pequeñas animaciones de fuego sobre el muro superior
	addFires: function(){
		level.fires.enableBody = true;

		var fire;
		var pedestal;
		for (var i=0; i<3; i++){
			pedestal = level.fires.create(324 + i*284, 74, 'pedestal');
			game.physics.enable(pedestal, Phaser.Physics.ARCADE);
			pedestal.body.colliderWorldBounds = true;
			//pedestal.body.setSize(1035, 870, 86, 83); 
			pedestal.body.immovable = true;
			fire = level.fires.create(321 + i*284, 49, 'fire');
			fire.body.immovable = true;
			fire.animations.add('fire', [0, 1], 10, true);
			fire.animations.play('fire');
		}

	},

	addSnakes: function(){
		for(var i=0; i<game.global.level; i++){
			snakeHeads[i] = addSnakeSegment('');
			snakeHeads[i].addSegment();
			snakeHeads[i].addSegment();
			snakeHeads[i].addSegment();
			snakeHeads[i].addSegment();
			snakeHeads[i].addSegment();
		}
	},

	// Se edicionan los muros al juego
	addWalls: function(){	
		// El ultimo piso no tiene muros (caida libre a los lados)
		if(game.global.level == 5)
			return;
		level.walls.enableBody = true;

		var wall = level.walls.create(0, 950, 'level1-footwall');
		wall.body.immovable = true;
		wall = level.walls.create(0, 0, 'level1-upperwall');
		wall.body.immovable = true;
		wall.body.setSize(1200, 85, 0, 0);
		wall = level.walls.create(0, 0, 'level1-lateralwall');
		wall.body.immovable = true;
		wall = level.walls.create(1140, 0, 'level1-lateralwall2');
		wall.body.immovable = true;
	},


	collideSnake: function(segment){
		game.physics.arcade.collide(segment, level.walls);

		// No se debe permitir que el serpiente infrinja daño a un jugador que no puede moverse
		if(player.canMove)
			game.physics.arcade.collide(segment, player, this.snakeHitsPlayer);
		
			
		// Cuando el ataque impacta a un segmento de serpiente	
		if(player.is_attacking)
			if( game.physics.arcade.overlap(segment, player.attack) ){
				sound_snake.play();
				segment.destroySegment();

				if(snakeHeads.length <= 0)
					this.winLevel();
			}


		if(segment.next != ''){
			this.collideSnake(segment.next);
		}
	},

	nextLevel: function(){
		sound_backgroud.destroy();

		if(game.global.level < 5)
			game.state.start('win');
		else 
			game.state.start('end');
	},


	snakeHitsPlayer: function(segment, player){
		player.hitPlayer(segment);
		if(player.health <=0){
			sound_backgroud.destroy();
			game.state.start('lose');
		}
	},


	render: function(){

		
	},

	winLevel: function(){
		player.body.velocity.setTo(0, 0);
		win = true;
		winImage.visible = true;

	}

}