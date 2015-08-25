var tower;
var sky;
var tower_stairs;
var dialog01;
var dialog02;
var link;

var music;

var time;

intro_video = {
	create: function(){
		sky = game.add.sprite(0, 0, 'sky');
		tower = game.add.sprite(0, 0, 'tower');
		stairs = game.add.sprite(0, 0, 'stairs');

		dialog01 = game.add.sprite(0, 0, 'dialog01');
		dialog01.visible = false;
		dialog02 = game.add.sprite(0, 0, 'dialog02');
		dialog02.visible = false;
		link = game.add.sprite(1000, 400, 'link');
		game.physics.enable(link, Phaser.Physics.ARCADE);
		link.scale.setTo(4, 4);

		game.global.is_playing = false;
		time = game.time.time;
		game.physics.arcade.moveToXY(link, 600, 400, 350);

		music = game.add.sound('start', 0.6);
		music.play();
	},

	update: function(){
		if(keyboard.enterKey()){
			this.playGame();
		}

		this.playIntro();

	},


	playIntro: function(){
		var local_time = game.time.time - time;

		if( game.physics.arcade.distanceToXY(link, 600, 400) <= 10 )
			link.body.velocity.setTo(0, 0);

		if(local_time < 3000){
			return;
		}
		else if(local_time < 10000){
			dialog01.visible = true;
		}
		else if(local_time < 20000){
			dialog01.visible = false;
			dialog02.visible = true;
		}
		else if(local_time < 25000){
			dialog02.visible = false;
			game.physics.arcade.moveToXY(link, 1200, 1000, 300);
		} 
		//else{
		//	this.playGame();
		//}
	},

	playGame: function(){
		game.global.is_playing = true;
		music.destroy();
		game.state.start('levels');
	}
}