# README

# BAPS (Better Artist Page Spotify)
![Showcase](./readme_assets/showcase.gif)

# Features
  - Fuzzy Searching for Artists
    - Thanks to the great [Fuse.js Library](https://fusejs.io/)
  - Sorting Artists
    - Alphabetically A-Z and Z-A.
    - By Followers High-Low and Low-High.
    - Whatever default order Spotify's API decided to give me the 
    artists in.
    - Unfortunately there's no data regarding when a user followed an artist,
    so I wasn't able to implement a sort through followed date.

# Why?
  - I mostly use the web version of spotify and I was a little annoyed that I 
  couldn't do things like just search through my artists, sort them in
  different ways and see how many I follow. (Maybe this is available on the
  App version)
  - I wanted to learn more about rails and OAuth so decided this would be a 
  great opportunity.
  - Front end and website design is not my strength (As you could probably
  tell lol) but Bulma CSS came to the rescue making it less painful to make
  the website look decent and that was nice to learn too!

# Running it locally
  1. Fork/Clone the repo
  2. cd into local repo
  3. Run "bundle install"
  4. Setup your own Spotify App
    - Find out more [here](https://developer.spotify.com/)
    - Make sure the callback url is correct on your app, it should redirect to
    the /auth/spotify/callback endpoint
  5. Setup [Figaro](https://github.com/laserlemon/figaro)
    - Make sure your application.yml contains the following two keys: 
    spotify_client_id and spotify_client_secret
    - These are taken from your Spotify App
    - Make sure you're not sharing these keys in public!
  6. Open a new tab/terminal and run "rails s" to start server
  7. Hopefully everything works!

# Credits

## Making the website sexy
  - [Bulma CSS](https://bulma.io/)

## Hosting
  - [Heroku](https://heroku.com)

## Fuzzy Search Library
  - [Fuse.js Library](https://fusejs.io/)

## OAuth
  - [Omniauth](https://github.com/omniauth/omniauth)
  - [omniauth-spotify](https://github.com/icoretech/omniauth-spotify)

## Environment Variables
  - [Figaro](https://github.com/laserlemon/figaro)

## Favicon
  - [Music icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/music "music icons")
