

function addAttack(){
	var attack = game.make.sprite(19, 34 + 17, 'attack');
	game.physics.enable(attack, Phaser.Physics.ARCADE);
	attack.body.colliderWorldBounds = true;

//	attack.player = player;
	attack.frame = 3;
	attack.renderable = false;

	attack.changeAttackOrientation = changeAttackOrientation;
	attack.setAttackFrame = setAttackFrame;

	return attack;
}


function changeAttackOrientation(orientation, player){
	if(orientation == 'right'){
		this.body.x = player.body.x + 50;
		this.body.y = player.body.y + 5;
	}else if(orientation == 'left'){
		this.body.x = player.body.x - 40;
		this.body.y = player.body.y + 5;
	}else if(orientation == 'front'){
		this.body.x = player.body.x + 10;
		this.body.y = player.body.y + 45;
	}else if(orientation == 'back'){
		this.body.x = player.body.x + 10; 
		this.body.y = player.body.y - 60;
	}

	this.setAttackFrame(orientation);

}

function setAttackFrame(orientation){
	if(orientation == 'right')
		this.frame = 2;
	else if(orientation == 'left')
		this.frame = 0;
	else if(orientation == 'front')
		this.frame = 3;
	else 
		this.frame = 1;
}


///////////////////////////////
////     When the player takes dagame, he bleeds

function addBlood(){
	var blood = game.add.sprite(-15, -10, 'blood');
	blood.initTime = game.time.now;
	blood.animations.add('bleed', [0, 1, 2, 3, 4], 9, true);
	blood.play('bleed');

	blood.playBleed = playBloodAnimation;
	blood.update = updateBlood;

	return blood;
}

function playBloodAnimation(){
	this.initTime = game.time.now;
	this.visible = true;
}

function updateBlood(){
	if(game.time.now - this.initTime > 1000){
	//	alert('entra');
		this.visible = false;
	}
}