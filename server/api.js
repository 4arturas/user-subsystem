const express   = require('express');
const app       = express.Router();


app.get('/api/organizations', (req, res) =>
{
    const jSonOrganizations = [{ org_id: '1' }];
    res.json( jSonOrganizations );
});

module.exports = app;