var vowels = [ 'a', 'e', 'i', 'o', 'u','A','E','I','O','U'];

var movieFromBackend = "Avengers Endgame";

var movieName = "";

for(var j = 0 ; j < movieFromBackend.length ; j++)
{
    if(vowels.indexOf(movieFromBackend[j]) === -1 && movieFromBackend[j] !== ' ')
    {
        movieName += "_";
    }
    else if(movieFromBackend[j] === ' ')
    {
        movieName +=' ';
    }
    else
    {
        movieName += movieFromBackend[j];
    }
}

document.getElementById("displayQuestion").innerHTML=movieName;

console.log(movieName);
