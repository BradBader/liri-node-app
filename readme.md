# Liri-node-app

What does it do?



It can do whatever you want, as long as you want to search for a song, movie, find a band on tour, or pull simple commands from a text file.

This project incorporates several NPM packages including:
    **1)** node-spotify-api,<br>
    **2)** Omdb, <br>
    **3)** dotenv,<br>
    **4)** moment,<br>
    **5)** axios,<br>
    **6)** cli-tables, and<br>
    **7)** fs,<br>

## How to use it:

### To find a song on spotify:
    On the command line: <br>
        node liri.js spotify-this-song <br>
            followed by your song of choice. <br>
            This will create a table with the Artist's Name, Song Name, Album Name, and a preview URL link.<br>
            
 <img src="./Assets/Images/spotify-this-song.gif" />    

### To find a movie on omdb:
    On the command line: <br>
        node liri.js movie-this <br>
            followed by your movie of choice.<br>
            this will create a table with the movie title, year the movie was made, the IMDB rating, the Country the movie was produced in, the Lnaguages the movie can be heard in, the basic plot of the movie, and the actors in the movie.<br>

 <img src="./Assets/Images/movie-this.gif" />

### To find a band on tour:
    On the command line:
        node liri.js concert-this
            followed by your band of choice.
            This will create a table with the venue name, city and country, as well as the date and time of the show.

 <img src="./Assets/Images/concert-this.gif" />

### To do what the text file says:
    On the command line:
        node liri.js do-what-it-says
            This will load values from the text file random.txt and run the corresponding function with preloaded values.

 <img src="./Assets/Images/do-what-it-says.gif" />
