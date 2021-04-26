import DecreaseLives from "../config/DecreaseLives.js"
import audio from "../config/addAudio.js"
// import playAudio from "../config/playaudio"
class Player {
  constructor(scene, x, y) {
    this.audio = audio;
    // this.playaudio=playAudio
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, "mario-sprite").setScale(1.2);
    this.sprite.setSize(15, 30);
    this.sprite.setOffset(10, 4);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.isDed = false;
    this.collider = scene.physics.add.collider(this.sprite, scene.platform);
    const camera = scene.cameras.main;

      camera.setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels)
      camera.zoom=1.8
      camera.startFollow(this.sprite);
        camera.setDeadzone(scene.game.config.width / 4, scene.game.config.height)
  }

  reFollowPlayer() {
    this.scene.physics.world.bounds.setPosition(this.scene.cameras.main.worldView.x, 0);

    if (this.sprite.body.position.x + this.sprite.body.width / 2 > this.scene.cameras.main.midPoint.x &&
        !this.scene.cameras.main._follow) {
        this.scene.cameras.main.startFollow(this.sprite);
    }
}

  update(input) {
    // Mario is moving to the left
    if (input.left.isDown) {
      this.sprite.setVelocityX(-200);

    //   scene.cameras.main.stopFollow(this.sprite);
    !this.sprite.isDed &&this.sprite.body.onFloor() && this.sprite.play("run-left", true);
      this.reFollowPlayer();
        // this.scene.cameras.main.stopFollow(this.sprite);

      // Mario is moving to the right
    } else if (input.right.isDown) {
      this.sprite.setVelocityX(200);
      !this.sprite.isDed &&this.sprite.body.onFloor() && this.sprite.play("run-right", true);
      this.reFollowPlayer();
    } else {
      // Mario is standing still
      this.sprite.setVelocityX(0);
      !this.sprite.isDed &&this.sprite.body.onFloor() && this.sprite.play("idle", true);
    }

    // Mario is jumping
    if (input.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-370);
      if (input.left.isDown) {
        this.sprite.play("jump-left", true);
      } else {
        this.sprite.play("jump-right", true);
      }
    }
     if(this.scene.bounces.bounce()){
       this.sprite.play("jump")
       this.sprite.setVelocity(0,-650);
     }

    //out of bound
    if ((this.sprite.y>460) &&(!this.sprite.isDed)){
      //  Game.audio.stop()
       this.scene.scene.start('GameOver');
       DecreaseLives(1)
    }
    if(this.sprite.x>6803){
      this.scene.scene.start("GameWon")
    }
    // this.stop_audio(out)
  }
  // stop_audio(verif){
  //   if (verif==true){
  //     return true
  //   }
  //   return false
  // }
  dead() {
    this.sprite.isDed = true;
    this.sprite.setVelocity(0, -350);
     this.sprite.play('die', true);
    this.sprite.setCollideWorldBounds(false);
}
}

export default Player;
