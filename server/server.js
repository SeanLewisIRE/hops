const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const db = require("./app/models");
const { auth, requiresAuth } = require('express-openid-connect');
const serverCredentials = require("./serverCredentials");

const app = express();
app.use(bodyParser.json())


const corsOptions = {
    origin: ''
}
if (process.env.REACT_APP_DEPLOY === 'true') {
    corsOptions.origin = 'https://hopsfyi.herokuapp.com/api/beers'
} else {
    corsOptions.origin = 'http://localhost:8080/api'
}
app.use(cors());


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: serverCredentials.AUTH_SECRET,
    baseURL: 'http://localhost:8080/',
    clientID: '7synNevGl37rECv6tBS3Hv06mYduRgmL',
    issuerBaseURL: 'https://dev-prmczu8a.eu.auth0.com'
};

app.use(auth(config));

// app.all('*', function (req, res) {
//     res.header("Access-Control-Allow-Origin", corsOptions.origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

// });

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

