require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const path = require('path');
const db = require("./app/models");

const app = express();
app.use(bodyParser.json())

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-prmczu8a.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://hops-api',
    issuer: 'https://dev-prmczu8a.eu.auth0.com/',
    algorithms: ['RS256']
});


const corsOptions = {
    origin: ''
}

if (process.env.REACT_APP_DEPLOY === 'true') {
    corsOptions.origin = 'https://hopsfyi.herokuapp.com/api/beers'
} else {
    corsOptions.origin = 'https://localhost:3306'
}
app.use(cors());


app.all('*', jwtCheck, function (req, res, next) {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require("./app/routes/hops.routes")(app);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})