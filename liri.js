require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Omdb = require("omdb")
var dotenv = require("dotenv");
var moment = require("moment");
var axios = require("axios");
var Table = require("cli-table");
var spotifyKey = (keys.spotify);
var userQuery;
var operator = process.argv[2]
var spotify = new Spotify(keys.spotify)
var omdb = (keys.omdb)
var fs = require("fs")

function appendIt() {
    fs.appendFile("log.txt", operator + ", " + userQuery + "; \n", function (err) {
        if (err) {
            console.log(err)
        }
    })
};

for (var i = 3; i < process.argv.length; i++) {
    if (i >= 4) {
        userQuery += (" " + process.argv[i].toLowerCase())

    } else {
        userQuery = (process.argv[i]).toLowerCase()

    }

}

switch (operator) {
    case "concert-this":
        appendIt()
        concert();
        break;

    case "spotify-this-song":
        if (process.argv[3] == null) {
            userQuery = ("The Sign Ace of Base")
            appendIt()
            spotified();
        } else {
            appendIt()
            spotified();
        }
        break;

    case "movie-this":
        if (userQuery == "contact") {
            console.log("This liri-app is currently unable to return search results on movies with a rating less than 1/10.")
        } else if (process.argv[3] == null) {
            userQuery = ("Mr. Nobody")
            appendIt()
            OMDBF()
        } else {
            appendIt()
            OMDBF()
        }
        break;

    case "do-what-it-says":
        console.log("do-what-it-says");
        appendIt()
        doit()
        break;
}

function OMDBF() {
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=" + omdb.id).then(
        function (response) {
            thisMovie = response.data
            var table = new Table({
            })
            table.push(

                { "Title": thisMovie.Title },
                { "Year Produced": thisMovie.Year },
                { "imdb Rating": thisMovie.imdbRating },
                { "Rotten Tomatoes Rating: ": thisMovie.Ratings[1].Value },
                { "Country": thisMovie.Country },
                { "Language": thisMovie.Language },
                { "Plot": thisMovie.Plot },
                { "Actors": thisMovie.Actors },
            )
            console.log(table.toString())
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
            var table = new Table({
                head: ["Artist Name", "Song", "Album", "Preview URL"],
                colwidths: [100, 200]
            })
            table.push(
                [currentSpotify.artists[0].name, currentSpotify.name,
                currentSpotify.album.name, currentSpotify.external_urls.spotify,

                ])
            console.log(table.toString())
        })
}

function concert() {
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp").then(
        function (response) {
            bandsArray = response.data.map(function (event) {
                return { name: event.venue.name, place: event.venue.city + ", " + event.venue.country, date: event.datetime }

            })
            var table = new Table({
                head: ["Venue", "Located in", "Date and Time"],
                colwidths: [80, 80]
            })
            for (k = 0; k < bandsArray.length; k++) {
                showDate = moment(bandsArray[k].date).format("L")
                showTime = moment(bandsArray[k].date).format("LT")
                table.push(
                    [bandsArray[k].name, bandsArray[k].place,
                    showDate + " at " + showTime,

                    ])

            }
            console.log(table.toString())
        }
    ).catch(function (err) {
        console.log("an error occurred")
    });
}

function doit() {
    fs.readFile("./random.txt", "utf-8", function (err, data) {
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