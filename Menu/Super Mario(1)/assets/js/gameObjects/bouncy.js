class Bounce{
    constructor(scene){
        this.scene = scene;
        this.bounces = this.scene.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        const bounceObjects = this.scene.map.getObjectLayer('bounce').objects;
        this.collider = this.scene.physics.add.collider(this.scene.player.sprite, this.bounces, this.bounce, null, this);
        for (const bouncy of bounceObjects) {
            this.bounces.create(bouncy.x, bouncy.y-16, 'bouncy-platform')
            // .setScale(1.2)
                .setOrigin(0)
                .setDepth(-1);
        }
    }
    bounce(){
        if (this.scene.player.sprite.body.touching.down) {
            return this.fly();
        }
    }
    fly() {
        for (const bouncy of this.bounces.children.entries) {
            if (bouncy.body.touching.up) {
                return true
            };
        }
    }
}
export default Bounce