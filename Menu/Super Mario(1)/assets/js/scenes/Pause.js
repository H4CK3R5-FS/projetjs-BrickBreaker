class PAUSE extends Phaser.Scene {
constructor(){
    super("PauseGame")
}
create(){
    this.add.text(575,200,"PAUSE",{fontSize:"28px",fill: "blue",})
    this.inputs = this.input.keyboard.createCursorKeys();
}
   update(){
      if(this.inputs.shift.isDown){
          this.scene.resume('Game');
          this.scene.stop();
      }

  }
}
 

 export default PAUSE;