require('dotenv').config();

const express           = require('express');
const path              = require('path');

const app               = express();

const model             = require("./model");

const pathToStaticResources = '../app/dist'
app.use('/assets', express.static(path.join( __dirname, pathToStaticResources + '/assets' )));
app.use('/img', express.static(path.join( __dirname, pathToStaticResources + '/img' )));

app.get('/', async (req, res)  => {

    model.hello_World();

    const htmlFile = path.join( __dirname, pathToStaticResources ) + '/index.html';
    res.sendFile( htmlFile );
})

const USER_APP_PORT = process.env.USER_APP_PORT;
app.listen( USER_APP_PORT );
console.log(`Running on port ${USER_APP_PORT}`);