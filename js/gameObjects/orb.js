
function addOrb(){
	// Atributos
	var x_pos = game.world.width - 400;
	var y_pos = game.world.height - 200;

	var orb = game.add.sprite(x_pos, y_pos, 'redorb');

	// Configuración del cuerpo físico
	game.physics.enable(orb, Phaser.Physics.ARCADE);
	orb.body.colliderWorldBounds = true;
	orb.body.setSize(24, 24, 0, 0);   // Reajustar el collider del jugador, para que solo cubra el cuerpo

	orb.animations.add('shine', [0, 1, 2], 6, true);
	orb.animations.play('shine');

	orb.sound = game.add.audio('orb', 1.5);

	// Metodos
	orb.newRandomPosition = newRandomPosition;

	return orb;
}



function newRandomPosition(){
	this.sound.play();
	this.body.x = 200 +  (Math.random() * (game.world.width - 400));
	this.body.y = 200 +  (Math.random() * (game.world.height - 400));
}
