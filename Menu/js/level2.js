let player,
    ball,
    cursors,
    BRICKS,

    interval = 0;

H = 40;
D = 20;

let gameStarted = false;

const config = {
    //La propriété type indique à Phaser quel moteur de rendu utiliser.
    //Phaser peut rendre notre jeu en utilisant l'élément WebGL ou Canvas de HTML5.
    // En définissant le type sur Phaser.AUTO Phaser utilisera le bon moteur de rendu automatiquement
    type: Phaser.AUTO,
    // backgroundColor: 'rgba(255,110,110,0.5)',
    //La propriété parent indique l'ID de l'élément HTML dans lequel notre jeu sera joué avec l'hauteur et largeur.
    parent: "game",
    width: 800,
    heigth: 500,
    scale: {
        //Le mode indique à Phaser comment utiliser l'espace de notre élément parent.
        //Dans ce cas, nous nous assurons que le jeu correspond à la taille du parent
        mode: Phaser.Scale.RESIZE,

        //autoCenter indique à Phaser comment centrer notre jeu au sein de parent
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    //Dans Phaser, notre logique de jeu est définie dans scene
    scene: {
        preload,
        create,
        update,
    },

    //physics indique à Phaser quel moteur physique utiliser.
    //Phaser peut utiliser 3 moteurs physiques différents: Arcade, Impact et Matter.
    //Arcade est le plus simple pour commencer et suffisant pour nos besoins pour finir ce jeu
    physics: {
        default: "arcade",
        arcade: {
            gravity: false,
        },
    },
};

// Create the game instance
var game = new Phaser.Game(config);

// preload est utiliée pour charger tous les images necessaires pour lancer le jeu sans ralentissements
function preload() {
    this.load.image(
        "Background",
        "https://www.francetvinfo.fr/pictures/YJz5kCPGjhO5-1HG_lNaqDe89Tk/752x423/2020/10/22/php8UWHE3.jpg"
    );
    this.load.image("paddle" , "assets/img/paddle.png"       );
    this.load.image("ball"   , "assets/img/Ball.png"         );

    this.load.image("blue"   , "assets/img/Blue Brick.png"   );
    this.load.image("green"  , "assets/img/Green Brick.png"  );
    this.load.image("violet" , "assets/img/Violet Brick.png" );
    this.load.image("red"    , "assets/img/Red Brick.png"    );
}

function create() {
    openingText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 1.5,
        "Press SPACE to Start", {
        fontFamily: "Monaco, Courier, monospace",
        fontSize: "50px",
        fill: "#fff",
    }
    );

    openingText.setOrigin(0.5);
    //affichage du joueur
    player = this.physics.add.sprite(
        635, // position x
        585, // position y
        "paddle" // l'identifiant d'image pour le sprite
    );
    //affichage du ballon
    ball = this.physics.add.sprite(
        400, // x position
        555, // y position
        "ball" // key of image for the sprite
    );



    BRICKS = this.physics.add.group({ immovable: true })

    let tabbrick = [
     
        ["red",""   ,""   ,""   ,""   ,""   ,""   ,""   ,""   ,""   ,""   ,"red"],
        ["red","red",""   ,""   ,""   ,""   ,""   ,""   ,""   ,""   ,"red","red"],
        ["red","red","red",""   ,""   ,""   ,""   ,""   ,""   ,"red","red","red"],
        ["red","red","red","red",""   ,""   ,""   ,""   ,"red","red","red","red"],
        ["red","red","red","red","red",""   ,""   ,"red","red","red","red","red"],
        [],
        [],
        [],
    ]


    tabbrick.reverse().forEach((element, i) => {

        element.forEach((element2, j) => {

            if (element2 != "") { BRICKS.create(95 + j * 100, (8 - i) * H + D, element2) }
        });
    });

    //cursors est un object qui sert à déplacer le joueur en utilisant les touches du clavier
    cursors = this.input.keyboard.createCursorKeys();

    //ajouter la collision pour le joueur
    player.setCollideWorldBounds(true);

    //Ajouter la collision pour le ballon
    ball.setCollideWorldBounds(true);
    this.physics.world.checkCollision.down = false;

    this.physics.add.collider(ball, player, hitPlayer, null, this);
    this.physics.add.collider(ball, BRICKS, hitBrick, null, null);

    ball.setBounce(1, 1);
    player.setImmovable(true);

    // créer le texte "game over"
    gameOverText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 1.5,
        "Game Over !!!", {
        fontFamily: "Monaco, Courier, monospace",
        fontSize: "50px",
        fill: "#03bcf4",
    }
    );

    gameOverText.setOrigin(0.5);

    // Rendez-le invisible jusqu'à ce que le joueur perde
    gameOverText.setVisible(false);

    // créer le texte "gagnant"
    playerWonText = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        "You won!", {
        fontFamily: "Monaco, Courier, monospace",
        fontSize: "50px",
        fill: "#fff",
    }
    );

    playerWonText.setOrigin(0.5);

    // Rendez-le invisible jusqu'à ce que le joueur gagne
    playerWonText.setVisible(false);
}
//cette fonction donne vrai si la balle est sortie du canvas
function isGameOver(world) {
    return ball.body.y > world.bounds.height;
}
//cette fonction donne vrai si tous les briques sont disparus
const isWon = () => !BRICKS.countActive()

