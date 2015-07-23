

// Definición de un objeto Orbe
function Orb(){
	// Atributos 
	this.gameObject = game.add.sprite(600, 600, 'redorb');

	// Configuración del cuerpo físico
	game.physics.enable(this.gameObject, Phaser.Physics.ARCADE);
	this.gameObject.body.colliderWorldBounds = true;
	this.gameObject.body.setSize(24, 24, 0, 0);   // Reajustar el collider del jugador, para que solo cubra el cuerpo

	this.gameObject.animations.add('shine', [0, 1, 2], 6, true);
	this.gameObject.animations.play('shine');

	// Metodos
	this.newRandomPosition = newRandomPosition;
}

function newRandomPosition(){
	this.gameObject.body.x = 140 + Math.random()*900;
	this.gameObject.body.y = 140 + Math.random()*750;
}
