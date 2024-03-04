class Menu extends Phaser.Scene{
    constructor(){
        super({key:"Menu"})
    }

    preload(){
        this.load.image('background', 'assets/menu.png');
        this.load.image('button', 'assets/Play.png');
    }

    create(){
        this.add.image(larguraJogo/2, alturaJogo/2, 'background');
        this.add.image(500,840, 'button').setScale(3).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,() =>{
            this.scene.stop("Menu");
            this.scene.start("Fase1");
        });
    }

    update(){

    }

}