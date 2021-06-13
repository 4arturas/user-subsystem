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
async function get_Client( id )
{
    const res = await pool.query('SELECT ROW_TO_JSON(c) FROM clients as c where c.client_id='+id);
    console.log( res.rows );
    if ( res.rows.length == null )
        return {};
    return res.rows[0].row_to_json;
}
async function get_ClientByName( clientName )
{
    const res = await pool.query(`SELECT ROW_TO_JSON(c) FROM clients as c where c.client_name='${clientName}'`);
    console.log( res.rows );
    if ( res.rows.length === 0 )
        return null;
    return res.rows[0].row_to_json;
}
async function add_Client( clientName )
{
    const res = await pool.query( `INSERT INTO clients(client_name, client_add_date) VALUES('${clientName}', now())` );
    return { ok: 1 };
}
async function update_Client( clientId, clientName )
{
    const res = await pool.query( `update clients set client_name='${clientName}' where client_id=${clientId}` );
    return { ok: 1 };
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

async function get_Organization( id )
{
    const res = await pool.query('SELECT ROW_TO_JSON(o) FROM organizations as o where o.org_id='+id);
    console.log( res.rows );
    if ( res.rows.length == null )
        return {};
    return res.rows[0].row_to_json;
}

async function get_OrganizationsByClient( clientId )
{
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: `select ROW_TO_JSON(o) from clients_organizations co, organizations o where co.org_id = o.org_id and co.client_id = ${clientId} and co.end_date is null`,
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

async function get_OrganizationsNotBelongingToClient( clientId )
{
    const sql = `select ROW_TO_JSON(v) from (
                                                select o.*
                                                from organizations o
                                                where o.org_id not in (select org_id from clients_organizations)
                                                    union
                                                select o.* from organizations o where o.org_id in (
                                                    select co.org_id
                                                    from clients_organizations co
                                                    where co.client_id = ${clientId}
                                                      and co.org_id not in (
                                                        select org_id from clients_organizations where client_id = ${clientId} and end_date is null
                                                    )
                                                )
                                            ) v`;
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: sql,
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

async function get_OrganizationsWithBelongInfo( clientId )
{
    const sql = `select ROW_TO_JSON(v) from (
                                     select o.*, 0 as belongs
                                     from organizations o
                                     where o.org_id not in
                                           (select org_id from clients_organizations co where co.client_id = ${clientId} and co.end_date is null)
                                     union
                                     select o.*, 1 as belongs
                                     from organizations o
                                     where o.org_id in
                                           (select org_id from clients_organizations co where co.client_id = ${clientId} and co.end_date is null)
                                 ) v order by v.org_id`;
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: sql,
    });
    console.log( result );
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            org_id:         r.org_id,
            org_name:       r.org_name,
            org_add_date:   r.org_add_date,
            belongs:        r.belongs
        };
        jSonArr.push( jSon );
    } // end for i
    return jSonArr;
}

async function attach_ClientToOrganization( clientId, organizationId )
{
    const res = await pool.query( `insert into clients_organizations(client_id, org_id, start_date) values (${clientId}, ${organizationId}, now())` );
    return { ok: 1 };
}

async function detach_ClientFromOrganization( clientId, organizationId )
{
    const res = await pool.query( `update clients_organizations set end_date = now() where org_id = ${organizationId} and client_id = ${clientId} and end_date is null` );
    return { ok: 1 };
}

async function get_OrganizationByName( organizationName )
{
    const res = await pool.query(`SELECT ROW_TO_JSON(o) FROM organizations as o where o.org_name='${organizationName}'`);
    console.log( res.rows );
    if ( res.rows.length === 0 )
        return null;
    return res.rows[0].row_to_json;
}
async function add_Organization( organizationName )
{
    const res = await pool.query( `INSERT INTO organizations(org_name, org_add_date) VALUES('${organizationName}', now())` );
    return { ok: 1 };
}
async function update_Organization( organizationId, organizationName )
{
    const res = await pool.query( `UPDATE organizations set org_name='${organizationName}' WHERE org_id=${organizationId}` );
    return { ok: 1 };
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

async function get_User( id )
{
    const res = await pool.query('SELECT ROW_TO_JSON(u) FROM users as u where u.user_id='+id);
    console.log( res.rows );
    if ( res.rows.length == null )
        return {};
    return res.rows[0].row_to_json;
}

async function get_UsersByOrganization( organizationId )
{
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: 'select ROW_TO_JSON(v) from (\n' +
            '                  select u.*, ou.start_date, ou.end_date\n' +
            '                  from organizations_users ou,\n' +
            '                       users u\n' +
            '                  where ou.user_id = u.user_id and ou.end_date is null ' +
            '                    and ou.org_id = '+organizationId+'\n' +
            ') v',
    });
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            user_id:         r.user_id,
            user_name:       r.user_name,
            first_name:      r.first_name,
            last_name:       r.last_name,
            user_add_date:   r.user_add_date,
            start_date:      r.start_date,
            end_date:        r.end_date
        };
        jSonArr.push( jSon );
    } // end for i
    return jSonArr;
}

async function get_UsersByOrganizationWithBelongInfo( organizationId )
{
    const sql = `select ROW_TO_JSON(v) from (
                  select u.*, 1 as belongs
                  from users u
                  where u.user_id in (
                      select distinct on (user_id) user_id from organizations_users ou where ou.org_id = ${organizationId} and ou.end_date is null
                  )
                  union
                  select u.*, 0 as belongs
                  from users u
                  where u.user_id not in (
                      select distinct on (user_id) user_id from organizations_users ou where ou.org_id = ${organizationId} and ou.end_date is null
                  )
              ) v order by v.user_id`;
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: sql
    });
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            user_id:         r.user_id,
            user_name:       r.user_name,
            first_name:      r.first_name,
            last_name:       r.last_name,
            user_add_date:   r.user_add_date,
            start_date:      r.start_date,
            end_date:        r.end_date,
            belongs:         r.belongs
        };
        jSonArr.push( jSon );
    } // end for i
    return jSonArr;
}

