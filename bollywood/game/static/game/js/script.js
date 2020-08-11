var vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

var movieFromBackend = "Avengers Endgame";

var movieName = "";

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

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

checkLetter();
document.getElementById("displayQuestion").innerHTML = movieName;

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
