var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var lives = 3;

var scrollSpeed = 7;
var x1 = 0;
var x2;

var warBackground, warBackground1;
var BoyStandImg, BoyStand;
var BoyStep1Img, BoyStep1;
var BoyJump1Img, BoyJump1;
var obstacle,obstacle1, obstacle2, obstacle3, obstacle4,obstacle5, obstacle6;
var obstacleGroup;

var food, food1, food2, food3;
var foodGroup;

var life1,life2,life3
var lifeimg1,lifeimg2,lifeimg3

var ground;
var random1;

function preload(){
 warBackground = loadImage("3840.jpg");
 warBackground1 = loadImage("3840.jpg");
 BoyStandImg = loadAnimation("BoyStand.png");
 BoyStep1Img = loadAnimation("BoyStep1.png");
 BoyJump1Img = loadAnimation("boyJump1.png")

 obstacle1 = loadImage("obstacle1.png");
 obstacle2 = loadImage("obstacle2.png");
 obstacle3 = loadImage("obstacle3.png");
 obstacle4 = loadImage("obstacle4.png");
 obstacle5 = loadImage("obstacle5.png");
 obstacle6 = loadImage("obstacle6.png");

 food1img = loadImage("food1.png");
 food2img = loadImage("food2.png");
 food3img = loadImage("food3.png");

 lifeimg1 = loadImage("life1.png");
 lifeimg2 = loadImage("life2.png");
 lifeimg3 = loadImage("life2.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  x2 = width;
  ground = createSprite()

  BoyStand = createSprite(30,height-220);
  BoyStand.addAnimation("BoyStand",BoyStandImg);
  BoyStand.scale = 1.25

  BoyStand.addAnimation("BoyStep1",BoyStep1Img);
  BoyStand.addAnimation(
    "BoyJump1",
    BoyJump1Img
  );

  score = 0;

  life1 = createSprite(500,300,50,50)
  life1.addImage(lifeimg1)
  life1.scale = 0.1

  obstacleGroup = new Group();
  foodGroup = new Group();
}

function draw() {
  //trex.debug = true;   
  background(255);

  if (gameState === PLAY) {
    image(warBackground, x1,0, width, height);
  image(warBackground1, x2,0, width+20, height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if(x1<= -width){
    x1 = width
  }
  if(x2<= -width){
    x2 = width
  }
    
    if (keyDown("space") && BoyStand.y >= 430) {
      
      
      BoyStand.changeAnimation(
        "BoyJump1",
        BoyJump1Img
      );

      BoyStand.velocityY = -12;
    }
    BoyStand.velocityY += 0.8;

    spawnObstacles(0);
    spawnFood();

    if(BoyStand.isTouching(foodGroup)){
      score = score+1
      foodGroup[0].destroy();
    }

    if(BoyStand.isTouching(obstacleGroup)){
      lives -= 1
    }

    if(lives === 0){
      gameState === END;
    }
    if(score === 30){
      if (lives >= 1){
        gameState === END;
      }
    }
  }

  else if(gameState === END){

    score = 0;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();

    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
  }
  drawSprites();

  //boy.collide(edge[3]);

  fill("white");
  textSize(30);
  noStroke();
  text("Score "+ score,500,50);
  
  
}

function spawnObstacles(obstaclesNumber) {

  if(frameCount%70 === 0){

    obstacle = createSprite(width, height-200);
    obstacle.velocityX = -8;

    random1 = Math.round(random(1,6));

    switch(random1){
    case 1: obstacle.addImage(obstacle1);
    break;
    case 2: obstacle.addImage(obstacle2);
    break;
    case 3: obstacle.addImage(obstacle3);
    break;
    case 4: obstacle.addImage(obstacle4);
    break;
    case 5: obstacle.addImage(obstacle5);
    break;
    case 6: obstacle.addImage(obstacle6);
    break;

    default:
    break;
    }

    obstacle.lifetime = width/8;
    obstacleGroup.add(obstacle);

    obstaclesNumber += 1
    console.log(obstaclesNumber)
  }

}
function spawnFood(foodsCollected) {

  if(frameCount%100 === 0){

    food = createSprite(width, Math.round(random(height-300, height-500)));
    food.velocityX = -6;
    //food.rotationSpeed =2;


    random1 = Math.round(random(1,3));

    switch(random1){
    case 1: food.addImage(food1);
    break;
    case 2: food.addImage(food2);
    food.scale=0.6;
    break;
    case 3: food.addImage(food3);
    food.scale = 0.2;
    break;
    

    default:
    break;
    }

    food.lifetime = width/6;

    foodGroup.add(food);   
  }
}