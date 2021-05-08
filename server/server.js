const express           = require('express');
const path              = require('path');

const app               = express();

const pathToStaticResources = '../app/dist'
app.use('/assets', express.static(path.join( __dirname, pathToStaticResources + '/assets' )));
app.use('/img', express.static(path.join( __dirname, pathToStaticResources + '/img' )));

app.get('/', (req, res) => {
    const htmlFile = path.join( __dirname, pathToStaticResources ) + '/index.html';
    res.sendFile( htmlFile );
})

const USERS_APP_PORT = 4000;
app.listen( USERS_APP_PORT );
console.log(`Running on port ${USERS_APP_PORT}`);