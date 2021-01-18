const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const path = require('path');

const db = require("./app/models");


const corsOptions = {
    origin: ''
}

if (process.env.REACT_APP_DEPLOY === 'true') {
    corsOptions.origin = 'https://hopsfyi.herokuapp.com/api/beers'
} else {
    corsOptions.origin = 'http://localhost:3306/api'
}

app.use(cors());
require("./app/routes/hops.routes")(app);

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", corsOptions.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

