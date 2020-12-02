const creds = require("../../credentials.js");

module.exports = {
    HOST: `${creds.RDS_HOST}`,
    USER: `${creds.RDS_USER}`,
    PASSWORD: `${creds.RDS_PASSWORD}`,
    DB: `${creds.RDS_DB}`,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};