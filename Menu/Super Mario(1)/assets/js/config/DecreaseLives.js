export default Lives => {
    const livesElement = document.getElementsByClassName('live-amount')[0];
    const currentLives = Number(livesElement.innerText);

    livesElement.innerText = currentLives - Lives;
};