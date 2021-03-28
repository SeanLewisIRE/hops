const db = require("../models");

const Beer = db.models["Beer"];
const Logged_By = db.models["Logged_By"];
const User_Comments = db.models["User_Comments"];

const Op = db.Sequelize.Op;


// Create and Save a new Tutorial
exports.create = (req, res) => {

    // Validate request - This needs to be expanded to ensure duplicate beers/brewerys aren't added
    // if (!req.body.name) {
    //     res.status(400).send({
    //         message: req
    //     });
    //     return;
    // }

    const beer = {
        name: req.body.name,
        details: req.body.details,
        beer_type: req.body.beer_type,
        brewery: req.body.brewery,
        alc_per: req.body.alc_per,
        country_origin: req.body.country_origin,
        container: req.body.container,
        user_comment: req.body.user_comment,
        image_url: req.body.image_url,
        added_by: req.body.added_by,
        liked_by: req.body.liked_by
    };
    // console.log(req)
    // console.log(res)

    Beer.create(beer)
        .then((result) => {
            Logged_By.create({
                beer_id: result.dataValues.id,
                user_id: req.body.added_by,
            })
            User_Comments.create({
                beer_id: result.dataValues.id,
                user_id: req.body.added_by,
                comment: req.body.user_comment
            })
        }).catch(err => {
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
                    err.message || "Some error occurred while retrieving beers."
            });
        });
};

exports.findAllFromUser = (req, res) => {
    Beer.findAll({ where: {added_by: req.user.sub}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user beers."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Beer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Beer with id=" + id
            });
        });
};

exports.findByName = (req, res) => {
    // console.log(req.params.name)
    console.log("here$$$$$$$$$$$$")
    const name = req.params.name;

    Beer.findAll({ where: { name: {
        [Op.substring]: name
    }}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user beers."
            });
        });
}

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
