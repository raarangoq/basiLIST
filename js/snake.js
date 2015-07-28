
function addSnakeSegment(previousSegment){
	// El objeto serpiente en sí mismo

	var snake = game.add.sprite(200, 200, 'snake');
	game.physics.enable(snake, Phaser.Physics.ARCADE);
	snake.body.colliderWorldBounds = true;
	snake.body.setSize(32, 32, 9, 9);   // Reajustar el collider del jugador, para que solo cubra el cuerpo

	// Atributos
	snake.direction = 'front';
	snake.time_init_twisting = game.time.time  // Tiempo en segundos
	snake.speed = 150;
	snake.TIME_TWISTING = 750;
	// Apuntadores a los segmentos anteriores y siguiente
	snake.previous = previousSegment;
	snake.next = '';
	// Apuntador al objetivo de este segmento
	snake.target_x = '';
	snake.target_y = '';
	// Vector que indica la dirección en la que el objetivo se encuentra
	snake.u = '';
	snake.v = '',
	// Objetivo temporal para el movimiento ondulante de la serpiente
	snake.temporal_target_x = '';
	snake.temporal_target_y = '';


	// Metodos de la serpiente
	snake.addSegment = addSegment;
	snake.initSegmentPosition = initSegmentPosition;
	snake.moveSnake = moveSnake;
//	snake.playSnakeAnimation = playSnakeAnimation;
	snake.playTailAnimation = playTailAnimation;
	snake.resetDirection = resetDirection;
	snake.setTarget = setTarget;
	snake.setTemporalTarget = setTemporalTarget;
	snake.targetAngle = targetAngle;
	snake.updateSnake = updateSnake;	


	// Solo se invocan estos métodos al crear un segmento de serpiente
	initSegmentPosition(snake);		// Segun la situación, se debe determinar su posición inicial
	addSnakeAnimations(snake);		// Se agregan las animaciones al segmento


	snake.setTarget();
	return snake;
}


// Se agregan al segmento sus animaciones
function addSnakeAnimations(snake){
	var frames_per_second = 8;

	snake.animations.add('head_front', [0, 1], frames_per_second, true);
	snake.animations.add('head_left', [2, 3], frames_per_second, true);
	snake.animations.add('head_right', [6, 7], frames_per_second, true);
	snake.animations.add('head_back', [4, 5], frames_per_second, true);

	snake.animations.add('body', [8, 9, 10], frames_per_second, true);

	snake.animations.add('tail_front', [11], frames_per_second, true);
	snake.animations.add('tail_left', [12], frames_per_second, true);
	snake.animations.add('tail_right', [14], frames_per_second, true);
	snake.animations.add('tail_back', [13], frames_per_second, true);

}


// Al crear un segmento, se debe elegir su posición inicial según como se creó
function initSegmentPosition(segment){
	// Se inicializa la posición según si es un segmento nuevo o una cabeza

	// Si es una cabeza aparecerá en un lugar al azar de la parte superior de la sala
	if(segment.previous == ''){
		segment.body.x = 200 + Math.round(Math.random()*600);
		segment.body.y = 200 + Math.round(Math.random()*300);
	}
	// Si es un segmento cola, se agrega según la posición del segmento anterior
	// Se consideran 4 casos, según la dirección del segmento anterior
	else {
		if(segment.previous.direction == 'front'){
			segment.body.y = segment.previous.body.y - 32;
		}
		else if(segment.previous.direction == 'back'){
			segment.body.y = segment.previous.body.y + 32;
		}
		else if(segment.previous.direction == 'left'){
			segment.body.x = segment.previous.body.x + 32;
		}
		else if(segment.previous.direction == 'right'){
			segment.body.x = segment.previous.body.x - 32;
		}
	}
}

//*******************************************************************************************//
// Metodos de cada objeto serpiente

// Funcion para agregar un segmento a una serpiente, primero irá hasta la cola, y allí agregará el segmento 
// nuevo
function addSegment(){
	// Si este segmento no es la cola, se avanza hasta llegar a ella
	if(this.next != "") {
		this.next.addSegment();
		return;
	}
	// Si este segmento es la cola, se crea un nuevo segmento despues de esta
	this.next = addSnakeSegment(this);
}

// Ejecutar el movimiento mismo de la serpiente
function moveSnake(){
	// Si es la cabeza
	if(this.previous == ""){
		// Primero verificar si ya se cumplió el tiempo de giro para determinar un nuevo objetivo temporal
		// Esto solo lo hace la cabeza 
		if(game.time.time - this.time_init_twisting > this.TIME_TWISTING || 
		   game.physics.arcade.distanceToXY(this,this.temporal_target_x,this.temporal_target_y) < 10 ){
			this.setTemporalTarget();
			this.time_init_twisting = game.time.time;
		} 
	}
	// Si es el cuerpo, la function setTarget se encargará de definir como objetivo el anterior segmento
	game.physics.arcade.moveToXY(this, this.temporal_target_x, this.temporal_target_y, this.speed);
}

// Si es un segmento cola, se ejecuta su animación
function playTailAnimation(direction){
	this.animations.play('tail_' + direction);
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

// Se fija el objetivo del segmento de serpiente
// Puede ser el orbe, el jugador, o un punto al azar (estos tres casos si es la cabeza)
// Si no es la cabeza, seguirá al segmento anterior
function setTarget(){
	// Cabeza
	if(this.previous == ""){
		// Primer caso, seguir el orbe (solo si es la cabeza), es el objetivo final, se usan
		// objetivos temporales para crear el movimiento ondulante de la serpiente
		this.target_x = red_orb.body.x;
		this.target_y = red_orb.body.y;
		this.setTemporalTarget();
	}
	// Segmento, seguirá al anterior segmento
	else{
		this.temporal_target_x = this.previous.body.x;
		this.temporal_target_y = this.previous.body.y;
	}

}

// Para dar un movimiento ondulante, la cabeza se moverá a través de objetivos temporales
// camino al verdadero objetivo
function setTemporalTarget(){
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

	if( game.physics.arcade.distanceToXY(this,this.target_x,this.target_y) > 200 ){
		x_distance = 300;
		y_distance = 300;
	}

	if(selection == 0){
		this.temporal_target_x = this.body.x + u*x_distance;
		this.temporal_target_y = this.body.y + v*y_distance;
		this.resetDirection(u, v);
	}
	else if(selection == 1){
		this.temporal_target_x = this.body.x + x1*x_distance;
		this.temporal_target_y = this.body.y + y1*y_distance;
		this.resetDirection(x1, y1);
	}
	else if(selection == 2){
		this.temporal_target_x = this.body.x + x2*x_distance;
		this.temporal_target_y = this.body.y + y2*y_distance;
		this.resetDirection(x2, y2);
	}


texta.text = 'Objetivo x:' + this.temporal_target_x + "\nObjetivo y:" + this.temporal_target_y
	+ '\nAngulo PI/2: ' +  Math.PI/2
	+ '\nTarget: ' + this.target_x + "  " + this.target_y
	+ '\nAngulo 1: ' + angle0 + '\nAngulo 2: ' + angle1 + '\nAngulo 3: ' + angle2
	+ '\n' + feasible0 + '   ' + feasible1 + '   ' + feasible2
	+ '\n' + selection
	+ '\nDirección: ' + this.direction;

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



function updateSnake(){
	this.moveSnake();
//	this.playSnakeAnimation();
}