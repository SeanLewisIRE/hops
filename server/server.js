const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const path = require('path');

const db = require("./app/models");
require("./app/routes/hops.routes")(app);

const corsOptions = {
    origin: '*'
}

// if (process.env.LIVE) {
//     corsOptions.origin = 'http://hopsfyi.herokuapp.com/'
// } else {
//     corsOptions.origin = 'http://localhost:3306'
// }

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors(corsOptions))
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

