
function addScore() {
	var score = game.add.text(30, 30, 'Puntaje: ' + game.global.score,
		{ font: "30pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 6,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	score.fixedToCamera = true;

	score.value = 0;

	score.up = upScore;
	score.set = setScore;
	score.setGlobalScore = setGlobalScore;

	return score;
}

function upScore(value){
	this.value += value;
	this.set();
}


function setScore(){
	this.text = 'Puntaje: ' + this.value;
}

function setGlobalScore(){
	game.global.score += this.value;
}