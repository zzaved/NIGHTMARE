let personagem;
let chao;
let teclado;
let plataforma;
let plataforma2;
let coracao;
let placar;
let pontuacao = -1;
let vitoria;

class Fase1 extends Phaser.Scene{
    constructor(){
        super({key:"Fase1"})
    }

    preload(){
        this.load.image('background-fase-1', 'assets/background-fase-1.png');
        this.load.image('button', 'assets/Play.png');
        this.load.image('chao', 'assets/chao.png');
        this.load.spritesheet('personagem', 'assets/vampire/Run (32x32).png', {frameWidth: 32, frameHeight: 32});
        this.load.image('plataforma', 'assets/plataforma.png');
        this.load.image('plataforma2', 'assets/plataforma.png');
        this.load.image('coracao', 'assets/coracao.png');
    }

    create(){
        this.add.image(larguraJogo/2, alturaJogo/2, 'background-fase-1');
        //essa função cria a figura do personagem para ser aplicada no jogo e a posição inicial dele
        personagem = this.physics.add.sprite(larguraJogo/2, 0, 'player').setScale(3);
        personagem.setCollideWorldBounds(true);
        personagem.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('personagem', {start: 0, end: 11}),
            frameRate: 10,
            repeat: -1
        });

        //aqui eu criei a função para que o teclado seja útil ao longo do jogo para controlar o nosso personagem
        teclado = this.input.keyboard.createCursorKeys();
        
        //adiciona o chao para que o personagem não chegue até o fundo da imagem
        chao = this.physics.add.staticImage(500, 940, 'chao').setScale(1.5).setSize(1500, 200);
        //adicionei o collider para que o personagem não atravesse o chão
        this.physics.add.collider(personagem, chao);

        //adicionando a primeira plataforma no nosso jogo
        plataforma = this.physics.add.staticImage(100, 660, 'plataforma');
        //adicionei o collider para que o allien não atravesse a plataforma
        this.physics.add.collider(personagem, plataforma);

        //adicione a segunda plataforma
        plataforma2 = this.physics.add.staticImage(800, 400, 'plataforma2');
        //mesma lógica para que o personagem não atravesse a plataforma
        this.physics.add.collider(personagem, plataforma2);

            //adicionando coracao ao nosso jogo
            coracao = this.physics.add.sprite(larguraJogo/2, 0, 'coracao').setScale(0.5);
            //essa função configura a colisão da coracao com os limites do jogo, permitindo que ela não saia para fora da tela
            coracao.setCollideWorldBounds(true);
            //forma da coracao quicar
            coracao.setBounce(0.5);
            //adicionando a colisão abaixo da coracao com os elementos que não podem ser ultrapassados no nosso jogo, no caso as duas plataformas e o chão
            this.physics.add.collider(coracao, plataforma);
            this.physics.add.collider(coracao, plataforma2);
            this.physics.add.collider(coracao, chao);

            //adicionando o placar ao jogo e configurando como ele será exibido, desde o tamanho da fonte até a variável da quantidade de pontuação
            placar = this.add.text(50, 50, 'coracaos:' + pontuacao, {fontSize:'45px', fill:'#ffffff'});
            vitoria = this.add.text(140,500, 'Você é um vampiro!', {fontSize: '70px', fill: '#ffffff'}).setVisible(false);


            //abaixo a função da mecanica da coleta de coracaos no nosso jogo:
            this.physics.add.overlap(personagem,coracao, function(){
                //quando o personagem encosta na coracao ela irá desaparecer
                coracao.setVisible(false); 
                //essa função abaixo sorteia um número aleatório entre 50 e 650 (limites da tela) para a coracao spawnar em meio ao jogo
                var posicaocoracao_Y = Phaser.Math.RND.between(100, 1000);
                var posicaocoracao_X = Phaser.Math.RND.between(100, 600);
                //essa função também é responsável pelo ajuste da posição da coracao
                coracao.setPosition(posicaocoracao_Y, posicaocoracao_X);
                //responsável por aumentar a pontuação ao personagem encostar na coracao
                pontuacao +=1;
                //texto que irá aparecer no placar
                placar.setText('corações arrancados: ' + pontuacao);
                //após a coracao ser coletada, ela irá spawnar novamente e ficará visível
                coracao.setVisible(true);
            });


    }

    update(){
        personagem.anims.play('run', true);

        //adicionei o collider para que o allien não atravesse o chão
        this.physics.add.collider(personagem, chao);

        //movimentação para a esquerda do personagem de acordo com o teclado
        if(teclado.left.isDown) {
            //controle de velocidade da movimentação e sentido
            personagem.setFlipX(true);
            personagem.setVelocityX(-150);
        }

        //movimento para a direita do personagem 
        else if(teclado.right.isDown) {
            personagem.setFlipX(false);
            //velocidade de movimentação e sentido
            personagem.setVelocityX(150);
        }
        
        //se não foi pra cima nem pro baixo nem pro lado o personagem ficará em repouso
        else{
            personagem.setVelocityX(0);
        }

        //movimento para cima do personagem 
        if (teclado.up.isDown && personagem.body.touching.down){
            personagem.setVelocityY(-400);
            //quando o personagem voa para cima, é ativada a função do foguinho
        }

        if (pontuacao == 5){
            vitoria.setVisible(true);
            placar.setVisible(false);
        }

    }

}