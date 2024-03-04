class Menu extends Phaser.Scene{
    constructor(){
        super({key:"Menu"})
    }

    //puxando as imagens que serão utilizadas no menu do nosso jogo, o background e o botão para iniciar a gameplay
    preload(){
        this.load.image('background', 'assets/menu.png');
        this.load.image('button', 'assets/Play.png');
    }

    create(){
        //ajustando o tamanho do background
        this.add.image(larguraJogo/2, alturaJogo/2, 'background');
        //configurando o botão para iniciar a fase e chamar a Fase1 para ser iniciada
        this.add.image(500,840, 'button').setScale(3).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,() =>{
            this.scene.stop("Menu");
            this.scene.start("Fase1");
        });
    }

}