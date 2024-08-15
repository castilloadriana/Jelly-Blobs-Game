

function ok(val) {
    if( typeof val === 'undefined' ) {
        throw new Error('value not defined');
    } else {
        return val;
    }
}

class Blob {
    constructor(color, diameter){
        this.color = color;
        this.diameter = diameter;
        this.radius= diameter/2;
        
        this.setDOM(); // returns this.circleELT
        this.x = 0
        this.y = 0
        this.setColor(color);
        this.setDiameter(diameter);
        this.addToGame();

    
    }
    //adds the blob to some container 
    addToGame() {
        $("body").append(this.circleELT) //created with setDOM 
    }
    //creates a DOM element (the div described above) and stores it in an instance variable
    setDOM() {
        this.circleELT= $('<div class= "circle"></div>')
    }
    //sets the color instance variable and also needs to update the DOM element's background-color property.
    setColor(color) {
        this.color= color;
        $(this.circleELT).css("background-color", this.color);
    }
    //returns the value
    getDiameter(){
        return this.diameter;
    }
    //returns the value
    getRadius(){
        return this.radius;
    }
    //sets the appropriate instance variable(s) and also needs to update the DOM element's width, height, left and top properties.
    setDiameter(d) {
        this.diameter= d     
        this.radius= d/2 //added
        var left= this.x - this.radius;
        var top= this.y - this.radius;
        $(this.circleELT).css({"width": this.diameter, "height": this.diameter, "left": left, "top":top});
    }
    //returns the current color.
    getColor() {
        return this.color;
    }
    //returns the DOM element stored in the instance variable
    getDOM() {
        return this.circleELT;
    }
    //return the x coordinates of the center

    getX() {
        return this.x
    }
    //return the y coordinates of the center
    getY() {
        return this.y
    }
    //change the x coordinates of the center and also update the position of the DOM element by setting left or top.
    setX(x) {
        this.x= x 
        $(this.circleELT).css({"left": this.x - this.radius});   //fix set x not working well with test of 3 circles
    }                                                              // was updated bc of the maybe collide issue
    //change the y coordinates of the center and also update the position of the DOM element by setting left or top.
    setY(y) {           
        this.y= y
        $(this.circleELT).css({"top": this.y - this.radius});
    }
    //determines if blobs are touching
    intersects (other) {
        // four uses of the 'ok' function to make sure all values are defined
        var dx = ok(this.getX()) - ok(other.getX());
        var dy = ok(this.getY()) - ok(other.getY());
        var distance_squared = (dx * dx + dy * dy);

        var r1 = this.getRadius();
        var r2 = other.getRadius();
        var rsum = r1+r2;
        var isCloser = (distance_squared <= rsum*rsum);
        return isCloser;
    } 
    //the location of the blob
    location() {
        let x = this.getX();
        let y = this.getY();
        let left = parseInt(this.getDOM().css('left'),10);
        let top = parseInt(this.getDOM().css('top'),10);
        let r = this.getRadius();
        let xok = (left+r==x) ? "X OK" : "X WRONG";
        let yok = (top+r==y) ? "Y OK" : "Y WRONG";
        return `radius ${r} center (${x},${y}) w/ DOM elt (${left},${top}): ${xok}, ${yok}`;
    }
}
