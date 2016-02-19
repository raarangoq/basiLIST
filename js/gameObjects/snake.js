
function addSnakeSegment(previousSegment){
	
	var x = initSegmentPositionX(previousSegment);
	var y = initSegmentPositionY(previousSegment);
	// El objeto serpiente en sí mismo
	var snake = game.add.sprite(x, y, 'snake');
	game.physics.enable(snake, Phaser.Physics.ARCADE);
	snake.body.colliderWorldBounds = true;
	snake.body.setSize(32, 32, 9, 9);   // Reajustar el collider de la serpiente, para que solo cubra el cuerpo
	//snake.body.immovable = true;

	// Atributos
	snake.direction = 'front';
	snake.time_init_twisting = game.time.time  // Tiempo en segundos
	snake.speed = 150;
	snake.TIME_TWISTING = 750;
	// Apuntadores a los segmentos anteriores y siguiente
	snake.previous = previousSegment;
	snake.next = '';
	snake.stopTime = game.time.time;
	// Apuntador al objetivo de este segmento
	snake.target = 'orb';
	snake.target_x = '';
	snake.target_y = '';
	// Vector que indica la dirección en la que el objetivo se encuentra
	snake.u = 0;
	snake.v = 0,
	// Objetivo temporal para el movimiento ondulante de la serpiente
	snake.temporal_target_x = 200;
	snake.temporal_target_y = 200;


	// Metodos de la serpiente
	snake.addSegment = addSegment;
	snake.collectOrbSnake = collectOrbSnake;
	snake.destroySegment = destroySegment;
	snake.destroyHead = destroyHead;
	snake.destroyBody = destroyBody;
	snake.destroyTail = destroyTail;
	snake.distancePlayer = distancePlayer;
	snake.distanceOrb = distanceOrb;
	snake.lengthSnake = lengthSnake;
	snake.moveSnake = moveSnake;
	snake.playSnakeAnimation = playSnakeAnimation;
	snake.resetDirection = resetDirection;
	snake.setNextSegmentTarget = setNextSegmentTarget;
	snake.setRandomTarget = setRandomTarget;
	snake.setTarget = setTarget;
	snake.setTemporalTarget = setTemporalTarget;
	snake.setTemporalTargetBody = setTemporalTargetBody;
	snake.setTemporalTargetHead = setTemporalTargetHead;
	snake.targetAngle = targetAngle;
	snake.timeAfterMove = timeAfterMove;
	snake.updateSnake = updateSnake;	


	// Solo se invocan estos métodos al crear un segmento de serpiente
	addSnakeAnimations(snake);		// Se agregan las animaciones al segmento

	snake.setTarget(snake.target);
	return snake;
}

// Se agregan al segmento sus animaciones
function addSnakeAnimations(snake){
	var frames_per_second = 8;

	snake.animations.add('head_front', [0, 1], frames_per_second, true);
	snake.animations.add('head_left', [2, 3], frames_per_second, true);
	snake.animations.add('head_right', [6, 7], frames_per_second, true);
	snake.animations.add('head_back', [4, 5], frames_per_second, true);

	snake.animations.add('body', [8, 9, 10, 11, 12, 13], frames_per_second, true);
	snake.animations.add('new_segment', [13, 14, 13, 14], frames_per_second, true);
}


// Al crear un segmento, se debe elegir su posición inicial según como se creó
function initSegmentPositionX(previousSegment){
	// Se inicializa la posición según si es un segmento nuevo o una cabeza

	// Si es una cabeza aparecerá en un lugar al azar de la parte superior de la sala
	if(previousSegment == '')
		return 200 +  ((Math.random() * (game.world.width - 400)) / 2);
	// Si es un segmento cola, se agrega según la posición del segmento anterior
	return previousSegment.body.x;
}

function initSegmentPositionY(previousSegment){
	if(previousSegment == '')
		return 200 +  (Math.random() * (game.world.height - 400));
	return previousSegment.body.y;
}


