// -----------------CORS--------------------------------
const cors = require("cors");

// ------------------ MongoDB Database ------------------

const mongoose = require('mongoose'); 
require('dotenv').config();

// Connect to MongoDB database
mongoose.connect("mongodb+srv://"+ process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@cluster0.2qccoqq.mongodb.net/?retryWrites=true&w=majority",
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
).then((x) => {
    console.log("Connected to MongoDB database");}
).catch((err) => {
    console.log("Error connecting to MongoDB database " + err);
});

// ------------------ Setup Passport for Authentication ------------------

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('./models/User');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        UserModel.findOne({_id: jwt_payload.identifier}, function (err, user) {
            // done(error, doesTheUserExist)
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);

// ------------------ Node Server ------------------

const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = 8000;
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');
const userInfoRoutes = require('./routes/user-info');


app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
app.use("/user-info", userInfoRoutes);

// Start server and listen on port 8000
app.listen(port, () => {
    console.log(`Node Server is listening at http://localhost:${port}`);
});

// ---------------- Spotify Auth ------------------
require('dotenv').config();
const axios = require('axios');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const querystring = require('querystring');
console.log(process.env.CLIENT_ID);

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
  
  const stateKey = 'spotify_auth_state';
  
  app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    const scope = 'user-read-private user-read-email';
  
    const queryParams = querystring.stringify({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      state: state,
      scope: scope,
    });
  
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
  });
  app.get('/callback', (req, res) => {
    const code = req.query.code || null;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
    .then(response => {
        if (response.status === 200) {
    
          const { access_token, token_type } = response.data;
    
          axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `${token_type} ${access_token}`
            }
          })
            .then(response => {
              res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
            })
            .catch(error => {
              res.send(error);
            });
    
        } else {
          res.send(response);
        }
      })
      .catch(error => {
        res.send(error);
      });
  });
  app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
  });