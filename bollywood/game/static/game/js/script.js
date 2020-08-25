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
  document.getElementById("spantypeWriter").style.opacity = "0";
  document.getElementById("displayPlay").style.display = "none";
  document.getElementById("gameMode").style.display = "block";
}

function playGame(el) {
  document.getElementById("typeWriter").style.opacity = "0";
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

// -------------------------------------------------TYPE----------------------------------------------------------------------

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
//-------------------------------------TYPE END-----------------------------------------------
