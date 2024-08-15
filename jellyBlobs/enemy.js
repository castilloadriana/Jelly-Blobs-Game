var minDiameter = 5;                   // random size >= this
var maxDiameter = window.innerWidth/4; // random size <= this

class Enemy extends Blob {
    constructor(){
        let enemyColor= random.color();
        let enemyDiameter= random.intBetween(minDiameter, maxDiameter);
        enemyDiameter = 2*Math.floor(enemyDiameter/2);   // make the diameter an even number
        super(enemyColor,enemyDiameter);
        this.hasCollided= false
    }
    // updates the X and Y location of the center from the top/left CSS values. 
    updateLocation(){
        var newLeft= parseInt($(this.circleELT).css("left")) + this.radius ; //add radius
        var newTop= parseInt($(this.circleELT).css("top")) + this.radius;
        this.x= newLeft;//this.x
        this.y= newTop;
    }
    
    //invoked when a collision happens and it records that the enemy has collided 
    //with the player and informs the player of the fact. 
    collide(){
        this.hasCollided= true;
        thePlayer.collide(this);

    }
    //checks for a collision
    maybeCollide(){
        this.updateLocation();
        if (this.hasCollided != true ){
            if  (this.intersects(thePlayer) ){   //ask julie
               this.collide();
            };
        }
    }

//takes one argument, a string indicating which side of the screen the enemy is entering from. 
    setSide(side){
        if (side=== "top"){
            var newX = random.intBetween(0,window.innerWidth);
            var newY = 0;
            this.setX(newX)
            this.setY(newY-this.diameter)
        } if (side=== "bottom"){
            var newX = random.intBetween(0,window.innerWidth);
            var newY = window.innerHeight
            this.setX(newX)
            this.setY(newY+this.diameter)
        } if (side=== "left") {
            var newX = 0
            var newY = random.intBetween(0, innerHeight);
            this.setX(newX-this.diameter)
            this.setY(newY)
        } if (side== "right"){
            var newX = window.innerWidth
            var newY = random.intBetween(0, innerHeight);
            this.setX(newX+this.diameter)
            this.setY(newY)
        }

    }
    //starts the jQuery animation of this enemy moving across the board to its final X/Y value
    start(){

        var enemyDuration = 5000; 
        var sidesList=["top", "bottom", "left", "right"] ;
        var direction= random.arrayElt(sidesList);

     
        if(direction== "top"){  //(this.getY()==0)
            this.setSide(direction)
            $(this.circleELT).animate( {top: innerHeight}, {
                duration: enemyDuration,
                progress: () => this.maybeCollide(),  //function(){this.maybeCollide()}.bind(this),   ***used to be 
                complete: ()=> this.remove()
        } ); 
        } if(direction== "bottom"){  //(this.getY()==0)
            this.setSide(direction)
            $(this.circleELT).animate( {top: 0-innerHeight}, {
                duration: enemyDuration,
                progress: () => this.maybeCollide(),  //function(){this.maybeCollide()}.bind(this),   ***used to be 
                complete: ()=> this.remove()
            } ); 
        } if(direction== "left"){  //(this.getY()==0)
            this.setSide(direction)
            $(this.circleELT).animate( {left: innerWidth}, {
                duration: enemyDuration,
                progress: () => this.maybeCollide(),  //function(){this.maybeCollide()}.bind(this),   ***used to be 
                complete: ()=> this.remove()
            } );
        } if(direction== "right"){  //(this.getY()==0)
            this.setSide(direction)
            $(this.circleELT).animate( {left: 0-innerWidth-  this.diameter}, {
                duration: enemyDuration, 
                progress: () => this.maybeCollide(),  //function(){this.maybeCollide()}.bind(this),   ***used to be 
                complete: ()=> this.remove()
            } ); 
        }
    }
    //stops the animation and removes this enemy from the board
    remove(){
        $(this.circleELT).stop();
        $(this.circleELT).remove();
    }

}


