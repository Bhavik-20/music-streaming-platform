const Dotenv = require('dotenv-webpack');

module.exports = {
    env: {
        REACT_APP_SPOTIFY_CLIENT_ID:"c4cdfc316afc45aebeffea58959ac714",
        REACT_APP_SPOTIFY_REDIRECT_URI:"http://localhost:3000/",
        REACT_APP_SPOTIFY_SCOPES:"user-read-private user-read-email",
    },
  }