

function addKeyboard(){
	
	// Atributos

	// El teclado para procesar la entrada
	keyboard = game.input.keyboard;	

	// Metodos
	keyboard.leftKey = leftKey;
	keyboard.rightKey = rightKey;
	keyboard.upKey = upKey;
	keyboard.downKey = downKey;
	keyboard.spaceKey = spaceKey;
}


function leftKey(){
	if(this.isDown(Phaser.Keyboard.LEFT) || this.isDown(Phaser.Keyboard.A)){
		return true;
	}
	return false;
}


function rightKey(){
	if(this.isDown(Phaser.Keyboard.RIGHT) || this.isDown(Phaser.Keyboard.D)){
		return true;
	}
	return false;
}


function upKey(){
	if(this.isDown(Phaser.Keyboard.UP) || this.isDown(Phaser.Keyboard.W)){
		return true;
	}
	return false;
}


function downKey(){
	if(this.isDown(Phaser.Keyboard.DOWN) || this.isDown(Phaser.Keyboard.S)){
		return true;
	}
	return false;
}


function spaceKey(){
	if(this.isDown(Phaser.Keyboard.SPACEBAR)){
		return true;
	}
	return false;
}
