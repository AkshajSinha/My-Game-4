var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided, fairyAudio;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var bg, melon, apple, fruit,fruitGroup;

function preload(){
  trex_running = loadAnimation("fairyImage1.png");

  melon = loadImage("melon2.png");  
  apple = loadImage("apple2.png")
  groundImage = loadImage("ground2.png");
  bg = loadImage("Jungle.jpg");
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("stone.png");
  
  fairyAudio = loadSound("sound_JoyMusic.mp3");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(1800, 800);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.25;
  
  ground = createSprite(200,650,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(700,400);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(700,340);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,650,400,10);
  invisibleGround.visible = false;


  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  fruitGroup = createGroup();
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,100);
  trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(bg);
  //displaying score
  textStyle(BOLD);
  fill("purple");
  textSize(25);
  text("Score: "+ score, 1400,400);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
        if (fruitGroup.isTouching(trex)) {
          fairyAudio.play();
        }
    } 
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
    spawnFruits();  

    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation
      trex.changeAnimation("collided", trex_running);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(400,650,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle1);
              break;
      default: break;
    }

   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}
 
function spawnFruits(){

if (frameCount % 100 === 0) {
  fruit = createSprite(400,400,20,10);
  fruit.velocityX = -6;
 
  var rand = Math.round(random(1,2));
  switch(rand){
      case 1: fruit.addImage("fruit1",apple);
      break;
      case 2: fruit.addImage("fruit2", melon);
      break;
  }

  fruitGroup.add(fruit);
}
}