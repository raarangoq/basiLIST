

function addAttack(){
	var attack = game.make.sprite(19, 34 + 17, 'attack');
	game.physics.enable(attack, Phaser.Physics.ARCADE);
	attack.body.colliderWorldBounds = true;

//	attack.player = player;
	attack.frame = 3;

	attack.changeAttackOrientation = changeAttackOrientation;
	attack.setAttackFrame = setAttackFrame;

	return attack;
}


function changeAttackOrientation(orientation, player){
	if(orientation == 'right'){
		this.body.x = player.body.x + 30;
		this.body.y = player.body.y;
	}else if(orientation == 'left'){
		this.body.x = player.body.x - 30;
		this.body.y = player.body.y;
	}else if(orientation == 'front'){
		this.body.x = player.body.x;
		this.body.y = player.body.y + 34;
	}else if(orientation == 'back'){
		this.body.x = player.body.x;
		this.body.y = player.body.y - 30;
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