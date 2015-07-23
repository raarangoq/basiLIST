

// El jugador en si mismo, su cuerpo y animaciones
function addPlayer(){
	player = game.add.sprite(100, 100, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.colliderWorldBounds = true;
	player.body.setSize(30, 34, 19, 17);   // Reajustar el collider del jugador, para que solo cubra el cuerpo

	addPlayerAnimations();
	addPlayerHealth();
}


// Cada una de las animaciones del jugador
function addPlayerAnimations(){

	var frames_per_second = 8;

	// animaciones para caminar
	player.animations.add('walk_front', [0, 1], frames_per_second, true);
	player.animations.add('walk_left', [2, 3], frames_per_second, true);
	player.animations.add('walk_right', [15, 16], frames_per_second, true);
	player.animations.add('walk_back', [4, 5], frames_per_second, true);

	// animaciones para atacar
	player.animations.add('attack_front', [9, 10, 11, 11, 9], frames_per_second, false);
	player.animations.add('attack_left', [6, 7, 8, 8, 6], frames_per_second, false);
	player.animations.add('attack_right', [17, 18, 19, 19, 17], frames_per_second, false);
	player.animations.add('attack_back', [12, 13, 14, 14, 12], frames_per_second, false);
}

// Agregar la interfaz de salud del jugador
function addPlayerHealth(){
	health_bar = game.add.sprite(HEALTH_BAR_POSITION_X, HEALTH_BAR_POSITION_Y, 'healthbar');
	health_bar.scale.setTo(2, 2);
	health_bar.fixedToCamera = true;


	for( var i=0; i<5; i++){
		heart[i] = game.add.sprite(6 + HEALTH_BAR_POSITION_X + i*40, HEALTH_BAR_POSITION_Y + 4, 'heart');
		heart[i].scale.setTo(2, 2);
		heart[i].fixedToCamera = true;
	}
	updateHealt();

}


// Mientras se realiza un ataque
function attack(){
	if(!is_attacking){ return; }

	// la animación para el ataque
	player.animations.play('attack_' + player_direction);

	// Cuando expira el tiempo del ataque, este se detiene
	if(game.time.elapsedSince(time_init_attack) > 500 ){
		is_attacking = false;
		player_speed = PLAYER_SPEED_WALKING;
	}
}

// Cuando un jugador recoge un orbe
function collectOrb(player, orb){
	if(player_health < MAX_HEALTH){
		player_health += 10;
		updateHealt();
	}
	
	//newRandomPosition(orb);
	orb.newRandomPosition();
}



// El movimiento del jugador mediante teclado
function movePlayer(){
	// Cuando se sueltan las teclas, se deja de mover el jugador, esto se comprueba para cada eje X y Y
	if (!keyboard.isDown(LEFT_KEY) && !keyboard.isDown(RIGHT_KEY)){
		player.body.velocity.x = 0;
	}
	if (!keyboard.isDown(UP_KEY) && !keyboard.isDown(DOWN_KEY)){
		player.body.velocity.y = 0;
	}
	
	// Al presionar una tecla, el jugador se mueve y se activa una animacion
	if(keyboard.isDown(LEFT_KEY)){
		// Mover a la izquierda
		player.body.velocity.x = -player_speed;
		playAnimations('left');
	}
	else if(keyboard.isDown(RIGHT_KEY)){
		// Mover a la derecha
		player.body.velocity.x = player_speed;
		playAnimations('right');
	} // arriba
	else if(keyboard.isDown(UP_KEY)){
		player.body.velocity.y = -player_speed;
		playAnimations('back');
	} // abajo
	else if(keyboard.isDown(DOWN_KEY)){
		player.body.velocity.y = player_speed;
		playAnimations('front');
	}
	else{
		// Permanecer quieto
		if(!is_attacking){
			player.animations.stop();
		}
		//player.frame = 4;
	}
}


// cuando se realiza un ataque, se reproduce la animación correspondiente a la dirección del jugador
function playAnimations(direction){
	if(!is_attacking){
		player.animations.play('walk_' + direction);
		player_direction = direction;
	}
}


function updateHealt(){
	var local_health = player_health;
	for(var i=0; i<5; i++){
		if(local_health>=20){
			local_health -= 20;
			heart[i].frame = 0;
		}
		else if(local_health >= 10){
			local_health -= 10;
			heart[i].frame = 1;
		}
		else{
			heart[i].frame = 2;
		}
	}
}


// Al realizar un ataque, se establece la bandera a true, y se guarda el momento de inicio del ataque
function toAttack(){
	is_attacking = true;
	time_init_attack = game.time.time;
	player_speed = PLAYER_SPEED_ATTACKING;
}


// Se ejecutan las funciones del jugador, como moverse y atacar
function updatePlayer(){
	movePlayer();
	attack();
	// Cuando se presiona la tecla SPACE se produce un ataque por parte del jugador
	if(keyboard.isDown(SPACEBAR_KEY) && !is_attacking){
		toAttack();
	}
}