class HIGHSCORE extends Phaser.Scene {
    constructor(){
        super("Highscore")
    }

    create(){
        this.cameras.main.setBackgroundColor('#000');
        const scoreElement = document.getElementsByClassName('score-amount')[0];
        const currentScore = Number(scoreElement.innerText);
        const high="the Highest score is : "+localStorage.getItem("HighScore")
        const current="Your Score is : "+currentScore.toString()
         this.add.text(200,50,current,style)
         this.add.text(200,150,high,style)
         this.add.text(200,400,"Press SPACE to restart",style)
         this.inputs = this.input.keyboard.createCursorKeys();
    }
       update(){
        const scoreElement = document.getElementsByClassName('score-amount')[0];
        scoreElement.innerText=0
        const coinElement = document.getElementsByClassName('coin-amount')[0];
        coinElement.innerText=0
        const livesElement = document.getElementsByClassName('live-amount')[0];
        livesElement.innerText = 5;
        if (this.inputs.space.isDown){
            this.scene.start("Game")
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
              fill: "aqua",
              fontFamily: "CustomFont",
              lineSpacing: 19,
              align: "left",
              boundsAlignH: "left",
              boundsAlignV: "top",
              wordWrap: true,
              wordWrapWidth: 300,
            };
      export default HIGHSCORE
    