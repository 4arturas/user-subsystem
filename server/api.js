const express   = require('express');
const app       = express.Router();

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