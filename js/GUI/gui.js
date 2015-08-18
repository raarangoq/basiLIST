
function GUI(){

	// Objetos y Atributos

	// Barra de salud
	this.health_bar = addHealthBar();
	
	// Pause
	this.pause_menu = addPause();



	// Metodos

	// Actualizar barra de salud
	this.updateHealthBar = updateHealthBar;
	this.pauseGame = pauseGame;


	this.pauseKey = keyboard.addKey(Phaser.Keyboard.ENTER);
	this.pauseKey.onDown.add(this.pauseGame, this);


	this.pauseGame();
}
