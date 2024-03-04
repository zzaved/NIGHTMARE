const larguraJogo = 1000;
const alturaJogo = 1000;

const config = {
    //essa linha serve para que o nosso jogo tenha uma renderização automática com a biblioteca Phaser
    type: Phaser.AUTO,
    //como explicado acima, aqui eu defini que a largura do meu jogo é o comprimento da variável definida
    width: larguraJogo,
    //como explicado, aqui eu defini que a altura do meu jogo será o valor da variável definidia acima
    height: alturaJogo,

    //abaixo, vamos definir como irá funcionar a física do nosso jogo
    physics: {
        default: 'arcade',
        //abaixo, eu defino o peso da gravidade do nosso jogo e ativo o debug para conseguir visualizar os limites dos elementos do nosso jogo.
        arcade: {
            gravity: {y: 300},
        }
    },

    scene:[Menu, Fase1]
};

//essa constante é responsável por criar o game no phaser
const game = new Phaser.Game(config);
