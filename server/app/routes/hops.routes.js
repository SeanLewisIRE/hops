
module.exports = app => {
    const beers = require('../controllers/hops.controller');
    let router =  require("express").Router();
    const { auth, requiresAuth } = require('express-openid-connect');

    app.get('/login', (req, res) => {
    });

    app.get('/status', (req, res) => {
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });

    app.get('/profile', requiresAuth(), (req, res) => {
        res.send(JSON.stringify(req.oidc.user));
    });

    router.post("/", requiresAuth(), beers.create);

    router.get("/", requiresAuth(), beers.findAll);

    router.get("/:id", requiresAuth(), beers.findOne);

    app.use('/api/beers', requiresAuth(), router)
}