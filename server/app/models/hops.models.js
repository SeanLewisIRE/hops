module.exports = (sequelize, Sequelize) => {
    const beer_master = sequelize.define("beer_master", {
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
        }   
    });

    return beer;
};