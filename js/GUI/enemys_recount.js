

var enemys_animatios = [];
var enemys_counts = [];
var enemys_bars = [];

function addCountEnemy(){
	
	addEnemyLine();
}


function updateCountEnemy(){
	for(var i=0; i<enemys_counts.length; i++){
		enemys_animatios[i].destroy();
		enemys_counts[i].destroy();
		enemys_bars[i].destroy();
	}

	addEnemyLine();

}

function addEnemyLine(){
	for(var i=0; i< snakeHeads.length; i++){
		enemys_bars[i] = game.add.sprite(680, 15+i*50, 'minisnake-bar');
		enemys_bars[i].scale.setTo(2, 2);
		enemys_bars[i].fixedToCamera = true;
		enemys_animatios[i] = game.add.sprite(680, 15+ i*50,'minisnake');
		enemys_animatios[i].scale.setTo(2, 2);
		enemys_animatios[i].fixedToCamera = true;
		enemys_counts[i] = game.add.text(720, 10+ i*50, snakeHeads[i].lengthSnake(), { fontSize: '24px', fill: '#ffffff'});
		enemys_counts[i].scale.setTo(2, 2);
		enemys_counts[i].fixedToCamera = true;
	}
}