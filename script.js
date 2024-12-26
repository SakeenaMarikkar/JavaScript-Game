var deadSound = new Audio("dead.mp3");
var runSound = new Audio("run.mp3");
var jumpSound = new Audio("jump.mp3");
var backgroundSound = new Audio("background.mpeg")
var winSound = new Audio("win.mp3")


function KeyCheck(event){

    var k = event.which;

    if (k==32) { //space

        if(runWorkerNumber == 0){
       document.getElementById("Welcome").style.visibility = "hidden";
       backgroundWorker = setInterval(background,100);
       runWorkerNumber = setInterval(run,100);
       boxWorkerNumber = setInterval(moveBox,100);
       runSound.play();
       backgroundSound.play();
    }
}

    if(k == 38){ //up

        if(jumpWorkerNumber == 0){

            if(jumpWorkerNumber == 0) {
                document.getElementById("Welcome").style.visibility = "hidden";
            clearInterval(runWorkerNumber);
            jumpWorkerNumber = setInterval(jump,100);
            runImageNumber = 0;
            runSound.pause();
            jumpSound.play();
            backgroundSound.play();
            }

            if(backgroundWorker == 0){
            backgroundWorker = setInterval(background,100);
            }

            if(boxWorkerNumber == 0){
               boxWorkerNumber = setInterval(moveBox,100);
            }
        }

    }

    if(k==13){
        document.getElementById("finish").style.visibility = "visible";
        clearInterval(runWorkerNumber);
            runSound.pause();
            clearInterval(jumpWorkerNumber);
            jumpSound.pause();
            clearInterval(backgroundWorker);
            backgroundSound.pause();
            clearInterval(boxWorkerNumber);
            runImageNumber = 0;
            winSound.play();

    }

  
}

var boxWorkerNumber = 0;
var runImageNumber = 0;
var runWorkerNumber = 0;
var score = 0;

function run(){

    score = score + 1;
    document.getElementById("score").innerHTML = score;

    runImageNumber = runImageNumber + 1;

    if(runImageNumber == 10){
        runImageNumber = 0;
    }

    document.getElementById("girl").src= "Run (" + runImageNumber + ").png";
}

var jumpImageNumber = 0;
var jumpWorkerNumber = 0;
var girlMarginTop = 350;

function jump() {

    score = score + 2;
    document.getElementById("score").innerHTML = score;

    if(jumpImageNumber <= 4){
        girlMarginTop = girlMarginTop - 40;
        document.getElementById("girl").style.marginTop = girlMarginTop + "px";
    }

    if(jumpImageNumber >= 5){
        girlMarginTop = girlMarginTop + 40;
        document.getElementById("girl").style.marginTop = girlMarginTop + "px";

    }

     jumpImageNumber = jumpImageNumber + 1;
        
        if(jumpImageNumber == 10){
            clearInterval(jumpWorkerNumber);
            jumpImageNumber = 0;
            jumpWorkerNumber = 0;
            runWorkerNumber = setInterval(run,100);
            runSound.play();
        }

        document.getElementById("girl").src = "Jump (" + jumpImageNumber + ").png";
}

var backgroundMarginLeft = 0;
var backgroundWorker = 0;

function background(){
backgroundMarginLeft= backgroundMarginLeft - 20;

document.getElementById("mainBox").style.backgroundPositionX = backgroundMarginLeft + "px";
}

var boxMarginLeft = 200;

function createBox(){
    for (var i = 0; i < 10; i++){
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if(i < 5){
            boxMarginLeft = boxMarginLeft + 800; 
        }

        if(i >= 6){
        boxMarginLeft = boxMarginLeft + 500;
        }



        box.style.marginLeft = boxMarginLeft + "px";
        document.getElementById("mainBox").appendChild(box);
        

    }
}

function moveBox() {
    for(var i=0; i<10; i++){
       var box = document.getElementById("box" + i);
       var boxCurrentMarginLeft = getComputedStyle(box).marginLeft;
       var boxNewMarginLeft = parseInt(boxCurrentMarginLeft) - 20;
       box.style.marginLeft = boxNewMarginLeft + "px";
       
       //80px 0px
       //  270px < margintop

    if(boxNewMarginLeft >= -40 & boxNewMarginLeft <= 60){
        if(girlMarginTop > 330){
            clearInterval(runWorkerNumber);
            runSound.pause();
            clearInterval(jumpWorkerNumber);
            jumpSound.pause();
            clearInterval(backgroundWorker);
            backgroundSound.pause();
            clearInterval (boxWorkerNumber);
            jumpWorkerNumber = -1;
            runWorkerNumber = -1;
            deadWorkerNumber = setInterval(dead,100);
            deadSound.play();
            } 
        }
    }
}

var deadImageNumber = 0;
var deadWorkerNumber = 0;

function dead(){
    deadImageNumber = deadImageNumber + 1;
      if(deadImageNumber == 10){
        deadImageNumber = 9;
        document.getElementById("girl").style.marginTop = "350px";
        clearInterval(deadWorkerNumber);
        document.getElementById("endGame").style.visibility = "visible";
        //Visibility
        document.getElementById("endScore").innerHTML = score;
      }

    document.getElementById("girl").src = "Dead (" + deadImageNumber + ").png";

    
}

function newGame(){
    location.reload();
}

