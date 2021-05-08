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

async function hello_World()
{
    const resp = await pool.query('SELECT $1::text as message', ['Hello world!'])
    console.log(resp.rows[0].message) // Hello world!
    await pool.end()
}

module.exports = { hello_World };