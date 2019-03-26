//Variables to keep track of wins and losses
var wins = 0
var losses = 0
$("#user-wins").text(wins);
$("#user-losses").text(losses);

$(".alert").hide();

$(".info").on("click", function(){
  $(".alert").slideToggle( "slow", function() {
  });
});

var gameLevel = 1;
$("#game-level").text(gameLevel);
var timeRunning = false;
var gamePaused = false;
var myTime;
var targetNumber;

var counter = 0;
$("#user-score").text(counter);

var timeLeft = 60;
$("#time-left").text(timeLeft);

function gamePrepare(){
  targetNumber = Math.floor(Math.random() * 89) + 10;
  console.log(targetNumber);
  $("#number-to-guess").text(targetNumber);

  //Implemented a Fisher-Yates shuffle to assign non-repeating random values and colors in an array to each crystal
  function shuffle(array) {
    var i = array.length,
      j = 0,
      temp;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  var numberOptions = shuffle([3, 4, 5, 7, 8, 10]);
  var randomColor = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
  var imagesArray = ["assets/images/one.jpg", "assets/images/two.jpg", "assets/images/three.jpg", "assets/images/four.jpg", 
  "assets/images/five.jpg", "assets/images/six.jpg", "assets/images/seven.jpg", "assets/images/eight.jpg"]

  console.log(numberOptions);

  for (var i = 0; i < 4; i++) {

    var imageCrystal = $("<img>");

    imageCrystal.addClass("crystal-image mt-3");

    imageCrystal.attr("src", imagesArray[randomColor[i]]);

    imageCrystal.attr("data-crystalvalue", numberOptions[i]);

    $("#crystals").append(imageCrystal);

    console.log(numberOptions[i]);
  }
}

function gameStart(){

  gamePaused = false;

  if (!timeRunning) {
    myTime = setInterval(countDown, 1000);
    timeRunning = true;
  }

  function countDown() {
    timeLeft--;
    $("#time-left").html(timeLeft);
    if (timeLeft === 0) {
      stop();
      alert("Time's Up!");
      losses++
      $("#user-losses").text(losses);
      $(".crystal-image").off("click");
    }
  }

  $(".pause").on("click", function(){
    if (!gamePaused) {
      stop();
      timeRunning = false;
      gamePaused = true;
      $(".crystal-image").off("click");
    }
  });

  $(".crystal-image").on("click", function () {
    if (!gamePaused) {
      counter = counter + parseInt(($(this).attr("data-crystalvalue")));
      console.log("Score: " + counter);
      $("#user-score").text(counter);

      if (counter === targetNumber) {
        alert("You win!");
        wins++
        $("#user-wins").text(wins);
        $(".crystal-image").off("click");
        stop();
      }

      else if (counter >= targetNumber) {
        alert("You lose!");
        losses++
        $("#user-losses").text(losses);
        $(".crystal-image").off("click");
        stop();
      }
    }
  });
}

function stop() {
  clearInterval(myTime);
}

gamePrepare();

$(".start").on("click", function(){
  gameStart();
});

$(".restart").on("click", function(){
  stop();
  timeRunning = false;
  $("#crystals").empty();
  timeLeft = 60;
  $("#time-left").text(timeLeft);
  counter = 0;
  $("#user-score").text(counter);
  gamePrepare();
});