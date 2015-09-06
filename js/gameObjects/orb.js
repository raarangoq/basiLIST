
function addOrb(){
	// Atributos
	var x_pos = game.world.width - 400;
	var y_pos = game.world.height - 200;

	var orb = game.add.sprite(x_pos, y_pos, 'redorb');

	// Configuración del cuerpo físico
	game.physics.enable(orb, Phaser.Physics.ARCADE);
	orb.body.colliderWorldBounds = true;
	//orb.body.setSize(24, 24, 0, 0);   // Reajustar el collider del alimento, para que solo cubra el cuerpo

	orb.animations.add('shine', [0, 1], 4, true);
	orb.animations.play('shine');

	orb.previous_x_pos = 10;
	orb.previous_y_pos = 10;
	orb.move = false;

	orb.time_to_appear = game.time.time;
	orb.can_take = true;

	orb.sound = game.add.audio('orb', 1.5);

	// Metodos
	orb.newRandomPosition = newRandomPosition;
	orb.updateOrb = updateOrb;
	orb.showOrb = showOrb;

	return orb;
}



function newRandomPosition(){
	this.sound.play();

	this.can_take = false;
	this.visible = false;

	this.body.x = 200 +  (Math.random() * (game.world.width - 400));
	this.body.y = 200 +  (Math.random() * (game.world.height - 400));

	this.time_to_appear = game.time.time;

}


function updateOrb(){
	if(!this.can_take){
		if(game.global.level == 1 && game.time.time - this.time_to_appear > 3000){
			this.showOrb();
		}
		else if(game.global.level == 2 && game.time.time - this.time_to_appear > 2000){
			this.showOrb();
		}
		else if(game.global.level == 3 && game.time.time - this.time_to_appear > 1000){
			this.showOrb();
		}
		else if(game.global.level >= 4 &&  game.time.time - this.time_to_appear > 1000){
			this.showOrb();
		}

	}

}

function showOrb(){
	this.can_take = true;
	this.visible = true;


	setAllTargetsSnake(false);
	return true;
}
