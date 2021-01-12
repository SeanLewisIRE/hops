const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const path = require('path');

const corsOptions = {
    origin: 'http://localhost:3306'
}

app.use(cors(corsOptions))

// parse requests of content - type - application / json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.use(express.static(path.join(__dirname, 'server/build')));

// simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to Hops. The unopinionated beer list" });
// });

require("./app/routes/hops.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

