const db = require("../models");
// console.log(db)
const Beer = db.beers;
const Op = db.Sequelize.Op;


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: req
        });
        return;
    }

    // Create a Tutorial
    const beer = {
        name: req.body.name,
        details: req.body.details,
        brewery: req.body.published,
        alc_per: req.body.alc_per,
        country_origin: req.country_origin,
        container: req.container
    };

    
    // Save Tutorial in the database
    Beer.create(beer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "An error occurred while adding the beer."
            });
        });
};

// Retrieve all Beers from the database.
exports.findAll = (req, res) => {

    Beer.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    beer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Beer with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};