let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound("sounds/" + randomChosenColour + ".mp3");
}

$(".btn").click(function () {
  var userChosenColour = this.id;
  animatePress(userChosenColour);
  playSound("sounds/" + userChosenColour + ".mp3");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(() => {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 100);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
