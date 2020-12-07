const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    port: dbConfig.PORT, 
    dialect: dbConfig.dialect,
    sll: 'Amazon RDS',
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

db.beers = require("./hops.models.js")(sequelize, Sequelize);

module.exports = db;
