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
    const res = await pool.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await pool.end()
}

async function get_Organizations()
{
    const jSonArr = [];
    const client = await pool.connect();
    const result = await client.query({
        rowMode: 'array',
        text: 'SELECT ROW_TO_JSON(o) FROM organizations as o;',
    })
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            org_id:         r.org_id,
            org_name:       r.org_name,
            org_add_date:   r.org_add_date
        };
        jSonArr.push( jSon );
    } // end for i
    await client.end()
    return jSonArr;
}

module.exports = {
    hello_World,
    get_Organizations
};