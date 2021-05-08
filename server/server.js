require('dotenv').config();

const express           = require('express');
const path              = require('path');

const app               = express();

const API               = require( './api' );
app.use( '/', API );

const pathToStaticResources = '../app/dist'
app.use('/assets', express.static(path.join( __dirname, pathToStaticResources + '/assets' )));
app.use('/img', express.static(path.join( __dirname, pathToStaticResources + '/img' )));

app.get('/*', (req, res)  => {

    const htmlFile = path.join( __dirname, pathToStaticResources ) + '/index.html';
    res.sendFile( htmlFile );
})
app.get('/assets/*', (req, res) => {
    const originalUrl = req.originalUrl;
    const jsPath = path.join( __dirname, pathToStaticResources ) + originalUrl;
    res.sendFile( jsPath );
})

const USER_APP_PORT = process.env.USER_APP_PORT;
app.listen( USER_APP_PORT );
console.log(`Running on port ${USER_APP_PORT}`);