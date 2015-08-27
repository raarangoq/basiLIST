
function GUI(){

	// Objetos y Atributos
	
	// Pause
	this.pause_menu = addPause();

	// Barra de salud
	this.health_bar = addHealthBar();

	// conteo de enemigos
	this.count_enemy = addCountEnemy();

	// Metodos

	// Actualizar barra de salud
	
	this.pauseGame = pauseGame;
	this.updateCountEnemy = updateCountEnemy;
	this.updateHealthBar = updateHealthBar;

	this.pauseKey = keyboard.addKey(Phaser.Keyboard.ENTER);
	this.pauseKey.onDown.add(this.pauseGame, this);

	
	this.pauseGame();
}
