const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const querystring = require('querystring');
const request = require('request');

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'production';
const app = express();
module.exports = app;

const createApp = () => {
  app.use(morgan('dev'));

  // app.use((req, res, next) => {
  //   if (NODE_ENV === 'production') {
  //     if (req.headers['x-forwarded-proto'] != 'https') {
  //       res.redirect(302, 'https://' + req.hostname + req.originalUrl);
  //     }
  //     else {
  //       next();
  //     }
  //   }
  //   else {
  //     next();
  //   }
  // });

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(compression());

  app.use(express.static(path.join(__dirname, 'dist')));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });

  app.get('/facebook-auth', (req, res) => {
    res.redirect(`https://www.facebook.com/v3.1/dialog/oauth?${
      querystring.stringify({
        client_id: 539242329859538,
        scope: ['email'],
        redirect_uri: 'http://localhost:4000/facebook'
      })}`);
  });

  app.get('/facebook', (req, res) => {
    const { code } = req.query;
    const params = querystring.stringify({
      client_id: 539242329859538,
      redirect_uri: 'http://localhost:4000/facebook',
      client_secret: '60bbfc871a4dab7378968f9c9661bbd2',
      code
    });
    const url = `https://graph.facebook.com/v3.1/oauth/access_token?${params}`;
    request.get({ url, json: true }, (error, response, body) => {
      const accessToken = body.access_token;
      const redirectUri = 'http://localhost:4000';
      res.status(200).redirect(`${redirectUri}?access_token=${accessToken}`);
    }
    );
  });

  app.get('/auth/spotify', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?${
      querystring.stringify({
        response_type: 'code',
        client_id: '94fd2677f20d454a8b1290266f882160',
        scope: 'user-read-private user-read-email',
        redirect_uri: 'http://localhost:4000/callback'
      })}`);
  });

  app.get('/callback', (req, res) => {
    const code = req.query.code || null;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri: 'http://localhost:4000/callback',
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          '94fd2677f20d454a8b1290266f882160:65eec9d8fa014bcbbd530c0bedc5f88b'
        ).toString('base64')}`
      },
      json: true
    };
    request.post(authOptions, (error, response, body) => {
      const accessToken = body.access_token;
      const redirectUri = 'http://localhost:4000/home';
      res.redirect(`${redirectUri}?access_token=${accessToken}`);
    });
  });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
};

const startListening = () => {
  app.listen(PORT, '0.0.0.0', () => console.log(`Mixing it up on port ${PORT}`));
};

createApp();
startListening();
