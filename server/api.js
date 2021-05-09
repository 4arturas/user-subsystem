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

module.exports = app;