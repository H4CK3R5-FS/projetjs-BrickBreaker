import increaseScore from "../config/increaseScore.js"
import DecreaseLives from "../config/DecreaseLives.js"
class Goomba {
    constructor(scene) {
        this.scene = scene;
        this.goombas = this.scene.physics.add.group();
        this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.goombas, this.gameOver, null, this);
    
        const goombaObjects = this.scene.map.getObjectLayer('goombas').objects;
    
        for (const goomba of goombaObjects) {
            this.goombas.create(goomba.x, goomba.y - goomba.height, 'coin-sprite')
                 .setScale(1.2)
                .setOrigin(0)
                .setDepth(-1);
        }
    
        for (const goomba of this.goombas.children.entries) {
            goomba.direction = 'RIGHT';
            goomba.isDed = false;
        }
    
        this.scene.physics.add.collider(this.goombas, this.scene.platform);
    }
    gameOver() {
        // PHEW
        if (this.scene.player.sprite.body.touching.down) {
            this.die();
            return;
        }
           this.scene.player.dead();
          this.scene.input.keyboard.shutdown();
        //   this.sprite.setVelocityX(0);
        
         this.scene.physics.world.removeCollider(this.scene.player.collider);
         this.scene.physics.world.removeCollider(this.collider);
        
         setTimeout(() => {
             DecreaseLives(1)
             this.scene.scene.start('GameOver');
         }, 1000);
        
    }
    die() {
        for (const goomba of this.goombas.children.entries) {
            if (goomba.body.touching.up) {
                goomba.isDed = true;
                 goomba.play('goombaDie', true);
                goomba.on('animationcomplete', () => goomba.destroy());
                 increaseScore(200);
                this.scene.player.sprite.setVelocity(0, -470);
                 this.scene.player.sprite.play('jump');
            };
        }
    }
    update() {
        for (const goomba of this.goombas.children.entries) {
            if (goomba.body.blocked.right) {
                goomba.direction = 'LEFT';
            }
    
            if (goomba.body.blocked.left) {
                goomba.direction = 'RIGHT';
            }
    
            if (goomba.direction === 'RIGHT') {
                goomba.setVelocityX(100);
            } else {
                goomba.setVelocityX(-100);
            }
    
            !goomba.isDed && goomba.play('goombaRun', true);
        }
    }
}

export default Goomba;





