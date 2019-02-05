require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Omdb = require("omdb")
var dotenv = require("dotenv");
var moment = require("moment");
var axios = require("axios");
var spotifyKey = (keys.spotify);
var allBands;
var userQuery = "";
var operator = process.argv[2]
var spotify = new Spotify(keys.spotify)
var omdb = (keys.omdb)
var fs = require("fs")
// moment().format()
// var now = moment().format("L");

for (var i = 3; i < process.argv.length; i++) {
    if (i >= 4) {
        userQuery += (" " + process.argv[i])
    } else {
        userQuery = process.argv[i]
    }

}

switch (operator) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        spotified();
        break;

    case "movie-this":
            OMDBF();
        break;

    case "do-what-it-says":
        console.log("do-what-it-says");
        doit()
        break;
}

function OMDBF() {
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=" + omdb.id).then(
        function (response) {
            thisMovie = response.data
            console.log(thisMovie.Title)
            console.log(thisMovie.Year)
            console.log(thisMovie.imdbRating)
            console.log(thisMovie.Ratings[1].Source + " " + thisMovie.Ratings[1].Value)
            console.log(thisMovie.Country)
            console.log(thisMovie.Language)
            console.log(thisMovie.Plot)
            console.log(thisMovie.Actors)
        }
    );
}

function spotified() {
    spotify.search({ type: 'track', query: userQuery }
    , function (err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }
        currentSpotify = data.tracks.items[0]
        console.log("The Artist's name is " + currentSpotify.artists[0].name + ".")
        console.log("The song name is " + currentSpotify.name + ".")
        console.log("It is from the Album " + currentSpotify.album.name + ".")
        console.log("Click here to preview the track " + currentSpotify.external_urls.spotify + " .")
    })
}

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp").then(
        function (response) {
            bandsArray = response.data.map(function (event) {
                return { name: event.venue.name, place: event.venue.city + ", " + event.venue.country, date: event.datetime }
            })
            console.log(bandsArray)
            for (k = 0; k < bandsArray.length; k++) {
                console.log("Name of Venue: " + bandsArray[k].name + ", located in: " + bandsArray[k].place)
                showDate = moment(bandsArray[k].date).format("L")
                showTime = moment(bandsArray[k].date).format("LT")

                console.log("Date and time of the event: " + showDate + " at " + showTime + " local time.")
                console.log("********************")

            }
        }
    ).catch(function (err) {
        console.log("an error occurred")
    });
}

function doit() {
    fs.readFile("./random.txt", "utf-8", function(err, data) {
        randomTextArray = data.split(",")
        userQuery = randomTextArray[1]
        switch (randomTextArray[0]) {
            case "concert-this":
                concert();
                break;
        
            case "spotify-this-song":
                spotified();
                break;
        
            case "movie-this":
                    OMDBF();
                break;
        
            case "do-what-it-says":
                console.log("do-what-it-says");
                doit()
                break;
        }
    })
   
}