//*******************************************************************************************//
// Metodos de cada objeto serpiente

// Funcion para agregar un segmento a una serpiente, primero irá hasta la cola, y allí agregará el segmento 
// nuevo
function addSegment(){
	this.stopTime = game.time.time;

	// Si este segmento no es la cola, se avanza hasta llegar a ella
	if(this.next != '') {
		this.next.addSegment();
	}
	else{
	// Si este segmento es la cola, se crea un nuevo segmento despues de esta
		this.next = addSnakeSegment(this);
	}
}


function collectOrbSnake(orb){
	orb.newRandomPosition();
	this.addSegment();
	setAllTargetsSnake(false);
}


function destroySegment(){
	if(this.previous == '')
		this.destroyHead();
	else if(this.next != '')
		this.destroyBody();
	else
		this.destroyTail();

	gui.score.up(10);
}


function destroyBody(){
	this.next.previous = '';
	this.previous.next = '';
	snakeHeads.push( this.next );

	setAllTargetsSnake(false);
	this.destroy();
}

function destroyHead(){
	this.next.previous = '';

	var pos = snakeHeads.indexOf(this);
	snakeHeads.splice(pos ,1);

	if(this.next != ''){
		snakeHeads.push( this.next );
		setAllTargetsSnake(true);
	}
	this.destroy();
}

function destroyTail(){
	this.previous.next = '';
	this.destroy();
}


function distancePlayer(){
	return game.physics.arcade.distanceBetween(this, player);
}

function distanceOrb(){
	return game.physics.arcade.distanceBetween(this, red_orb);
}

function lengthSnake(){
	if(this.next == '')
		return 1;
	else
		return 1+ this.next.lengthSnake();
}


// Ejecutar el movimiento mismo de la serpiente
function moveSnake(){
	if(!this.timeAfterMove()){
		this.body.velocity.setTo(0, 0);
		if(this.next != '') 
			this.next.moveSnake();
		return;
	}

	// Para asegurar que un segmento siga al siguiente, se establece el objetivo del segmento siguiente constantemente
	if( game.time.time - this.time_init_twisting > this.TIME_TWISTING/3 ) 
		this.setNextSegmentTarget();

	// Al alcanzar el objetivo o superar el tiempo de giro, se establece un nuevo movimiento 
	if(game.time.time - this.time_init_twisting > this.TIME_TWISTING || 
			game.physics.arcade.distanceToXY(this,this.temporal_target_x,this.temporal_target_y) < 5 ){
		this.time_init_twisting = game.time.time;
		this.setTemporalTarget();
	} 

	game.physics.arcade.moveToXY(this, this.temporal_target_x, this.temporal_target_y, this.speed);
	if(this.next != '') this.next.moveSnake();
}


function playSnakeAnimation(){
	if(this.previous == ''){
		this.animations.play('head_' + this.direction);
	}
	else{
		if(!this.timeAfterMove() && this.next == '')
			this.animations.play('new_segment');
		else
			this.animations.play('body');
	}

	if(this.next != '')
		this.next.playSnakeAnimation();
}

// Al cambiar de dirección, se asigna el texto direccional del segmento
function resetDirection(x, y){
	if(x == 0){
		if(y == 1) this.direction = 'front';
		else this.direction = 'back';
	}
	else if(x == 1){
		this.direction = 'right';
	}
	else{
		this.direction = 'left';
	}
}


function setNextSegmentTarget(){
	if(this.next != ''){
		this.next.target_x = this.body.x;
		this.next.target_y = this.body.y;
	}
}

function setRandomTarget(){
	do{
		this.target_x = 200 +  (Math.random() * (game.world.width - 400));
		this.target_y = 200 +  (Math.random() * (game.world.height - 400));
	}while (game.physics.arcade.distanceToXY(this, this.target_x, this.target_y) < 300);

	
}

