import audio from "../config/addAudio.js"

class GameOver extends Phaser.Scene {

    constructor () {
        super('GameOver');
        this.audio = audio;
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');
        const livesElement = document.getElementsByClassName('live-amount')[0];
        const currentLives = Number(livesElement.innerText);
        if(currentLives>0){
       this.add.text(575,200,"You Are Dead",style)
       this.add.text(480,350,"Press SPACE to Restart",style)
        }
       this.inputs = this.input.keyboard.createCursorKeys();
    }
    update(){
              
      this.audio.audio.remove();
        const scoreElement = document.getElementsByClassName('score-amount')[0];
        const currentScore = Number(scoreElement.innerText);
        const livesElement = document.getElementsByClassName('live-amount')[0];
        const currentLives = Number(livesElement.innerText);
         if(currentLives>0){
            if (this.inputs.space.isDown){
                    // this.scene.stop("Game")
                     this.scene.start("Game")
                    this.scene.stop()
            }
         }else{
               if(localStorage.getItem("HighScore")==null){
                  localStorage.setItem("HighScore",currentScore)
              }else if (Number(localStorage.getItem("HighScore"))<currentScore){
                localStorage.setItem("HighScore",currentScore)
              }
               this.scene.start("Highscore")
               this.scene.stop()
         }
    }
}
function loadFont(name, url) {
  const newFont = new FontFace(name, `url(${url})`);
  newFont
    .load()
    .then(function (loaded) {
      document.fonts.add(loaded);
    })
    .catch(function (error) {
      return error;
    });
}
loadFont("CustomFont","../assets/fonts/slkscreb.ttf")
      const style = {
        fontSize: "35px" ,
        fill: "white",
        fontFamily: "CustomFont",
        lineSpacing: 19,
        align: "left",
        boundsAlignH: "left",
        boundsAlignV: "top",
        wordWrap: true,
        wordWrapWidth: 300,
      };
export default GameOver;