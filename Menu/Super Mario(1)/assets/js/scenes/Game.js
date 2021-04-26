import Player from "../gameObjects/player.js";
import Coin from "../gameObjects/Coin.js"
import Goomba from "../gameObjects/Goomba.js"
import Block from "../gameObjects/Blocks.js"
import Bounce from "../gameObjects/bouncy.js"
import audio from "../config/addAudio.js"

import generateAnimations from '../config/animations'
class Game extends Phaser.Scene {

    constructor () {
        super('Game');
        this.audio = audio;
    }
    preload() {

        this.load.tilemapTiledJSON('map', './MAP_MARIO.json');
        this.load.image('tiles', './assets/img/map.png');
        this.load.spritesheet("mario-sprite", "./assets/img/mario-sprite.png", {
            frameWidth: 34,
            frameHeight: 39,
          });
          this.load.on('complete', () => {
            generateAnimations(this);
        });
        this.load.spritesheet("coin-sprite", "./assets/img/coins.png", {
            frameWidth: 16,
            frameHeight: 16,
          });
        this.load.spritesheet("block-sprite", "./assets/img/blocks.png", {
            frameWidth: 16,
            frameHeight: 16,
          });
        this.load.spritesheet("dead-block-sprite", "./assets/img/deadblock.png", {
            frameWidth: 16,
            frameHeight: 16,
          });
        this.load.spritesheet("bouncy-platform", "./assets/img/bounce.png", {
            frameWidth: 16,
            frameHeight: 16,
          });
    }

    create() {
      /*** Remise à 0 du audio avant de le faire activer***/
       this.audio.audio.currentTime = 0;
       this.audio.audio.play();
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('map-tileset', 'tiles');
        this.platform = this.map.createStaticLayer('platform', this.tileset, 0, 0);
        this.player=this.map.createStaticLayer('background', this.tileset, 0, 0);
        this.platform.setCollisionByExclusion(-1, true);
        this.player=new Player(this, 25, 325);
        this.goombas = new Goomba(this);
        this.blocks = new Block(this);
        this.coins = new Coin(this);
        this.bounces = new Bounce(this);
         this.inputs = this.input.keyboard.createCursorKeys();
         this.coins.update();
    }
    
    update() {
      
      let paused= false
      console.log(paused)
         this.player.update(this.inputs);
          this.goombas.update();
           if(this.inputs.shift.isDown){
             this.scene.launch('PauseGame')
             this.scene.pause();
           }
    }
}

export default Game;