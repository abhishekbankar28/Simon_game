let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;        
let level = 0;
function startGame() {
    if (!started) {
        $("#title").text("Level " + level);
        newSequence();
        started = true;
    }
}
$(document).keypress(function () {
    startGame();
});

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              newSequence();
            }, 1200);
        } 
    } 
    else{
        
        playSound("wrong");
        $("body").addClass("game-over");
        $("#title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
        $("body").removeClass("game-over");
      }, 300);
      setTimeout(function () {
        startOver();
    }, 1200);
    }
}
function newSequence(){
    userClickedPattern = [];
    level++;
    $("#title").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour =  buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name){
    let audio = new Audio(name + ".mp3");
    audio.play()
}

function animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");
   setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
   },200);
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    
}

$("#title, body").on("click", function () {
    startGame();
});