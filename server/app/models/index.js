

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.RDS_DB, dbConfig.RDS_USER, dbConfig.RDS_PASSWORD, {
    host: dbConfig.RDS_HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;