
function addOrb(){
	// Atributos
	var orb = game.add.sprite(1000, 800, 'redorb');

	// Configuración del cuerpo físico
	game.physics.enable(orb, Phaser.Physics.ARCADE);
	orb.body.colliderWorldBounds = true;
	orb.body.setSize(24, 24, 0, 0);   // Reajustar el collider del jugador, para que solo cubra el cuerpo

	orb.animations.add('shine', [0, 1, 2], 6, true);
	orb.animations.play('shine');

	// Metodos
	orb.newRandomPosition = newRandomPosition;

	return orb;
}



function newRandomPosition(){
	this.body.x = 200 + Math.abs( Math.random()*800 );
	this.body.y = 200 + Math.abs( Math.random()*600 );
}
