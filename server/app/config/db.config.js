
module.exports = {
    DB: process.env.RDS_DB,
    HOST: process.env.RDS_HOST,
    USER: process.env.RDS_USER,
    PASSWORD: process.env.RDS_PASSWORD,
    PORT: process.env.RDS_PORT,
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
