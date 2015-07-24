
function GUI(){

	// Objetos y Atributos
	this.health_bar = "";
	this.heart = [];
	this.HEALTH_BAR_POSITION_X = 20;
	this.HEALTH_BAR_POSITION_Y = 550;

	
	// Metodos
	this.updateHealt = updateHealt;


	// Funcion llamada solo al instanciar un objeto GUI
	addPlayerHealth(this);
}


// Agregar la interfaz de salud del jugador, solo se invoca al inicio
function addPlayerHealth(gui){
	gui.health_bar = game.add.sprite(gui.HEALTH_BAR_POSITION_X, gui.HEALTH_BAR_POSITION_Y, 'healthbar');
	gui.health_bar.scale.setTo(2, 2);
	gui.health_bar.fixedToCamera = true;


	for( var i=0; i<5; i++){
		gui.heart[i] = game.add.sprite(6 + gui.HEALTH_BAR_POSITION_X + i*40, gui.HEALTH_BAR_POSITION_Y + 4, 'heart');
		gui.heart[i].scale.setTo(2, 2);
		gui.heart[i].fixedToCamera = true;
	}
	gui.updateHealt();
}

// Actualizar la barra de salud al ocurrir un evento (como tomar un orbe o ser atacado por el enemigo)
function updateHealt(){
	var local_health = player.health;
	for(var i=0; i<5; i++){
		if(local_health>=20){
			local_health -= 20;
			this.heart[i].frame = 0;
		}
		else if(local_health >= 10){
			local_health -= 10;
			this.heart[i].frame = 1;
		}
		else{
			this.heart[i].frame = 2;
		}
	}
}