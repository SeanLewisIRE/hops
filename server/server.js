const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


const corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests of content - type - application / json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models/index");

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Hops. The unopinionated beer list" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

