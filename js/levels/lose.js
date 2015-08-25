var tower;
var sky;
var link;
var stairs;
var image;

var time;

var x_pos;
var y_pos;

var sound;

lose = {
	create: function(){
		sky = game.add.sprite(0, 0, 'sky');
		tower = game.add.sprite(0, 0, 'tower');
		stairs = game.add.sprite(0, 0, 'stairs');
		this.addLink();
		image = game.add.sprite(0, 0, 'lose');
		image.visible = false;

		time = game.time.time;

		game.global.is_playing = false;

		sound = game.add.audio('droping', 0.5);
		sound.play();
	},

	update: function(){
		if(keyboard.enterKey()){
			game.global.level = 1;
			game.global.is_playing = true;
			game.state.start('levels');
		}
		this.playDown();


	},

	addLink: function(){

		this.setPos();
		link = game.add.sprite(x_pos, y_pos, 'link');
		game.physics.enable(link, Phaser.Physics.ARCADE);
		link.body.gravity.setTo(0, 50);
		link.scale.setTo(-0.4, 0.4);
		link.pivot.setTo(16, 24);
		link.body.velocity.setTo( 100, -40);
		link.body.angularVelocity = 540;

	},

	playDown: function(){
		if(game.time.time - time > 5000){
			image.visible = true;
			link.destroy();
		}
	},

	setPos: function(){
		if(game.global.level == 1){
			x_pos = 470;
			y_pos = 410;
		}
		else if(game.global.level == 2){
			x_pos = 470;
			y_pos = 350;
		}
		else if(game.global.level == 3){
			x_pos = 470;
			y_pos = 280;
		}
		else if(game.global.level == 4){
			x_pos = 470;
			y_pos = 222;
		}
		else if(game.global.level == 5){
			x_pos = 470;
			y_pos = 130;
		}

	}
}