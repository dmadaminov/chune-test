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

const createApp = () => {
    app.use(morgan('dev'));

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended: true}));

    app.use(compression());

    app.use(express.static(path.join(__dirname, '..', 'public')));

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

    app.use((err, req, res, next) => {
        console.error(err)
        console.error(err.stack)
        res.status(err.status || 500).send(err.message || 'Internal server error.')
    });

    app.get('/facebook', (req, res) => {
      const { code } = req.query;
      const params = querystring.stringify({
        client_id: 539242329859538,
        redirect_uri: 'http://localhost:8080/facebook',
        client_secret: '60bbfc871a4dab7378968f9c9661bbd2',
        code
      });
      const url = `https://graph.facebook.com/v3.1/oauth/access_token?${params}`;
      request.get({ url, json: true }, (error, response, body) => {
        const access_token = body.access_token;
        let uri = 'http://localhost:8080';
        res.status(200).redirect(uri + '?access_token=' + access_token);
        }
      );
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
            redirect_uri: process.env.REDIRECT_URI || 'http://localhost:8080/callback',
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

    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    });

}

const startListening = () => {
  app.listen(PORT, '0.0.0.0', () => console.log(`Mixing it up on port ${PORT}`));
}

createApp()
startListening()

