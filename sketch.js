// style
let body = document.querySelector("body");
body.style.backgroundColor = "gray";

// game
let state;
let score;
let lives;

// player
let player;
let playerX;
let playerY;
let playerLeft, playerTop, playerRight;

// good food
let goodFood;
let goodFood1;
let goodFood2;
let goodFoodArray;
let randomGoodFood;
let Food;
let goodFoodY;
let goodFoodX;
let goodFoodSpeed;
let goodFoodLeft, goodFoodBot, goodFoodRight;

// bad food
let badFood;
let badFood1;
let badFoodArray;
let randomBadFood;
let bFood;
let badFoodY;
let badFoodX;
let badFoodSpeed;
let badFoodLeft, badFoodBot, badFoodRight;

function preload() {
    player = loadImage("images/pikachu.png");
    goodFood = loadImage("images/apple.png");
    goodFood1 = loadImage("images/banana.png")
    goodFood2 = loadImage("images/blueberry.png");
    badFood = loadImage("images/fries.png");
    badFood1 = loadImage("images/burger.png");
}

function setup() {
    let cnv = createCanvas(700, 800);
    cnv.position(600, 100);
    imageMode(CENTER);

    // game
    score = 0;
    lives = 3;
    state = 0;

    // player
    playerY = 700;
    playerX = 350;

    // good Food
    goodFoodY = -50;
    goodFoodSpeed = random(5, 10);
    goodFoodX = random(75, width - 75);
    randomGoodFood = Math.floor(random(0, 3));
    goodFoodArray = [goodFood, goodFood1, goodFood2];
    Food = goodFoodArray[randomGoodFood];

    // bad Food
    badFoodY = -50;
    badFoodSpeed = random(5, 10);
    badFoodX = random(75, width - 75);
    randomBadFood = Math.floor(random(0, 2));
    badFoodArray = [badFood, badFood1];
    bFood = badFoodArray[randomBadFood];
}

function draw() {
    background(0);

    goodFoodY += goodFoodSpeed;
    badFoodY += badFoodSpeed;

    if (goodFoodY > 900) {
        newFood();
    }

    if (badFoodY > 900) { 
        newBadFood();
    }

    Food = goodFoodArray[randomGoodFood];
    bFood = badFoodArray[randomBadFood];
    
    // draw good food
    image(Food, goodFoodX, goodFoodY, 100, 100);
    
    // draw bad food
    image(bFood, badFoodX, badFoodY, 100, 100);

    // draw player
    image(player, playerX, playerY, 100, 100);

    // player movement
    if (state == 0) {
        if (keyIsDown(LEFT_ARROW) && playerX > 75) {
            playerX -= 7;
        }
        if (keyIsDown(RIGHT_ARROW) && playerX < 625) {
            playerX += 7;
        }
    }

    // player hitbox
    playerLeft = playerX - 50;
    playerRight = playerX + 50;
    playerTop = playerY - 50;

    // good food hitbox
    goodFoodLeft = goodFoodX - 50;
    goodFoodRight = goodFoodX + 50;
    goodFoodBot = goodFoodY + 50;

    // bad food hitbox
    badFoodLeft = badFoodX - 50;
    badFoodRight = badFoodX + 50;
    badFoodBot = badFoodY + 50;

    // collision
    if (playerLeft > badFoodRight || playerRight < badFoodLeft || playerTop > badFoodBot) {
        textSize(30);
        text("Lives:", 50, 100);
        textSize(35);

        fill(255, 0, 0);
        if (lives == 3) {
            text("♥  ♥  ♥", 150, 100);
        } 
        else if (lives == 2) {
            text("♥  ♥  ", 150, 100);
        }
        else if (lives == 1) {
            text("♥", 150, 100);
        }

        if (playerLeft > goodFoodRight || playerRight < goodFoodLeft || playerTop > goodFoodBot) {
            textSize(30);
            fill(255);
            text("Score:", 470, 100);
            text(score + "  / 10", 570, 100);
        }
        else {
            score++;
            newFood();
            textSize(30);
            fill(255);
            text(score + "  / 10", 570, 100);
        }
    }
    else {
        lives--;
        console.log(lives);
        newBadFood();
    }

    if (lives == -1) {
        lose();
    }

    if (score == 10) {
        win();
    }
}

function mouseClicked() {
    if (state == 1) {
        setup();
    }
}

// personal functions
function newFood() {
    goodFoodY = -50;
    goodFoodX = random(75, width - 75);
    randomGoodFood = Math.floor(random(0, 3));
    goodFoodSpeed = random(5, 10);
}

function newBadFood() {
    badFoodY = -50;
    badFoodX = random(75, width - 75);
    randomBadFood = Math.floor(random(0, 2));
    badFoodSpeed = random(5, 10);
}

function lose() {
    state = 1;
    goodFoodSpeed = 0;
    badFoodSpeed = 0;
    textSize(50);
    fill(255);
    text("You Lose!", 245, 425);
    textSize(20);
    text("Click anywhere to try again!", 235, 485);
}

function win() {
    state = 1;
    goodFoodSpeed = 0;
    badFoodSpeed = 0;
    textSize(50);
    fill(255);
    text("You Win!", 255, 425);
    textSize(20);
    text("Click anywhere to try again!", 235, 485);
}