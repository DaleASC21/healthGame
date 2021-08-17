// game
let state;
let score;

// Player
let player;
let playerX;
let playerY;
let playerLeft, playerTop, playerRight;

// Good Food
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

// Bad Food
let badFood;
let badFoodY;
let badFoodX;
let badFoodSpeed;
let badFoodLeft, badFoodBot, badFoodRight;

function preload() {
    player = loadImage("images/test_player.png");
    goodFood = loadImage("images/blue_sus.png");
    goodFood1 = loadImage("images/pink_sus.png")
    goodFood2 = loadImage("images/yellow_sus.png");
    badFood = loadImage("images/the_imposter.png");
}

function setup() {
    let cnv = createCanvas(700, 800);
    cnv.position(600, 100);
    imageMode(CENTER);

    // game
    state = 0;
    score = 0;

    // player
    playerY = 700;
    playerX = 350;

    // good Food
    goodFoodY = -50;
    goodFoodSpeed = random(5, 10);
    goodFoodSpeed2 = random(5, 10);
    goodFoodX = random(25, width - 75);
    randomGoodFood = Math.floor(random(0, 3));
    goodFoodArray = [goodFood, goodFood1, goodFood2];
    Food = goodFoodArray[randomGoodFood];
    
    // good Food 2
    goodFoodX2 = random(25, width - 75);
    goodFoodY2 = -50;

    // bad Food
    badFoodY = -50;
    badFoodSpeed = random(5, 10);
    badFoodX = random(25, width - 75);
}

function draw() {
    background(0);

    goodFoodY += goodFoodSpeed;
    badFoodY += badFoodSpeed;

    if (goodFoodY > 900) {
        randomGoodFood = Math.floor(random(0, 3));
        goodFoodX = random(75, width - 75);
        goodFoodY = -50;
        goodFoodSpeed = random(5, 10);
    }

    if (badFoodY > 900) { 
        badFoodX = random(75, width - 75);
        badFoodSpeed = random(5, 10);
        badFoodY = -50;
    }

    Food = goodFoodArray[randomGoodFood];

    // draw good food
    image(Food, goodFoodX, goodFoodY, 100, 100);
    
    // draw bad food
    image(badFood, badFoodX, badFoodY, 100, 100);

    // draw player
    image(player, playerX, playerY, 100, 100);

    // player movement
    if (keyIsDown(LEFT_ARROW) && playerX > 75) {
        playerX -= 7;
    }
    if (keyIsDown(RIGHT_ARROW) && playerX < 625) {
        playerX += 7;
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
        if (playerLeft > goodFoodRight || playerRight < goodFoodLeft || playerTop > goodFoodBot) {
            fill(255);
            text(score, 255, 50);
        }
        else {
            score++;
            goodFoodY = -50;
            goodFoodX = random(75, width - 75);
            randomGoodFood = Math.floor(random(0, 3));

            fill(255);
            text(score, 255, 50);
        }
    }
    else {
        setup();
    }
}