async function get_UserByUserName( userName )
{
    const res = await pool.query(`SELECT ROW_TO_JSON(u) FROM users as u where u.user_name='${userName}'`);
    console.log( 'rows: ' + res.rows.length );
    if ( res.rows.length === 0 )
        return null;
    return res.rows[0].row_to_json;
}

async function add_NewUser( organizationId, userName, userPassword, firstName, lastName )
{
    const res = await pool.query( `INSERT INTO users(user_name, first_name, last_name, user_add_date) VALUES('${userName}', '${firstName}', '${lastName}', now())` );
    return { ok: 1 };
}

async function detach_UserFromOrganization( userId, organizationId )
{
    const res = await pool.query( `update organizations_users set end_date = now() where user_id = ${userId} and org_id = ${organizationId} and end_date is null` );
    return { ok: 1 };
}

async function attach_UserToOrganization( userId, organizationId )
{
    const res = await pool.query( `insert into organizations_users(org_id, user_id, start_date) values (${organizationId}, ${userId}, now())` );
    return { ok: 1 };
}

async function update_User( userId, userName, firstName, lastName )
{
    const res = await pool.query( `update users set user_name='${userName}', first_name='${firstName}', last_name='${lastName}' where user_id=${userId}` );
    return { ok: 1 };
}
async function add_User( userName, firstName, lastName )
{
    const res = await pool.query( `INSERT INTO users(user_name, first_name, last_name, user_add_date) VALUES('${userName}', '${firstName}', '${lastName}' now())` );
    return { ok: 1 };
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

async function get_Role( id )
{
    const res = await pool.query('SELECT ROW_TO_JSON(r) FROM roles as r where r.role_id='+id);
    console.log( res.rows );
    if ( res.rows.length == null )
        return {};
    return res.rows[0].row_to_json;
}

async function get_RolesByUserId( userId )
{
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: 'select ROW_TO_JSON(v) from ( select r.*, ur.start_date, ur.end_date from users_roles ur, roles r where ur.role_id = r.role_id and ur.end_date is null and ur.user_id = '+userId+' ) v'
    });
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            role_id:         r.role_id,
            role_name:       r.role_name,
            role_add_date:   r.role_add_date,
            start_date:      r.start_date,
            end_date:        r.end_date
        };
        jSonArr.push( jSon );
    } // end for i
    return jSonArr;
}

async function get_RolesWithBelongInfo( userId )
{
    const sql = `select ROW_TO_JSON(v) from (
select r.*, 1 as belongs from roles r where r.role_id in ( select role_id from users_roles where user_id = ${userId} and end_date is null )
union
select r.*, 0 as belongs from roles r where r.role_id not in ( select role_id from users_roles where user_id = ${userId} and end_date is null )
              ) v order by v.role_id`;
    const jSonArr = [];
    const result = await pool.query({
        rowMode: 'array',
        text: sql
    });
    for ( let i = 0; i < result.rows.length; i++ )
    {
        const r = result.rows[i][0];
        const jSon = {
            role_id:         r.role_id,
            role_name:       r.role_name,
            role_add_date:   r.role_add_date,
            belongs:         r.belongs
        };
        jSonArr.push( jSon );
    } // end for i
    console.log( jSonArr );
    return jSonArr;
}

async function detach_RoleFromUser( roleId, userId )
{
    const res = await pool.query( `update users_roles set end_date = now() where user_id = ${userId} and role_id = ${roleId} and end_date is null` );
    return { ok: 1 };
}

async function attach_RoleToUser( roleId, userId )
{
    const res = await pool.query( `insert into users_roles(user_id, role_id, start_date) values (${userId}, ${roleId}, now())` );
    return { ok: 1 };
}

async function get_RoleByName( roleName )
{
    const res = await pool.query(`SELECT ROW_TO_JSON(r) FROM roles as r where r.role_name='${roleName}'`);
    console.log( 'rows: ' + res.rows.length );
    if ( res.rows.length === 0 )
        return null;
    return res.rows[0].row_to_json;
}

async function update_Role( roleId, roleName )
{
    const res = await pool.query( `update roles set role_name='${roleName}' where role_id=${roleId}` );
    return { ok: 1 };
}

async function add_Role( roleName )
{
    const res = await pool.query( `INSERT INTO roles(role_name, role_add_date) VALUES('${roleName}', now())` );
    return { ok: 1 };
}

module.exports = {
    hello_World,
    get_Clients,
    get_Client,
    get_ClientByName,
    add_Client,
    update_Client,
    get_Organizations,
    get_Organization,
    get_OrganizationsByClient,
    get_OrganizationsNotBelongingToClient,
    get_OrganizationsWithBelongInfo,
    attach_ClientToOrganization,
    detach_ClientFromOrganization,
    get_OrganizationByName,
    add_Organization,
    update_Organization,
    get_Users,
    get_User,
    get_UsersByOrganization,
    get_UsersByOrganizationWithBelongInfo,
    get_UserByUserName,
    add_NewUser,
    detach_UserFromOrganization,
    attach_UserToOrganization,
    update_User,
    add_User,
    get_Roles,
    get_Role,
    get_RolesByUserId,
    get_RolesWithBelongInfo,
    detach_RoleFromUser,
    attach_RoleToUser,
    get_RoleByName,
    update_Role,
    add_Role
};
