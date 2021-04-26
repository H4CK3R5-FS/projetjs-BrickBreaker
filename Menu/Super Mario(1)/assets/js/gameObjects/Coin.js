import increaseScore from "../config/increaseScore.js"
import increaseCoins from "../config/increaseCoins.js"
class Coin {
    constructor(scene) {
        this.scene = scene;
        this.coins = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        const coinObjects = this.scene.map.getObjectLayer('coins').objects;
        
        for (const coin of coinObjects) {
            this.coins.create(coin.x, coin.y-16, 'coin-sprite')
                .setOrigin(0)
                .setDepth(-1);
        }


    }
    collect(coin) {
        this.scene.tweens.add({
            targets: coin,
            ease: 'Power1',
            scaleX: 0,
            scaleY: 0,
            duration: 200,
            onComplete: () => coin.destroy()
        });
        
        increaseScore(10);
        increaseCoins(1);
    
        coin.collider.destroy();
    }
    update() {
        for (const coin of this.coins.children.entries) {
            coin.play('spin', true);
        }
        for (const coin of this.coins.children.entries) {
            coin.collider = this.scene.physics.add.overlap(coin, this.scene.player.sprite, this.collect, null, this);
        }

    }

}

export default Coin;