
function GUI(){

	// Objetos y Atributos
	
	
	// Barra de salud
	this.health_bar = addHealthBar();

	// conteo de enemigos
	this.count_enemy = addCountEnemy();

	this.score = addScore();

	// Pause
	this.pause_menu = addPause();


	// Metodos

	// Actualizar barra de salud
	
	this.pauseGame = pauseGame;
	this.updateCountEnemy = updateCountEnemy;
	this.updateHealthBar = updateHealthBar;

	this.pauseKey = keyboard.addKey(Phaser.Keyboard.ENTER);
	this.pauseKey.onDown.add(this.pauseGame, this);

	this.setDrawOrder = setGuiDrawOrder;
	
	this.pauseGame();
}

function setGuiDrawOrder(){
	this.health_bar.setDrawOrder();
	setEnemyRecountDrawOrder();
	this.score.bringToTop();
	this.pause_menu.setDrawOrder();
}