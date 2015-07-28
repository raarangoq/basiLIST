




// Agregar la interfaz de salud del jugador, solo se invoca al inicio
function addHealthBar(){

	var POSITION_X = 20;
	var POSITION_Y = 550;

	var health_bar = game.add.sprite(POSITION_X, POSITION_Y, 'healthbar');
	health_bar.scale.setTo(2, 2);
	health_bar.fixedToCamera = true;

	health_bar.heart = [];

	for(var i=0; i<5; i++){
		health_bar.heart[i] = game.add.sprite(
			6 + POSITION_X + i*40, 
			POSITION_Y + 4, 
			'heart');
		health_bar.heart[i].scale.setTo(2, 2);
		health_bar.heart[i].fixedToCamera = true;
		health_bar.heart[i].frame = 2;
	}


	return health_bar;
}



// Actualizar la barra de salud al ocurrir un evento (como tomar un orbe o ser atacado por el enemigo)
function updateHealthBar(health){
	
	for(var i=0; i<5; i++){
		if(health>=20){
			health -= 20;
			this.health_bar.heart[i].frame = 0;
		}
		else if(health >= 10){
			health -= 10;
			this.health_bar.heart[i].frame = 1;
		}
		else{
			this.health_bar.heart[i].frame = 2;
		}
	}
}