import audio from "../config/addAudio.js"

class GameWon extends Phaser.Scene {

    constructor () {
        super('GameWon');
        this.audio = audio;
    }

    create() {
        this.cameras.main.setBackgroundColor('#000');

       this.add.text(575,200,"You Win ! !",style)
       this.add.text(480,350,"Press SPACE to Continue",style)

       this.inputs = this.input.keyboard.createCursorKeys();
    }
    update(){
              
      this.audio.audio.remove();
        const scoreElement = document.getElementsByClassName('score-amount')[0];
        const currentScore = Number(scoreElement.innerText);

            if (this.inputs.space.isDown){
                    this.scene.start("Highscore")
                    this.scene.stop()
            }

               if(localStorage.getItem("HighScore")==null){
                  localStorage.setItem("HighScore",currentScore)
              }else if (Number(localStorage.getItem("HighScore"))<currentScore){
                localStorage.setItem("HighScore",currentScore)
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
export default GameWon;