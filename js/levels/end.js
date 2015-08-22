var tower;
var sky;
var link;
var stairs;
var image;
var medusa;
var medusa_dialog01;
var medusa_dialog02;

var time;

var x_pos;
var y_pos;

var setPhysics = true;

end = {
	create: function(){
		sky = game.add.sprite(0, 0, 'sky');
		this.addMedusa();
		tower = game.add.sprite(0, 0, 'tower');
		stairs = game.add.sprite(0, 0, 'stairs');
		this.addLink();
		


		image = game.add.sprite(0, 0, 'end');
		image.visible = false;
		medusa_dialog01 = game.add.sprite(0, 100, 'medusadialog01');
		medusa_dialog01.visible = false;
		medusa_dialog02 = game.add.sprite(100, 100, 'medusadialog02');

		time = game.time.time;

		game.global.is_playing = false;
	},

	update: function(){
		if(keyboard.enterKey()){
			game.global.level = 1;
			game.global.is_playing = true;
			game.state.start('introVideo');
		}
		this.playEnd();
	},

	addLink: function(){
		link = game.add.sprite(470, 140, 'link');
		game.physics.enable(link, Phaser.Physics.ARCADE);
		link.scale.setTo(-0.4, 0.4);
		link.pivot.setTo(16, 24);
	},

	addMedusa: function(){
		medusa = game.add.sprite(400, 400, 'medusa');
		game.physics.enable(medusa, Phaser.Physics.ARCADE);
		medusa.animations.add('normal', [0, 1, 2, 3, 4, 5], 6, true);
		medusa.animations.add('attack', [6, 7, 8, 9], 6, false);
		medusa.animations.play('normal');
		game.physics.arcade.moveToXY(medusa, 400, 100, 200);
	},

	playEnd: function(){

		if( game.physics.arcade.distanceToXY(medusa, 400, 50) <= 10 ){
			medusa.body.velocity.setTo(0, 0);
			medusa_dialog02.visible = false;
		}

		var local_time = game.time.time - time;

		if (local_time < 4000){
			return;
		}
		else if( local_time < 7000){
			medusa_dialog01.visible = true;
		}
		else if(local_time < 8000){
			medusa_dialog01.visible = false;
			medusa.animations.play('attack');
		}
		else if( local_time < 13000 ){
			if(setPhysics){
				link.body.gravity.setTo(0, 50);
				link.body.velocity.setTo( 100, -40);
				link.body.angularVelocity = 540;
				setPhysics = false;
				medusa.animations.play('normal');
			}
		}
		else if( local_time < 15000){
			image.visible = true;
		}	

		if( local_time > 20000 )
			link.destroy();
			
	}
}