const creds = require('../../serverCredentials')

module.exports = {
    DB: `${creds.RDS_DB}`,
    HOST: `${creds.RDS_HOST}`,
    USER: `${creds.RDS_USER}`,
    PASSWORD: `${creds.RDS_PASSWORD}`,
    PORT: `${creds.RDS_PORT}`,
    dialect: "mysql",
    dialectOptions: {
        ssl: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};