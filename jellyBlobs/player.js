

class Player extends Blob{
    constructor(color, diameter){
        super(color, diameter);
 
    }
    
    //takes an x,y location and moves the DIV so that the center is in the new location.
    move(x,y){
       this.setX(x);
       this.setY(y);
    }

    //increases the diameter by growDiameter pixels.
    grow(){
       
        // if (this.diameter == winningDiameter){
        //        //finish later after enemy.js
        // } if {       
        var growDiameter = 20;           
        this.setDiameter( this.diameter + growDiameter);
        console.log("Grow to ", this.diameter)
    }

    //decreases the diameter by shrinkDiameter pixels
    shrink(){
        var shrinkDiameter = 5; 
        
        // if (this.diameter < losingDiameter){

        // } else {
        this.setDiameter( this.diameter - shrinkDiameter); 
        console.log("Shrink to ", this.diameter)
    }
    
    //invoked when a collision happens
    collide(enemy){

        var winningDiameter = window.innerHeight/2; // bigger than this wins
        var losingDiameter = 5;     
        
        
        if (enemy.diameter > this.diameter){
            this.shrink();
            if (this.diameter <= losingDiameter){
                var Lmessage= "Booo, you've lost.";
                stopGame(Lmessage)
            }
    
        }else if( enemy.diameter < this.diameter){
            this.grow();
            enemy.remove()
            if (this.diameter >= winningDiameter){
                var Wmessage= "YOU WON !!!"
                stopGame(Wmessage)
                enemy.textContent = ''
            }
        }
        
    
    }
}

