
module.exports = app => {
    const beers = require('../controllers/hops.controller');
    let router =  require("express").Router();

    // middleware that is specific to this router
    router.use(function timeLog(req, res, next) {
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
        next()
    })

    router.post("/", beers.create);

    router.get("/", beers.findAll);

    router.get("/:id", beers.findOne);

    app.use('/api/beers', router)
}