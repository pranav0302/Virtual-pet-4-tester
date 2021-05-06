//Create variables here
var happyDogImg,dogImg,sadDogImg;
var database;
var foodStock = 0;
var foodS,foodObj;
var feedTime;
var lastFed;
var bedroomImg,washroomImg,gardenImg
var gameState = 0
var readState

function preload()
{
 happyDogImg = loadImage("images/happy dog.png");
 dogImg = loadImage("images/Dog.png")
 sadDogImg = loadImage("images/deadDog.png")
 bedroomImg = loadImage("images/Bed Room.png");
 washroomImg = loadImage("images/Wash Room.png");
 gardenImg = loadImage("images/Garden.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog = createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale=0.2;
 
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new Food();
  feed = createButton("feed the dog")
  feed.position(300,50);
  feed.mousePressed(feedDog);

  addingFood = createButton("add food");
  addingFood.position(220,50)
  addingFood.mousePressed(addFood);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

}


function draw() {  
//  background(46, 139, 87);
background(46,139,87);

  drawSprites();
  textSize(20);
  fill("blue");
  stroke("black");

  currentTime = hour();
  lastFed = database.ref('feedTime')
  lastFed.on("value",function(data){
    feedTime = data.val();
  })

  if(feedTime > 12){
     text("last fed: "+feedTime % 12 +"P.M" , 50,50);
  }else if(feedTime === 0){
    text("last fed: 12 A.M",50,50)
  }else if(feedTime === 12){
    text("last fed: "+feedTime + " noon",50,50);
  }else{
    text("lastfed: "+feedTime + "A.M",50,50)
  }

//console.log(gameState)
  // if(gameState != "Hungry"){
  //   // feed.hide();
  //   addingFood.hide();
  //   dog.addImage(happyDogImg)
  // }else{
  //   feed.show();
  //   addingFood.show();
  //   dog.addImage(dogImg)
  // }
  //console.log(lastFed) 
 // console.log(lastFed)

  if(currentTime == (feedTime + 1)){
    update("Playing");
    foodObj.garden();
    feed.hide();
    addingFood.hide();
    dog.remove();
  }else if(currentTime == (feedTime + 2)){
           update("Sleeping");
           foodObj.bedroom();        
  }else if(currentTime > (feedTime + 2) && currentTime < (feedTime + 4)){
    update("Bathing")
    foodObj.washroom();
  }else{
    update("Hungry");
     foodObj.display();
     feed.show();
     addingFood.show();
     dog.addImage(dogImg)
  }

//gameState.update();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function writeStock(x){

  if(x<= 0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

function feedDog(){

 if(foodStock <= 0 ){
    foodStock = 0;
    
 }else{
  
   foodStock = foodStock - 1
 }

 database.ref('/').update({
  food:foodObj.getFoodStock(),
  feedTime:hour()
})



 foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}

function addFood(){

  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour ()
  })
  
   foodObj.updateFoodStock(foodObj.getFoodStock()+1)
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}