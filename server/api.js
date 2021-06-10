const express   = require('express');
const app       = express.Router();
app.use(express.json());

const model     = require("./model");

app.get('/api/clients', async (req, res) =>
{
    const jSonClients = await model.get_Clients();
    console.log( jSonClients );
    res.json( jSonClients );
});

app.get('/api/clients/client', async (req, res) =>
{
    const id = req.query.id;
    const jSonClient = await model.get_Client( id );
    console.log( jSonClient );
    res.json( jSonClient );
});

app.post('/api/clients/add', async (req, res) =>
{
    const jSon = req.body;
    const clientName = jSon.clientName;
    const client = await model.get_ClientByName( clientName );
    if ( client !== null )
    {
        return res.json( { warning: 'Client exists by given name' } );
    }
    const jSonAddResult = await model.add_Client( clientName );
    res.json( jSonAddResult );
});

app.post('/api/clients/update', async (req, res) =>
{
    const jSon = req.body;
    const clientName = jSon.clientName;
    const client = await model.get_ClientByName( clientName );
    if ( client !== null )
    {
        return res.json( { warning: 'Client exists by given name' } );
    }
    const clientId = jSon.clientId;
    const jSonAddResult = await model.update_Client( clientId, clientName );
    res.json( jSonAddResult );
});


app.get('/api/organizations', async (req, res) =>
{
    const jSonOrganizations = await model.get_Organizations();
    console.log( jSonOrganizations );
    res.json( jSonOrganizations );
});

app.get('/api/organizations/organization', async (req, res) =>
{
    const id = req.query.id;
    const jSonOrganization = await model.get_Organization( id );
    console.log( jSonOrganization );
    res.json( jSonOrganization );
});

app.get('/api/organizations/client', async (req, res) =>
{
    const clientId = req.query.clientId;
    const jSonOrganization = await model.get_OrganizationsByClient( clientId );
    console.log( jSonOrganization );
    res.json( jSonOrganization );
});

app.get('/api/organizations/client/not', async (req, res) =>
{
    const clientId = req.query.clientId;
    const jSonOrganization = await model.get_OrganizationsNotBelongingToClient( clientId );
    console.log( jSonOrganization );
    res.json( jSonOrganization );
});

app.get('/api/organizations/client/belong/info', async (req, res) =>
{
    const clientId = req.query.clientId;
    console.log( clientId );
    const jSonOrganization = await model.get_OrganizationsWithBelongInfo( clientId );
    console.log( jSonOrganization );
    res.json( jSonOrganization );
});

app.post('/api/organizations/client/attach', async (req, res) =>
{
    const jSon = req.body;
    const jSonAddResult = await model.attach_ClientToOrganization( jSon.clientId, jSon.organizationId );
    res.json( jSonAddResult );
});

app.post('/api/organizations/client/detach', async (req, res) =>
{
    const jSon = req.body;
    const jSonAddResult = await model.detach_ClientFromOrganization( jSon.clientId, jSon.organizationId );
    res.json( jSonAddResult );
});

app.post('/api/organizations/add', async (req, res) =>
{
    const jSon = req.body;
    const organizationName = jSon.organizationName;
    const organization = await model.get_OrganizationByName( organizationName );
    if ( organization !== null )
    {
        return res.json( { error: 'Organization exists by given name' } );
    }
    const jSonAddResult = await model.add_Organization( organizationName );
    res.json( jSonAddResult );
});

app.post('/api/organizations/update', async (req, res) =>
{
    const jSon = req.body;
    const organizationName = jSon.organizationName;
    const organization = await model.get_OrganizationByName( organizationName );
    if ( organization !== null )
    {
        return res.json( { error: 'Organization exists by given name' } );
    }
    const organizationId = jSon.organizationId;
    const jSonAddResult = await model.update_Organization( organizationId, organizationName );
    res.json( jSonAddResult );
});

app.get('/api/users', async (req, res) =>
{
    const jSonUsers = await model.get_Users();
    console.log( jSonUsers );
    res.json( jSonUsers );
});

app.get('/api/users/user', async (req, res) =>
{
    const id = req.query.id;
    const jSonUser = await model.get_User( id );
    console.log( jSonUser );
    res.json( jSonUser );
});

app.get('/api/users/organization', async (req, res) =>
{
    const organizationId = req.query.organizationId;
    const jSonUsers = await model.get_UsersByOrganization( organizationId );
    console.log( jSonUsers );
    res.json( jSonUsers );
});

app.post('/api/users/add', async (req, res) =>
{
    const jSon = req.body;
    const user = await model.get_UserByUserName( jSon.userName );
    if ( user !== null )
    {
        return res.json( { warning: 'User exists by given name' } );
    }
    const jSonAddResult = await model.add_NewUser( jSon.organizationId, jSon.userName, jSon.userPassword, jSon.firstName, jSon.lastName );
    res.json( jSonAddResult );
});

app.get('/api/roles', async (req, res) =>
{
    const jSonRoles = await model.get_Roles();
    console.log( jSonRoles );
    res.json( jSonRoles );
});

app.get('/api/roles/role', async (req, res) =>
{
    const id = req.query.id;
    const jSonUser = await model.get_Role( id );
    console.log( jSonUser );
    res.json( jSonUser );
});

app.get('/api/roles/user', async (req, res) =>
{
    const userId = req.query.userId;
    const jSonRoles = await model.get_RolesByUserId( userId );
    console.log( jSonRoles );
    res.json( jSonRoles );
});

module.exports = app;