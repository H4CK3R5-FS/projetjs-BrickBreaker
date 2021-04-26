import Phaser from 'Phaser'
import GameOver from "../js/config/GameOver.js"
import Game from "./scenes/Game.js";
import PAUSE from "./scenes/Pause.js"
import HIGHSCORE from "./scenes/Highscore.js"
import GameWon from "../js/config/Gamewon.js"
const config = {
  width: 1200,
  height: 600,
  parent: "mario",
   backgroundColor: "#FFFFAC",
  title: "Tilemap",
  //  url: 'webtips.dev',
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
        //  debug: true, // Set it to true if you want debugger enabled by default
      gravity: {
        y: 1000,
      },
    },
  },
  scene: [Game,GameOver,PAUSE,HIGHSCORE,GameWon],
  // addAudio: {
      
  //   playAudio: () => {
      
  //   },      
  //   pauseAudio: () => {
      
  //   },      
  //   removeAudio: () => {
      
  //   }
  // }
};

new Phaser.Game(config);
