const express   = require('express');
const app       = express.Router();

const model     = require("./model");

app.get('/api/organizations', async (req, res) =>
{
    const jSonOrganizations = await model.get_Organizations();
    console.log( jSonOrganizations );
    res.json( jSonOrganizations );
});

module.exports = app;