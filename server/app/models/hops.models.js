module.exports = (sequelize, Sequelize) => {
    const Beer = sequelize.define("beer", {
        name: {
            type: Sequelize.STRING
        }, 
        details: {
            type: Sequelize.STRING
        }, 
        beer_type: {
            type: Sequelize.STRING 
        },
        brewery: {
            type: Sequelize.STRING
        },
        alc_per: {
            type: Sequelize.STRING
        },
        country_origin: {
            type: Sequelize.STRING
        },
        container: {
            type: Sequelize.STRING
        },
        image_url: {
            type: Sequelize.STRING(500)
        },
        added_by: {
            type: Sequelize.STRING
        },
        liked_by: {
            type: Sequelize.STRING
        }
    }, {
        tableName: "beer_master"
    });

    const Logged_By = sequelize.define("logged_by", {
        beer_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.STRING
        }
    }, {
        tableName: "logged_by"
    });

    const User_Comments = sequelize.define("user_comment", {
        beer_id: {
            type: Sequelize.INTEGER
        },
        user_id: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING(500)
        }
    }, {
        tableName: "user_comments"
    });

    return {Beer, Logged_By, User_Comments};
};