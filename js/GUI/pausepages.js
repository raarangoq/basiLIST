function addPausePage0(){
	var page = game.add.text(400, 150, 'Level ' + game.global.level,
		{ font: "24pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 4,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	page.anchor.setTo(0.5, 0.5);
	page.fixedToCamera = true;

	var text = game.add.text(0, 80, 
		'Acaba con los basiliscos que habitan la torre, pero ten cuidado, un mal golpe los multiplica. Y solo tocar a los basilicos te hará daño',
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600, align: 'center'});
	text.anchor.setTo(0.5, 0.5);
	page.addChild(text);

	page.setAlive = setPageAlive;
	return page;
}


function addPausePage1(){
	var page = game.add.sprite(0, 0, 'input');
	page.fixedToCamera = true;

	page.setAlive = setPageAlive;

	return page;
}

function addPausePage2(){
	var page = game.add.sprite(100, 130, 'snake');
	page.animations.add('walk', [8, 9, 10, 11, 12, 13], 8, true);
    page.play('walk');
    page.fixedToCamera = true;
	var text = game.add.text(50, 0, 
		'Cuerpo: El cuerpo del basilisco, este siempre sigue a la cabeza.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	var image = game.add.sprite(0, 70, 'snake');
	image.animations.add('walk', [0, 1], 8, true);
    image.play('walk');
	page.addChild(image);
	text = game.add.text(50, 70, 
		'Cabeza: la cabeza del basilisco, esta persigue el alimento.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3, 
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 200, 'redorb');
	image.animations.add('walk', [0, 1], 8, true);
    image.play('walk');
	page.addChild(image);
	text = game.add.text(50, 180, 
		'Alimento: Si el basilisco lo toma, este crecerá. Si tu lo tomas, te curarás.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);

	image = game.add.sprite(0, 300, 'heart');
	image.animations.add('walk', [0, 1, 2], 3, true);
    image.play('walk');
	page.addChild(image);
	text = game.add.text(50, 280, 
		'Vida: Tienes 5 vidas, los golpes del basilisco quitan media vida, y el alimento regenera media vida.', 
		{ font: "16pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3,
		wordWrap: true, wordWrapWidth: 600});
	page.addChild(text);


	page.setAlive = setPageAlive;
	return page;
}

function setPageAlive(value){
	if(value){
		this.revive();
	}
	else
		this.kill();
}