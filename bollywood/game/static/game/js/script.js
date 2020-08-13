var vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

upper_layer = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
middle_layer = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
bottom_layer = ["z", "x", "c", "v", "b", "n", "m"];

var movieFromBackend = "Avengers Endgame";

var movieName = "";

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

document.getElementById("displayGame").style.display = "none";
document.getElementById("gameMode").style.display = "none";

function chooseMode() {
  document.getElementById("displayPlay").style.display = "none";
  document.getElementById("gameMode").style.display = "block";
}

function playGame(el) {
  document.getElementById("gameMode").style.display = "none";
  document.getElementById("displayGame").style.display = "block";
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

var testMovie;
function testFunction(el) {
  if (movieFromBackend.indexOf(el) !== -1) {
    for (var i = 0; i < movieFromBackend.length; i++) {
      if (movieFromBackend[i] === el) {
        testMovie = movieName.replaceAt(i, el);
        movieName = testMovie;
      }
    }
  } else {
    //Fade Bollywood
  }
  document.getElementById("displayQuestion").innerHTML = movieName;
}
