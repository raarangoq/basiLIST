
// Variables para controlar la entrada por teclado
var keyboard;

var text;

loading = {
	preload: function(){

text = game.add.text(20, 540, 'Cargando...', { fontSize: '28px', fill: '#ffffff'});
text.fixedToCamera = true;

	game.load.image('tower', 'assets/pics/videos/herculestower.png');
	game.load.image('sky', 'assets/pics/videos/sky.png');
	game.load.image('cloud', 'assets/pics/videos/nube.png');
	game.load.image('stairs', 'assets/pics/videos/herculestowerstairs.png');
	game.load.image('dialog01', 'assets/pics/videos/dialog01.png');
	game.load.image('dialog02', 'assets/pics/videos/dialog02.png');
	game.load.spritesheet('link', 'assets/pics/videos/link.png', 148, 150);
	game.load.spritesheet('medusa', 'assets/pics/videos/medusa.png', 128, 128);
	game.load.image('medusadialog01', 'assets/pics/videos/medusaDialog01.png');
	game.load.image('medusadialog02', 'assets/pics/videos/medusaDialog02.png');
	game.load.image('enterkey', 'assets/pics/videos/entertoplay.png');


	game.load.image('end', 'assets/pics/end.png');
	game.load.image('initmenu', 'assets/pics/initmenu.png');
	game.load.image('lose', 'assets/pics/lose.png');
	game.load.image('win', 'assets/pics/win.png');
	game.load.image('pause', 'assets/pics/pause.png');

	// Cargar ambiente del nivel 
	game.load.image('levels-ground', 'assets/pics/levels/levels-ground.png');
	game.load.image('levels-footwall', 'assets/pics/levels/footwall.png');
	game.load.image('levels-upperwall', 'assets/pics/levels/upperwall.png');
	game.load.image('levels-lateralwall', 'assets/pics/levels/lateralwall.png');
	game.load.image('levels-lateralwall2', 'assets/pics/levels/lateralwall2.png');


	game.load.spritesheet('fire', 'assets/pics/levels/fire.png', 32, 32);
	game.load.image('pedestal', 'assets/pics/levels/pedestal.png');
	game.load.spritesheet('minisnake', 'assets/pics/levels/mini-snake.png', 20, 20);
	game.load.image('minisnake-bar', 'assets/pics/levels/mini-snake-bar.png');

	// La imagen del jugador
	game.load.spritesheet('player', 'assets/pics/player.png', 70, 70);

	// Barra de salud del jugador
	game.load.image('healthbar', 'assets/pics/healthbar.png');
	game.load.spritesheet('heart', 'assets/pics/heart.png', 14, 16);

	// Los items del juego
	game.load.spritesheet('redorb', 'assets/pics/redorb.png', 30, 13);

	// La serpiente principal
	game.load.spritesheet('snake', 'assets/pics/snake.png', 50, 50);

	// El ataque del jugador
	game.load.spritesheet('attack','assets/pics/attackzone.png', 30, 30);

	game.load.audio('hit', 'assets/sounds/golpes.mp3');
	game.load.audio('droping', 'assets/sounds/caida.mp3');
	game.load.audio('environment', 'assets/sounds/el-ambiente_3.mp3');
	game.load.audio('swordair', 'assets/sounds/espada-aire.mp3');
	game.load.audio('medusa', 'assets/sounds/medusa-grito.mp3');

	game.load.audio('start', 'assets/sounds/inicio.mp3');
	game.load.audio('levelA', 'assets/sounds/levelA.mp3');
	game.load.audio('levelB', 'assets/sounds/levelB.mp3');
	game.load.audio('endsong', 'assets/sounds/final.mp3');
	game.load.audio('orb', 'assets/sounds/orbe.mp3');
	game.load.audio('roar', 'assets/sounds/rugido.mp3');


	},

	
	create: function(){
		addKeyboard();

		game.state.start('initMenu');
		//game.state.start('end');
	}
}