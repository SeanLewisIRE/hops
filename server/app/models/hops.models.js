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
    return Beer;
};