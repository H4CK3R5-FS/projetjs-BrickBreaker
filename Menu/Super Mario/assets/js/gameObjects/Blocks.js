import increaseScore from "../config/increaseScore.js"
import increaseCoins from "../config/increaseCoins.js"
const audio = require("../config/addAudio").bumpAudio;

//Blocks a le meme principe que bouncy mais au lieu de le toucher en haut on le touche en bas et on active son animation de mort
//(pour qu'il soit marron)
//le changement c'est dans vanish
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

    //vanish permet de changer les briques en des briques marron(briques morts)
    vanish() {

        //pacour des briques
        for (const block of this.blocks.children.entries) {

            //on l'a touché en bas
            if (block.body.touching.down) {

                //si le brique n'est pas mort on ajoute le score et le nombre des pièces
                if(block.isDed==false){
                    increaseScore(50);
                    increaseCoins(1);
                }

                // l'audio des briques
                audio.play()

                //on change l'etat du brique
                block.isDed = true;

                //on fait l'animation
                  block.play('dead-block', true);


            };
        }
    }
}

export default Block;