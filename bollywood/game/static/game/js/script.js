var vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
var movieName = "";
var count = 0;
var sndbtn = new Audio(
  "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"
);

var sndchs = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

document.getElementById("displayGame").style.display = "none";
document.getElementById("gameMode").style.display = "none";
document.getElementById("gameWon").style.display = "none";
document.getElementById("gameLost").style.display = "none";

function chooseMode() {
  sndchs.play();
  sndchs.currentTime = 0;
  document.getElementById("displayPlay").style.display = "none";
  document.getElementById("gameMode").style.display = "block";
}

function playGame(el) {
  sndchs.play();
  sndchs.currentTime = 0;
  document.getElementById("gameMode").style.display = "none";
  document.getElementById("displayGame").style.display = "block";
  if (el === "normal") {
    document.getElementById("app").style.display = "none";
  } else if (el === "endless") {
    //Logic for endless
  } else {
    //Logic for Multiplayer
  }
  checkLetter();
  document.getElementById("displayQuestion").innerHTML = movieName;
}

function checkLetter() {
  for (var j = 0; j < movieFromBackend.length; j++) {
    if (
      vowels.indexOf(movieFromBackend[j]) === -1 &&
      movieFromBackend[j] !== " "
    ) {
      movieName += "_";
    } else if (movieFromBackend[j] === " ") {
      movieName += " ";
    } else {
      movieName += movieFromBackend[j];
    }
  }
}

function gameComplete() {
  if (count === 9) {
    // if game is lost
    document.getElementById("movieName").innerHTML = movieFromBackend;
    document.getElementById("gameLost").style.display = "block";
    document.getElementById("displayGame").style.display = "none";
    document.getElementById("gameMode").style.display = "none";
    document.getElementById("displayPlay").style.display = "none";
    for (var i = 11; i < 20; i++) {
      document.getElementById(String(i)).style.textDecoration = "none";
    }
    count = 0;
  }
  if (movieName.indexOf("_") === -1) {
    // if game is won
    document.getElementById("gameWon").style.display = "block";
    document.getElementById("displayGame").style.display = "none";
    document.getElementById("gameMode").style.display = "none";
    document.getElementById("displayPlay").style.display = "none";
    for (var i = 11; i < 20; i++) {
      document.getElementById(String(i)).style.textDecoration = "none";
    }
    count = 0;
  }
}

var testMovie;
var hiddenAlpha = [];
function testFunction(el) {
  sndbtn.play();
  sndbtn.currentTime = 0;
  if (movieFromBackend.indexOf(el) !== -1) {
    for (var i = 0; i < movieFromBackend.length; i++) {
      if (movieFromBackend[i] === el) {
        testMovie = movieName.replaceAt(i, el);
        movieName = testMovie;
      }
    }
  } else {
    count += 1;
    switch (count) {
      case 1:
        document.getElementById("11").style.textDecoration = "line-through";
        break;
      case 2:
        document.getElementById("12").style.textDecoration = "line-through";
        break;
      case 3:
        document.getElementById("13").style.textDecoration = "line-through";
        break;
      case 4:
        document.getElementById("14").style.textDecoration = "line-through";
        break;
      case 5:
        document.getElementById("15").style.textDecoration = "line-through";
        break;
      case 6:
        document.getElementById("16").style.textDecoration = "line-through";
        break;
      case 7:
        document.getElementById("17").style.textDecoration = "line-through";
        break;
      case 8:
        document.getElementById("18").style.textDecoration = "line-through";
        break;
      case 9:
        document.getElementById("19").style.textDecoration = "line-through";
        break;
    }
  }
  document.getElementById(el).style.visibility = "hidden";
  hiddenAlpha.push(el);
  document.getElementById("displayQuestion").innerHTML = movieName;
  gameComplete();
}

function playAgain() {
  document.getElementById("gameLost").style.display = "none";
  document.getElementById("gameWon").style.display = "none";
  hiddenAlpha.forEach(function (el) {
    document.getElementById(el).style.visibility = "visible";
  });
  hiddenAlpha = [];
  movieName = "";
  chooseMode();
}

// -------------------------------------------------FOR TIMER----------------------------------------------------------------------

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 90;
const ALERT_THRESHOLD = 45;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};

const TIME_LIMIT = 180;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

//-------------------------------------FADE OUT-----------------------------------------------
