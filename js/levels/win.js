


var tower;
var sky;
var link;
var stairs;

var time;

var x_pos;
var y_pos;
var x_target;
var y_target;


win = {
	create: function(){
		sky = game.add.sprite(0, 0, 'sky');
		tower = game.add.sprite(0, 0, 'tower');
		this.addLink();
		stairs = game.add.sprite(0, 0, 'stairs');

		time = game.time.time;

		game.global.level++;
		game.global.is_playing = false;	
	},

	update: function(){
		if(keyboard.enterKey()){
			this.nextLevel();
		}
		this.playUp();

	},

	addLink: function(){

		this.setPos();
		link = game.add.sprite(x_pos, y_pos, 'link');
		game.physics.enable(link, Phaser.Physics.ARCADE);
		link.scale.setTo(-0.4, 0.4);

		this.setTarget();
		game.physics.arcade.moveToXY(link, x_target, y_target, 60);
	},

	nextLevel: function(){
		game.global.is_playing = true;
		game.state.start('levels');
	},

	playUp: function(){
		var local_time = game.time.time - time;

		if(game.physics.arcade.distanceToXY(link, x_target, y_target) <= 1)
			link.body.velocity.setTo(0, 0);

		if(local_time > 5000){
			this.nextLevel();
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
	},

	setTarget: function(){
		if(game.global.level == 1){
			x_target = 500;
			y_target = 355;
		}
		else if(game.global.level == 2){
			x_target = 500;
			y_target = 287;
		}
		else if(game.global.level == 3){
			x_target = 497;
			y_target = 230;
		}
		else if(game.global.level == 4){
			x_target = 470;
			y_target = 130;
		}
	}
}