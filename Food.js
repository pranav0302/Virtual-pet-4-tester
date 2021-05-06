class Food{
    constructor(){
       this.foodStock = 6
       this.lastFed = 0 
       this.image = loadImage("images/Milk.png");
    }

    display(){

        var x = 20,y=80;

        if(this.foodStock != 0){
            for(var i = 0; i<this.foodStock;i++){
                if(i%10 === 0){
                    y += 50;
                    x = 20;
                }
                image(this.image,x,y,50,50)
                x = x+30;
            }
        }else{
            text("No food available",220,250);
        }

        
    }
    getFoodStock(){
        return this.foodStock
    }

    updateFoodStock(foodStock){
       this.foodStock=foodStock
    }

    deductFood(){
        if(this.foodStock>0){
         this.foodStock=this.foodStock-1;
        }
       }

    bedroom(){
        background(bedroomImg);
    }
    
    garden(){
        background(gardenImg);
    }
    
    washroom(){
        background(washroomImg);
    }
    
}



