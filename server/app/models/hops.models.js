module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("beer", {
        title: {
            type: Sequelize.STRING
        }, 
        brewery: {
            type: Sequelize.STRING
        }, 
        percentage: {
            type: Sequelize.INTEGER 
        }
    });

    return beer;
};