// Se fija el objetivo del segmento de serpiente
// Puede ser el orbe, el jugador, o un punto al azar (estos tres casos si es la cabeza)
// Si no es la cabeza, seguirá al segmento anterior
function setTarget(target){
	// Cabeza
	if(this.previous == ''){
		this.target = target;

		// Primer caso, seguir el orbe (solo si es la cabeza), es el objetivo final, se usan
		// objetivos temporales para crear el movimiento ondulante de la serpiente
		if(target == 'orb'){
			if(red_orb.can_take){
				this.target_x = red_orb.body.x;
				this.target_y = red_orb.body.y;
			}
			else{
				this.setRandomTarget();
			}
		}
		else if(target == 'player'){
			this.target_x = player.body.x;
			this.target_y = player.body.y;
		}
		else if(target == 'random'){
			this.setRandomTarget();
		}
		this.setTemporalTarget();
	}
}


function setTemporalTarget(){
	if(this.previous == '') this.setTemporalTargetHead();
	else this.setTemporalTargetBody();

	this.setNextSegmentTarget();
}


function setTemporalTargetBody(){
	//this.temporal_target_x = this.previous.body.x;
	//this.temporal_target_y = this.previous.body.y;
	this.temporal_target_x = this.target_x - 10;
	this.temporal_target_y = this.target_y - 10;
}

// Para dar un movimiento ondulante, la cabeza se moverá a través de objetivos temporales
// camino al verdadero objetivo
function setTemporalTargetHead(){

	// Se establece el vector director (u, v) para determinar la dirección actual de la cabeza
	var u = 0;
	var v = 0;
	// Se establece en vector director en base a la dirección de la cabeza
	if(this.direction == 'right'){
		u = 1; 
	}else if(this.direction == 'left'){
		u = -1; 
	}else if(this.direction == 'back'){
		v = -1;
	}else if(this.direction == 'front'){
		v = 1;
	}
	// Se establece el vector (c, d) para indicar el vector hacia el cual (u, v) debe girar
	this.c = this.target_x - this.body.x;
	this.d = this.target_y - this.body.y;

	// Hay 3 posibles giros (girar 90 grados izquierda, 90 grados derecha, no girar),
	// Se debe determinar cuales son factibles y luego elegir uno de estos al azar

	// Angulo actual entre la serpiente y el objetivo (no girar)
	var angle0 = this.targetAngle(u, v);
	// Rotación 1, rotar +90 grados
	var x1 = -v;
	var y1 = u;
	var angle1 = this.targetAngle(x1, y1);
	// rotación 2, rotar -90 grados
	var x2 = v;
	var y2 = -u;
	var angle2 = this.targetAngle(x2, y2);


	var feasible0 = false; 
	var feasible1 = false; 
	var feasible2 = false;
	// Caso especial angle0, es factible si es menor o igual a 90 grados
	if( angle0 < Math.PI/2 ) { feasible0 = true; } 
	if( (angle1 < Math.PI/2 ) /*|| angle1 <= angle0*/ ){ feasible1 = true; }
	if( (angle2 < Math.PI/2 ) /*|| angle2 <= angle0*/ ){ feasible2 = true; }
	// Cuando ninguno de lo giros es factible (porque el orbe esté detras de la serpiente), se selecciona un giro
	// a uno de los lados, el que produzca el menor angulo
	if(!feasible0 && !feasible1 && ! feasible2){
		if(angle1 <= angle2) feasible1 = true;
		else feasible2 = true;
	}	

	// Se procede a seleccionar la dirección de la serpiente entre los movimientos factibles
	// Se buscará siempre hacer un giro
	var selection = 0;
	if(feasible0){ selection = 0; }
	if(feasible1){ selection = 1; }
	if(feasible2){ selection = 2; }



	// una vez seleccionador el movimiento a usar, se prodece a establecer el objetivo temporal a seguir
	var x_distance = Math.abs(this.body.x - this.target_x);
	var y_distance = Math.abs(this.body.y - this.target_y);

	if( game.physics.arcade.distanceToXY(this, this.target_x, this.target_y) > 100 ){
		x_distance = 300;
		y_distance = 300;
	}

	if(selection == 0){
		this.temporal_target_x = this.body.x + u*x_distance - 10;
		this.temporal_target_y = this.body.y + v*y_distance - 10;
		this.resetDirection(u, v);
	}
	else if(selection == 1){
		this.temporal_target_x = this.body.x + x1*x_distance - 10;
		this.temporal_target_y = this.body.y + y1*y_distance - 10;
		this.resetDirection(x1, y1);
	}
	else if(selection == 2){
		this.temporal_target_x = this.body.x + x2*x_distance - 10;
		this.temporal_target_y = this.body.y + y2*y_distance - 10;
		this.resetDirection(x2, y2);
	}
}



