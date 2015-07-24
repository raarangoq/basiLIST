

function addKeyProperties(keyboard){
	// Atributos
	keyboard.DOWN_KEY = 40;
	keyboard.LEFT_KEY = 37;
	keyboard.RIGHT_KEY = 39;
	keyboard.SPACEBAR_KEY = 32;
	keyboard.UP_KEY = 38;
	keyboard.gameObject = game.input.keyboard;

	// Metodos
	keyboard.leftKey = leftKey;
	keyboard.rightKey = rightKey;
	keyboard.upKey = upKey;
	keyboard.downKey = downKey;
	keyboard.spaceKey = spaceKey;
}


function leftKey(){
	if(this.isDown(this.LEFT_KEY)){
		return true;
	}
	return false;
}


function rightKey(){
	if(this.isDown(this.RIGHT_KEY)){
		return true;
	}
	return false;
}


function upKey(){
	if(this.isDown(this.UP_KEY)){
		return true;
	}
	return false;
}


function downKey(){
	if(this.isDown(this.DOWN_KEY)){
		return true;
	}
	return false;
}


function spaceKey(){
	if(this.isDown(this.SPACEBAR_KEY)){
		return true;
	}
	return false;
}
