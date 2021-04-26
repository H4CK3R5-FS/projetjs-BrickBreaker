import increaseScore from "./increaseScore.js"
import increaseLives from "./increaseLives.js"
export default coins => {
    const coinElement = document.getElementsByClassName('coin-amount')[0];
    const currentCoin = Number(coinElement.innerText);

    coinElement.innerText = currentCoin + coins;
    if (currentCoin>=100){
        coinElement.innerText = currentCoin -100
        increaseScore(1000)
        increaseLives(1)
    }
};