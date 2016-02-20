
function addPlayer(){

	var x_pos = game.world.width -200;
	var y_pos = game.world.height - 400;

	// El objeto player en si mismo es un objeto sprite
	player = game.add.sprite(x_pos, y_pos, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.colliderWorldBounds = true;
	player.body.bounce.setTo(2, 2);
	player.scale.setTo(1.5, 1.5);
	player.body.setSize(30, 34, 19 + 9, 17 + 15);   // Reajustar el collider del jugador, para que solo cubra el cuerpo



	// Atributos constantes
	player.SPEED_WALKING = 150;
	player.SPEED_ATTACKING = 50;
	player.MAX_HEALTH = 100;

	// Atributos variables
	player.attack = player.addChild(addAttack());
	player.blood = player.addChild(addBlood());

	player.canMove = true;
	player.direction = "";
	player.is_attacking = false;
	player.speed = 150;
	player.health = 50;
	player.hitDamage = 10;
	player.start_time_attack = game.time.time;
	player.start_time_hit = game.time.time - 5000;
	
	player.sound_hit = game.add.audio('hit', 0.2);
	player.sound_sword_fail = game.add.audio('swordair', 0.5);

	// Los metodos del jugador
	player.attacking = attacking;
	player.collectOrbPlayer = collectOrbPlayer;
	player.hitPlayer = hitPlayer;
	player.movePlayer = movePlayer;
	player.playAnimations = playAnimations;
	player.toAttack = toAttack;
	player.updatePlayer = updatePlayer;


	// Se agregan las animaciones del jugador al instanciar uno
	addPlayerAnimations(player);
}

// Cada una de las animaciones del jugador, no se agrega al objeto player debido a que esta función solo se ejecuta al crear un player
function addPlayerAnimations(gameObject){

	var frames_per_second = 10;


	// animaciones para caminar
	gameObject.animations.add('walk_front', [0, 1, 2, 3], frames_per_second, true);
	gameObject.animations.add('walk_left', [8, 9, 10, 11], frames_per_second, true);
	gameObject.animations.add('walk_right', [24, 25, 26, 27], frames_per_second, true);
	gameObject.animations.add('walk_back', [16, 17, 18, 19], frames_per_second, true);

	// animaciones para atacar
	gameObject.animations.add('attack_front', [4, 5, 6, 7], frames_per_second, false);
	gameObject.animations.add('attack_left', [12, 13, 14, 15], frames_per_second, false);
	gameObject.animations.add('attack_right', [28, 29, 30, 31], frames_per_second, false);
	gameObject.animations.add('attack_back', [20, 21, 22, 23], frames_per_second, false);
}


// Mientras se realiza un ataque
function attacking(){
	if(!this.is_attacking){ return; }

	// la animación para el ataque
	this.animations.play('attack_' + this.direction);

	// Cuando expira el tiempo del ataque, este se detiene
	if(game.time.elapsedSince(this.start_time_attack) > 500 ){
		this.is_attacking = false;
		this.speed = this.SPEED_WALKING;
	}
}

// Cuando un jugador recoge un orbe
function collectOrbPlayer(orb){
	if( this.health < this.MAX_HEALTH){
		this.health += 10;
		gui.updateHealthBar(this.health);
	}
	orb.newRandomPosition();
	gui.score.up(15);
}


function hitPlayer(segment){
	this.canMove = false;
	this.start_time_hit = game.time.time;
	this.health -= this.hitDamage;
	gui.updateHealthBar(this.health);
	this.blood.playBleed();

	if(this.body.velocity.x == 0 && this.body.velocity.y == 0){
		this.body.velocity.x = 150;
		this.body.velocity.y = 150;
	}

	this.sound_hit.play();
}



// El movimiento del jugador mediante teclado
function movePlayer(){
	if(!this.canMove)
		return;



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
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('left', this);
	}
	else if(keyboard.rightKey()){
		// Mover a la derecha
		this.body.velocity.x = this.speed;
		this.playAnimations('right');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('right', this)
	} // arriba
	else if(keyboard.upKey()){
		this.body.velocity.y = -this.speed;
		this.playAnimations('back');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('back', this)
	} // abajo
	else if(keyboard.downKey()){
		this.body.velocity.y = this.speed;
		this.playAnimations('front');
		if(!this.is_attacking) 
			this.attack.changeAttackOrientation('front', this)
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
	this.start_time_attack = game.time.time;
	this.speed = this.SPEED_ATTACKING;
	this.sound_sword_fail.play();
}


// Se ejecutan las funciones del jugador, como moverse y atacar
function updatePlayer(){
	if(game.physics.arcade.isPaused)
		return;

	if(game.time.elapsedSince(this.start_time_hit) > 500 )
		this.canMove = true;

	this.blood.update();

	this.movePlayer();
	this.attacking();
	// Cuando se presiona la tecla SPACE se produce un ataque por parte del jugador
	if(keyboard.spaceKey() && !this.is_attacking){
		this.toAttack();
	}
}