function update() {
    // on verifie si le ballon est sortie du canvas
    if (isGameOver(this.physics.world)) {
        //si le joueur a perdu

        //on affiche le texte "game over"
        gameOverText.setVisible(true);

        //la disparition du ballon
        ball.disableBody(true, true);
    } else if (isWon()) {
        // si le joueur a gagné

        // on affiche le texte "you win"
        playerWonText.setVisible(true);

        //la disparition du ballon
        ball.disableBody(true, true);
    } else {
        //le jeu n'est pas encore fini(ni gagant ni perdant)

        if (!gameStarted) {
            //le jeu n'a pas encore commencé

            ball.setX(player.x); //pour que le ballon suit le joueur

            if (cursors.space.isDown) {
                //si on appuie sur "espace" le jeu va commencer

                gameStarted = true;

                ball.setVelocityY(-450); // la velocité du ballon(on peut dire que c'est la vitesse)
                openingText.setVisible(false);
            }
        }
        player.body.setVelocityX(0);

        if (cursors.left.isDown) {
            //si on appuie sur la flèche gauche

            player.body.setVelocityX(-2*375);
        } else if (cursors.right.isDown) {
            //si on appuie sur la flèche droite

            player.body.setVelocityX(2*375);
        }
        // TODO: Logic for regular game time
    }
}

//cette fonction permet de gérer les collision entre le ballon et les briques
function hitBrick(ball, brick) {

    brick.destroy()

    switch (brick.texture.key) {

        case "green" : BRICKS.create(brick.x, brick.y, 'red'   ); break;
        case "blue"  : BRICKS.create(brick.x, brick.y, 'green' ); break;
        case "violet": BRICKS.create(brick.x, brick.y, 'blue'  ); break;

    }

    interval++;


    if (ball.body.velocity.x === 0) {
        randNum = Math.random();
        if (randNum >= 0.5) {
            ball.body.setVelocityX(150);

        } else {
            ball.body.setVelocityX(-150);
        }
    }
}


//cette fonction permet de gérer les collision entre le ballon et le joueur
function hitPlayer(ball, player) {

    if (interval >= 10) {
        interval = 0;
        BRICKS.children["entries"].forEach(element => {
            element.y += H;
            if (element.y > 600) {
                gameOverText.setVisible(true);
                ball.disableBody(true, true);
            }
        })
    };

    if (BRICKS.children["entries"].filter(element => element.y >= 25).length == 0) {
        interval = 0;
        BRICKS.children["entries"].forEach(element => { element.y += 5 * H })
    }

    // on augmente la vélocité du ballon dès qu'elle touche le joueur
    ball.setVelocityY(ball.body.velocity.y - 20);

    let newXVelocity = Math.abs(ball.body.velocity.x) + 20;

    // Si la balle est à gauche du joueur, assurez-vous que la vitesse X est négative
    if (ball.x < player.x) {
        ball.setVelocityX(-newXVelocity);
    } else {
        ball.setVelocityX(newXVelocity);
    }
}


const loader = document.querySelector('.loader');

window.addEventListener('load', () => {

    loader.classList.add('fondu-out');

})