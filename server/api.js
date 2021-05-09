const express   = require('express');
const app       = express.Router();

const model     = require("./model");

app.get('/api/organizations', async (req, res) =>
{
    const jSonOrganizations = await model.get_Organizations();
    console.log( jSonOrganizations );
    res.json( jSonOrganizations );
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