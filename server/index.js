const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const querystring = require('querystring');
const request = require('request');

const PORT = process.env.PORT || 8080;
const app = express()
module.exports = app;
const redirect_uri =  process.env.REDIRECT_URI || 'http://localhost:8080/callback';

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets');

const createApp = () => {
    // logging middleware
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // compression middleware
    app.use(compression());

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', 'public')));

    // any remaining requests with an extension (.js, .css, etc.) send 404
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error('Not found')
            err.status = 404
            next(err)
        } else {
            next()
        }
    });

    app.use('/articles', require('./articles'));
    app.use('/videos', require('./videos'));
    app.use('/recent', require('./recent'));
    app.use('/music', require('./music'));
    app.use('/artists', require('./artists'));
    app.use('/autocomplete', require('./autocomplete'));
    app.use('/events', require('./events'));
    app.use(express.static('images'));


    // error handling endware
    app.use((err, req, res, next) => {
        console.error(err)
        console.error(err.stack)
        res.status(err.status || 500).send(err.message || 'Internal server error.')
    });
    
    app.get('/auth/spotify', function(req, res) {
        res.redirect('https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: 'user-read-private user-read-email',
            redirect_uri
          }));
    });
    
    app.get('/callback', function(req, res) {
        let code = req.query.code || null
        let authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(
              process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
          },
          json: true
        }
        request.post(authOptions, function(error, response, body) {
          var access_token = body.access_token
          let uri = process.env.FRONTEND_URI || 'http://localhost:8080/home'
          res.redirect(uri + '?access_token=' + access_token)
        });
    });
    
      // sends index.html
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    });

}

const startListening = () => {
    // start listening (and create a 'server' object representing our server)
  app.listen(PORT, '0.0.0.0', () => console.log(`Mixing it up on port ${PORT}`));
}

createApp()
startListening()

