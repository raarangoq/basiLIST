





function addSnake(){
	snake = game.add.sprite(1000, 600, 'snake');
	game.physics.enable(snake, Phaser.Physics.ARCADE);

	snake.body.colliderWorldBounds = true;
	snake.body.setSize(32, 32, 9, 9);   // Reajustar el collider del jugador, para que solo cubra el cuerpo

	addSnakeAnimations();

	snake.direction = "front";
}



function addSnakeAnimations(){
	var frames_per_second = 8;

	snake.animations.add('head_front', [0, 1], frames_per_second, true);
	snake.animations.add('head_left', [2, 3], frames_per_second, true);
	snake.animations.add('head_right', [6, 7], frames_per_second, true);
	snake.animations.add('head_back', [4, 5], frames_per_second, true);

	snake.animations.add('body', [8, 9, 10], frames_per_second, true);

	snake.animations.add('tail_front', [11], frames_per_second, true);
	snake.animations.add('tail_left', [12], frames_per_second, true);
	snake.animations.add('tail_right', [14], frames_per_second, true);
	snake.animations.add('tail_back', [13], frames_per_second, true);
}