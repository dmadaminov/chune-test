const express = require('express');
const app = express();
const path = require('path');
const { clean, getBillboard, getHNHH, getPitchfork } = require('./utils.js');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/billboardQuery/:artist', (req, res) => {
    const nameArr = req.params.artist.split(' ');
    getBillboard(nameArr[0], nameArr[1])
        .then(billboardResults => res.send(billboardResults));
});

app.get('/hnhhQuery/:artist', (req, res) => {
    const nameArr = req.params.artist.split(' ');
    getHNHH(nameArr[0], nameArr[1])
        // .then(hnhhResults => res.send(hnhhResults));
        .then(hnhhResults => res.send(clean(hnhhResults, "hnhh")));
});

app.get('/pitchforkQuery/:artist', (req, res) => {
    const nameArr = req.params.artist.split(' ');
    getPitchfork(nameArr[0], nameArr[1])
        // .then(pitchforkResults => res.send(pitchforkResults));
        .then(hnhhResults => res.send(clean(hnhhResults, "pitchfork")));
});

app.listen(8080);
