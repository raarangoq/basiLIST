



function addOrb(){
	red_orb = game.add.sprite(600, 600, 'redorb');
	game.physics.enable(red_orb, Phaser.Physics.ARCADE);
	red_orb.body.colliderWorldBounds = true;
	red_orb.body.setSize(24, 24, 0, 0);   // Reajustar el collider del jugador, para que solo cubra el cuerpo


	
	newRandomPosition(red_orb);
	

	addOrbAnimations(red_orb);
}


function addOrbAnimations(orb){
	orb.animations.add('shine', [0, 1, 2], 6, true);
}



function newRandomPosition(item){
	var x_coordenate = 140 + Math.random()*900;
	var y_coordenate = 140 + Math.random()*750;

	item.body.x = x_coordenate;
	item.body.y = y_coordenate;
}


function updateItems(){
	red_orb.animations.play('shine');
}
