import increaseScore from "../config/increaseScore.js"
import increaseCoins from "../config/increaseCoins.js"
class Block {
    constructor(scene) {
        this.scene = scene;
        this.blocks = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        const blockObjects = this.scene.map.getObjectLayer('blocks').objects;
        this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.blocks, this.disapear, null, this);
        for (const block of blockObjects) {
            this.blocks.create(block.x, block.y-16, 'block-sprite')
            .setScale(1.2)
                .setOrigin(0)
                .setDepth(-1);
        }
        for (const block of this.blocks.children.entries) {
            block.isDed = false;
        }
    }

    disapear(){
        if (this.scene.player.sprite.body.touching.up) {
            this.vanish();
    
            return;
        }
    }
    vanish() {
        for (const block of this.blocks.children.entries) {
            if (block.body.touching.down) {
                if(block.isDed==false){
                    increaseScore(50);
                    increaseCoins(1);
                }
                // block.setVelocity(0,0)
                block.isDed = true;
                  block.play('dead-block', true);


            };
        }
    }
}

export default Block;