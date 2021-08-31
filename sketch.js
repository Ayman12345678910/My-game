var player, playerImage
var backgroundImage
var score = 0, lives = 3, livesImage
var bulletImage, bulletArray=[]
var enemy1Image, enemy2Image, enemyArray=[]
var explosionImage
var explosionSound

function preload() {
  backgroundImage = loadImage("images/11.webp")
  playerImage = loadImage("images/player.png")
  bulletImage = loadImage("images/bullet.png")
  livesImage = loadImage("images/star.png")
  enemy1Image = loadImage("images/enemy1.png")
  enemy2Image = loadImage("images/enemy2.png")
  explosionImage = loadImage("images/explosion/ex1.png")
  explosionSound = loadSound("images/explosion/explosion.mp3")
  explosionSound.loop = false
}
function setup() {
  createCanvas(displayWidth, displayHeight);
  player = createSprite(width / 10, height / 2, 50, 50)
  player.addImage(playerImage)
  player.scale = 0.5
//player.debug = true;
  player.setCollider("rectangle", 0,0, 30,30 )
}

function draw() {

  background(backgroundImage);
  textSize(50)
  fill("white")
  text("Score:" + score, width - 200, 90)
  enemies();
  displayLives();
  drawSprites();


  if(lives === 0){
    player.destroy()
    //enemyArray.destroy()
    console.log("game over")
    textSize(130)
    fill("purple")
    text("Game Over", 520,500)
    
    textSize(50)
    text("Press 'R' to restart ", 700,800)
    if(keyDown("R")){
      console.log("r")
      location.reload()
  
    }
  }

  for(var i = 0; i<enemyArray.length; i++){
    playerEnemyCollision(enemyArray[i])
  }

  if(enemyArray.length>1 && bulletArray.length>1){
    for(var i = 0; i < enemyArray.length; i++){
      for(var j = 0; j < bulletArray.length; j++){
      collide(enemyArray[i], bulletArray[j])
      }
    }
  }
}

function collide(ene, bul){
  var d = dist(ene.x, ene.y, bul.x, bul.y)
  if(d<80){
    ene.addImage(explosionImage)
    ene.velocityX = 0;
    ene.scale= 2
    //enemyArray.splice(ene, 1)
    //bulletArray.splice(bul, 1)
    score= score+10
    explosionSound.play()
    
    setTimeout(function(){ ene.destroy() }, 1000);
    bul.destroy()
  }
}

function playerEnemyCollision(ene){
  if(player.isTouching(ene)){
//alert("You lost one star!")
  lives = lives - 1
  ene.destroy()
  console.log(lives)


  }
}

function displayLives(){
  text("lives:", 20,90)
for(var i = 0; i < lives; i++ ){
 image(livesImage, 150 + 60*i, 50, 50, 50)

}
}


function keyPressed() {
  console.log("key-pressed")
  if (keyCode === 38) {
    player.y = player.y - 15
  }
  if (keyCode === 40) {
    player.y = player.y + 15
  }


  if (keyCode === 32) {
    var bullet = createSprite(player.x + 20, player.y + 20, 30, 5)
    bulletArray.push(bullet)
    bullet.velocityX = 15
    bullet.addImage(bulletImage)
    bullet.scale = 0.1
    bullet.lifetime = 100
  }
}

function enemies() {
  if (frameCount % 60 === 0) {
    var enemy = createSprite(width + 10, random(100, height - 100))
    enemy.lifetime = 150
    enemyArray.push(enemy)
    enemy.velocityX = -10
    //enemy.addImage()
    var rand = Math.round(random(1,2))
    console.log(rand)
    if(rand===1){
     enemy.addImage(enemy1Image)
     enemy.scale=0.6
    }
    else{
     enemy.addImage(enemy2Image)
     enemy.scale = 0.2
    }
  }

}