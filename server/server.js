require('dotenv').config();

const express           = require('express');
const path              = require('path');

const app               = express();

const POSTGRESS_HOST        = process.env.POSTGRESS_HOST;
const POSTGRESS_USER        = process.env.POSTGRESS_USER;
const POSTGRESS_PASSWORD    = process.env.POSTGRESS_PASSWORD;
const POSTGRESS_PORT        = process.env.POSTGRESS_PORT;
const POSTGRESS_DATABASE    = process.env.POSTGRESS_DATABASE;
const Pool = require('pg').Pool;
const pool = new Pool({
    host:       POSTGRESS_HOST,
    user:       POSTGRESS_USER,
    password:   POSTGRESS_PASSWORD,
    port:       POSTGRESS_PORT,
    database:   POSTGRESS_DATABASE
});
// await pool.connect();

const pathToStaticResources = '../app/dist'
app.use('/assets', express.static(path.join( __dirname, pathToStaticResources + '/assets' )));
app.use('/img', express.static(path.join( __dirname, pathToStaticResources + '/img' )));

app.get('/', async (req, res)  => {
    const resp = await pool.query('SELECT $1::text as message', ['Hello world!'])
    console.log(resp.rows[0].message) // Hello world!
    await pool.end()

    const htmlFile = path.join( __dirname, pathToStaticResources ) + '/index.html';
    res.sendFile( htmlFile );
})

const USER_APP_PORT = process.env.USER_APP_PORT;
app.listen( USER_APP_PORT );
console.log(`Running on port ${USER_APP_PORT}`);