var tower;
var sky;
var link;
var stairs;
var image;
var medusa;
var medusa_dialog01;
var medusa_dialog02;
var enter_dialog;

var medusa_sound;
var medusa_sound_played = false;
var music;
var hit_sound;
var down_sound;

var time;

var x_pos;
var y_pos;

var setPhysics = true;
var make_hit = true;
var medusa_in_position = true;

end = {
	create: function(){
		music = game.add.audio('endsong');
		music.play();
		
		sky = game.add.sprite(0, 0, 'sky');

		cloud = game.add.sprite(400, 150, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 2;
		cloud = game.add.sprite(200, 300, 'cloud');
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 3;


		this.addMedusa();
		tower = game.add.sprite(0, 0, 'tower');
		stairs = game.add.sprite(0, 0, 'stairs');
		this.addLink();
	
		image = game.add.sprite(0, 0, 'end');
		image.visible = false;
		enter_dialog = game.add.sprite(50, 500, 'enterkey');
		enter_dialog.visible = false;


		medusa_dialog01 = game.add.sprite(0, 100, 'medusadialog01');
		medusa_dialog01.visible = false;
		medusa_dialog02 = game.add.sprite(100, 100, 'medusadialog02');

		time = game.time.time;

		game.global.is_playing = false;

		medusa_sound = game.add.audio('medusa');
		

		hit_sound = game.add.audio('hit', 0.5);
		down_sound = game.add.audio('droping', 0.5); 
	},

	update: function(){
		if(keyboard.enterKey()){
			game.global.level = 1;
			game.global.is_playing = true;
			music.destroy();
			game.state.start('introVideo');
		}
		this.playEnd();
	},

	addLink: function(){
		link = game.add.sprite(420, 193, 'link');
		link.animations.add('go', [0, 1, 2, 3], 10, true);
		link.animations.play('go');
		game.physics.enable(link, Phaser.Physics.ARCADE);
		link.scale.setTo(-0.2, 0.2);
		link.pivot.setTo(70, 70);
	},

	addMedusa: function(){
		medusa = game.add.sprite(300, 600, 'medusa');
		game.physics.enable(medusa, Phaser.Physics.ARCADE);
		medusa.animations.add('normal', [0, 1, 2, 3, 4, 5], 6, true);
		medusa.animations.add('attack', [6, 7, 8, 9], 6, false);
		medusa.animations.play('normal');
		game.physics.arcade.moveToXY(medusa, 350, 90, 200);

	},

	playMedusaSound: function(){
		if(!medusa_sound_played){
			medusa_sound_played = true;
			medusa_sound.play();
		}
	},

	playEnd: function(){

		if( game.physics.arcade.distanceToXY(medusa, 350, 90) <= 10 && medusa_in_position){
			medusa.body.velocity.setTo(0, 0);
			medusa_dialog02.visible = false;
			medusa_dialog01.visible = true;
			this.playMedusaSound();
			music.volume = 0.3;
			medusa_in_position = false;
		}
		

		var local_time = game.time.time - time;

		if (local_time < 4000){
			
		}
		else if( local_time < 7000){
			
		}
		else if(local_time < 8000){
			if(make_hit){
				medusa.animations.play('attack');
				hit_sound.play();
				make_hit = false;
			}
		}
		else if( local_time < 13000 ){
			if(setPhysics){
				link.body.gravity.setTo(0, 50);
				link.body.velocity.setTo( 100, -40);
				link.body.angularVelocity = 540;
				setPhysics = false;
				medusa.animations.play('normal');
				down_sound.play();
			}
		}
		else if( local_time < 15000){
			medusa_dialog01.visible = false;
			image.visible = true;
			enter_dialog.visible = true;
		}	

		if( local_time > 20000 )
			link.destroy();
			
	}
}