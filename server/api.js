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

app.get('/api/roles', async (req, res) =>
{
    const jSonRoles = await model.get_Roles();
    console.log( jSonRoles );
    res.json( jSonRoles );
});

app.get('/api/users', async (req, res) =>
{
    const jSonUsers = await model.get_Users();
    console.log( jSonUsers );
    res.json( jSonUsers );
});

module.exports = app;