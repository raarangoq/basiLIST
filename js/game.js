// Se especifica el tamaño de ventana de 800x600
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');


game.state.add('loading', loading, true);

game.state.add('lose', lose);
game.state.add('initMenu', initMenu);
game.state.add('level1', level1);
