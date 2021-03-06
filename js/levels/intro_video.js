var tower;
var sky;
var tower_stairs;
var dialog01;
var dialog02;
var link;
var cloud;
var enter_dialog;

var music;

var time;

var text;

intro_video = {
	create: function(){
		sky = game.add.sprite(0, 0, 'sky');

		cloud = game.add.sprite(100, 100, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 2;
		cloud = game.add.sprite(-30, 300, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 3;
		cloud = game.add.sprite(400, 400, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 3;

		tower = game.add.sprite(0, 0, 'tower');
		stairs = game.add.sprite(0, 0, 'stairs');


		dialog01 = game.add.sprite(230, 300, 'dialog01');
		dialog01.visible = false;
		dialog02 = game.add.sprite(260, 300, 'dialog02');
		dialog02.visible = false;
		enter_dialog = game.add.sprite(50, 550, 'enterkey');

		link = game.add.sprite(1000, 600, 'link');
		link.animations.add('go', [0, 1, 2, 3], 10, true);
		link.animations.play('go');

		game.physics.enable(link, Phaser.Physics.ARCADE);
		link.scale.setTo(1.5, 1.5);

		game.global.is_playing = false;
		time = game.time.time;
		game.physics.arcade.moveToXY(link, 550, 350, 350);

		music = game.add.sound('start', 0.6);
		music.play();

//text = game.add.text(20, 540, link.body.x, { fontSize: '28px', fill: '#000'});
//text.fixedToCamera = true;	

	},

	update: function(){
		if(keyboard.enterKey()){
			this.playGame();
		}

		this.playIntro();

	},


	playIntro: function(){
		var local_time = game.time.time - time;

		if( game.physics.arcade.distanceToXY(link, 550, 350) <= 10 )
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
	}, 

	render: function(){

	}
}