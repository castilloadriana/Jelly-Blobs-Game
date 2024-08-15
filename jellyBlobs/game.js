var thePlayer= new Player( 'blue', 30); /// ASK SCOTT ABT 
thePlayer.move(innerWidth/2, innerHeight/2)

var intervalID

//launches a single enemy
function launchEnemy(){
    testBlob = new Enemy();
    testBlob.start();
}

//starts the game
function startGame(){
    intervalID = setInterval( function (){launchEnemy()}, 1000);
    document.getElementById('intro').textContent = '';
    $(document).on('mousemove', function (evt) {thePlayer.move(evt.clientX,evt.clientY)});
}

//stops the game
function stopGame(message){
    clearInterval(intervalID)
    $('.circle').stop()
    $("#winOrLose").text(message)
    console.log("stopping the game with",message)
}


$("#start").click(startGame);