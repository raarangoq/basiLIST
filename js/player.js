
function addPlayer(){
	// El objeto player en si mismo es un objeto sprite
	player = game.add.sprite(100, 100, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.colliderWorldBounds = true;
	player.body.setSize(30, 34, 19, 17);   // Reajustar el collider del jugador, para que solo cubra el cuerpo

	// Atributos constantes
	player.SPEED_WALKING = 150;
	player.SPEED_ATTACKING = 50;
	player.MAX_HEALTH = 100;

	// Atributos variables
	player.direction = "";
	player.is_attacking = false;
	player.speed = 150;
	player.health = 50;
	player.time_init_attack = game.time.time;

	// Los metodos del jugador
	player.attack = attack;
	player.collectOrb = collectOrb;
	player.movePlayer = movePlayer;
	player.playAnimations = playAnimations;
	player.toAttack = toAttack;
	player.updatePlayer = updatePlayer;


	// Se agregan las animaciones del jugador al instanciar uno
	addPlayerAnimations(player);
}

// Cada una de las animaciones del jugador, no se agrega al objeto player debido a que esta función solo se ejecuta al crear un player
function addPlayerAnimations(gameObject){

	var frames_per_second = 8;

	// animaciones para caminar
	gameObject.animations.add('walk_front', [0, 1], frames_per_second, true);
	gameObject.animations.add('walk_left', [2, 3], frames_per_second, true);
	gameObject.animations.add('walk_right', [15, 16], frames_per_second, true);
	gameObject.animations.add('walk_back', [4, 5], frames_per_second, true);

	// animaciones para atacar
	gameObject.animations.add('attack_front', [9, 10, 11, 11, 9], frames_per_second, false);
	gameObject.animations.add('attack_left', [6, 7, 8, 8, 6], frames_per_second, false);
	gameObject.animations.add('attack_right', [17, 18, 19, 19, 17], frames_per_second, false);
	gameObject.animations.add('attack_back', [12, 13, 14, 14, 12], frames_per_second, false);
}


// Mientras se realiza un ataque
function attack(){
	if(!this.is_attacking){ return; }

	// la animación para el ataque
	this.animations.play('attack_' + this.direction);

	// Cuando expira el tiempo del ataque, este se detiene
	if(game.time.elapsedSince(this.time_init_attack) > 500 ){
		this.is_attacking = false;
		this.speed = this.SPEED_WALKING;
	}
}

// Cuando un jugador recoge un orbe
function collectOrb(orb){
	if( this.health < this.MAX_HEALTH){
		this.health += 10;
		gui.updateHealthBar(this.health);
	}
	orb.newRandomPosition();
}



// El movimiento del jugador mediante teclado
function movePlayer(){
	// Cuando se sueltan las teclas, se deja de mover el jugador, esto se comprueba para cada eje X y Y
	if (!keyboard.leftKey() && !keyboard.rightKey()){
		this.body.velocity.x = 0;
	}
	if (!keyboard.upKey() && !keyboard.downKey()){
		this.body.velocity.y = 0;
	}
	
	// Al presionar una tecla, el jugador se mueve y se activa una animacion
	if(keyboard.leftKey()){
		// Mover a la izquierda
		this.body.velocity.x = -this.speed;
		this.playAnimations('left');
	}
	else if(keyboard.rightKey()){
		// Mover a la derecha
		this.body.velocity.x = this.speed;
		this.playAnimations('right');
	} // arriba
	else if(keyboard.upKey()){
		this.body.velocity.y = -this.speed;
		this.playAnimations('back');
	} // abajo
	else if(keyboard.downKey()){
		this.body.velocity.y = this.speed;
		this.playAnimations('front');
	}
	else{
		// Permanecer quieto
		if(!this.is_attacking){
			this.animations.stop();
		}
	}
}


// cuando se realiza un ataque, se reproduce la animación correspondiente a la dirección del jugador
function playAnimations(new_direction){
	if(!this.is_attacking){
		this.animations.play('walk_' + new_direction);
		this.direction = new_direction;
	}
}

// Al realizar un ataque, se establece la bandera a true, y se guarda el momento de inicio del ataque
function toAttack(){
	this.is_attacking = true;
	this.time_init_attack = game.time.time;
	this.speed = this.SPEED_ATTACKING;
}


// Se ejecutan las funciones del jugador, como moverse y atacar
function updatePlayer(){
	this.movePlayer();
	this.attack();
	// Cuando se presiona la tecla SPACE se produce un ataque por parte del jugador
	if(keyboard.spaceKey() && !this.is_attacking){
		this.toAttack();
	}
}