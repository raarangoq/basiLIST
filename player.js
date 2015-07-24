
function Player(){

	this.gameObject = game.add.sprite(100, 100, 'player');
	game.physics.enable(this.gameObject, Phaser.Physics.ARCADE);
	this.gameObject.body.colliderWorldBounds = true;
	this.gameObject.body.setSize(30, 34, 19, 17);   // Reajustar el collider del jugador, para que solo cubra el cuerpo

	// Atributos constantes
	this.SPEED_WALKING = 150;
	this.SPEED_ATTACKING = 50;
	this.MAX_HEALTH = 100;
	// Atributos variables
	this.direction = "";
	this.is_attacking = false;
	this.speed = 150;
	this.health = 50;
	this.time_init_attack = game.time.time;

	// Los metodos del jugador
	this.attack = attack;
	this.collectOrb = collectOrb;
	this.move = move;
	this.playAnimations = playAnimations;
	this.toAttack = toAttack;
	this.player_update = player_update;


	// Se agregan las animaciones del jugador al instanciar uno
	addPlayerAnimations(this.gameObject);

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
	this.gameObject.animations.play('attack_' + this.direction);

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
		gui.updateHealt();
	}
	orb.newRandomPosition();
}



// El movimiento del jugador mediante teclado
function move(){
	// Cuando se sueltan las teclas, se deja de mover el jugador, esto se comprueba para cada eje X y Y
	if (!keyboard.leftKey() && !keyboard.rightKey()){
		this.gameObject.body.velocity.x = 0;
	}
	if (!keyboard.upKey() && !keyboard.downKey()){
		this.gameObject.body.velocity.y = 0;
	}
	
	// Al presionar una tecla, el jugador se mueve y se activa una animacion
	if(keyboard.leftKey()){
		// Mover a la izquierda
		this.gameObject.body.velocity.x = -this.speed;
		this.playAnimations('left');
	}
	else if(keyboard.rightKey()){
		// Mover a la derecha
		this.gameObject.body.velocity.x = this.speed;
		this.playAnimations('right');
	} // arriba
	else if(keyboard.upKey()){
		this.gameObject.body.velocity.y = -this.speed;
		this.playAnimations('back');
	} // abajo
	else if(keyboard.downKey()){
		this.gameObject.body.velocity.y = this.speed;
		this.playAnimations('front');
	}
	else{
		// Permanecer quieto
		if(!this.is_attacking){
			this.gameObject.animations.stop();
		}
	}
}


// cuando se realiza un ataque, se reproduce la animación correspondiente a la dirección del jugador
function playAnimations(new_direction){
	if(!this.is_attacking){
		this.gameObject.animations.play('walk_' + new_direction);
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
function player_update(){
	this.move();
	this.attack();
	// Cuando se presiona la tecla SPACE se produce un ataque por parte del jugador
	if(keyboard.spaceKey() && !this.is_attacking){
		this.toAttack();
	}
}