// Regresa el angulo entre el vector dado y el vector que apunta al objetivo
function targetAngle(u, v){
	// Angulo entre el vector (u, v) dado, y el vector (c, d) que apunta al objetivo
	var numerator = u*this.c + v*this.d;
	// considerar que debido a que el vector (u, v) tiene magnitud 1, no es necesario calcularlo
	// en el denominador de la ecuación del angulo entre vectores
	var denominator = Math.sqrt( Math.pow(this.c, 2) + Math.pow(this.d, 2) );

	return Math.acos( numerator / denominator );
}

function timeAfterMove(){
	if(game.time.time - this.stopTime <= 500)
		return false;
	else
		return true;
}


var isForOrb = true;


function updateSnake(){
	if(game.physics.arcade.isPaused)
		return;

	if(this.previous == '' && 
		game.physics.arcade.distanceToXY(this,this.target_x,this.target_y) < 20 &&
		( this.target == 'random' || this.target == 'player' ) ){
			this.setTarget(this.target);
	}

	if(this.target == 'orb' && red_orb.can_take && !isForOrb){
		this.target_x = red_orb.body.x;
		this.target_y = red_orb.body.y;

		isForOrb = true;

		this.setTemporalTarget();
	}


	this.moveSnake();
	this.playSnakeAnimation();
}




//********************************************************************************************************
// Metodos "estáticos"

function setAllTargetsSnake(headDestroyed){
if(snakeHeads.length <= 0) return;

	var snakeToOrb = selectSnakeWithOrbTarget();
	var snakeToPlayer = selectSnakeWithPlayerTarget(snakeToOrb, headDestroyed);

	snakeHeads[snakeToOrb].setTarget('orb');
isForOrb = false;	

	if(snakeToPlayer >= 0)
		snakeHeads[snakeToPlayer].setTarget('player');

	if(snakeHeads.length >= 1)
	for(var i=0; i<snakeHeads.length; i++){
		if( i != snakeToOrb && i != snakeToPlayer)
			snakeHeads[i].setTarget('random');
	}	

}


function selectSnakeWithOrbTarget(){
	var snakeIndex = 0;

	var minDistance = snakeHeads[0].distanceOrb();

	for(var i=1; i<snakeHeads.length; i++){ 
		var actualDistance = snakeHeads[i].distanceOrb();
		if(actualDistance < minDistance ){
			snakeIndex = i;
			minDistance = actualDistance;
		}
	}

	return snakeIndex;
}

function selectSnakeWithPlayerTarget(snakeToOrb, headDestroyed){
	var snakeIndex = -1;
	var minDistance = 2000;

	for(var i=0; i<snakeHeads.length; i++){ 
		var actualDistance = snakeHeads[i].distancePlayer();
		if(actualDistance < minDistance &&  i != snakeToOrb){
			snakeIndex = i;
			minDistance = actualDistance;
		}
	}

	// Para evitar la situacion en que una serpiente entera camina hacia la espada del jugador
	// cuando se destruye una cabeza, la nueva cabeza tendrá un objetivo al azar
	if(headDestroyed && snakeIndex == snakeHeads.length - 1)
		return -1;

	return snakeIndex;
}