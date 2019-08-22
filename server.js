const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

var key = fs.readFileSync(__dirname + '/certificates/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certificates/selfsigned.crt');

var credentials = {key: key, cert: cert};

const app = express();

const port = process.env.PORT || 8001;

app.use(express.static(__dirname + '/dist/pibbleApp'));

app.get('/*', (req, rep) => res.sendFile(path.join(__dirname)));

const server = https.createServer(credentials, app);

server.listen(port, () => console.log('Running ...'));