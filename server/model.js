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

async function hello_World()
{
    const res = await pool.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
}

async function get_Clients()
{
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: 'SELECT ROW_TO_JSON(c) FROM clients as c;',
    });
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            client_id:         r.client_id,
            client_name:       r.client_name,
            client_add_date:   r.client_add_date
        };
        jSonArr.push( jSon );
    } // end for i
    return jSonArr;
}

async function get_Organizations()
{
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: 'SELECT ROW_TO_JSON(o) FROM organizations as o;',
    });
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
    return jSonArr;
}

async function get_Roles()
{
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: 'SELECT ROW_TO_JSON(r) FROM roles as r;',
    });
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            role_id:         r.role_id,
            role_name:       r.role_name,
            role_add_date:   r.role_add_date
        };
        jSonArr.push( jSon );
    } // end for i
    return jSonArr;
}

async function get_Users()
{
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: 'SELECT ROW_TO_JSON(u) FROM users as u;',
    });
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            user_id:         r.user_id,
            user_name:       r.user_name,
            first_name:      r.first_name,
            last_name:       r.last_name,
            user_add_date:   r.user_add_date
        };
        jSonArr.push( jSon );
    } // end for i
    return jSonArr;
}

module.exports = {
    hello_World,
    get_Clients,
    get_Organizations,
    get_Roles,
    get_Users
};