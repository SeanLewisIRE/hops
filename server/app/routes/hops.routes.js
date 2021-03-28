module.exports = app => {
    const beers = require('../controllers/hops.controller');
    let router = require("express").Router();

    router.post("/", beers.create);

    router.get("/", beers.findAll);

    router.get("/", beers.findAllFromUser);

    router.get("/:id", beers.findOne);

    router.get("/search/:name", beers.findByName)

    app.use('/api/beers', router)
}