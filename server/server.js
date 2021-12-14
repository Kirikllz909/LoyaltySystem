const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//TODO: Create routes for each aspect like auth loyalty and user data

app.listen(process.env.PORT || 3030, () => {
    console.log(`listening on ${process.env.PORT}`);
    db.sequelize
        .sync({ force: true })
        .then(() => {
            console.log("Drop and resync db");
        })
        .catch((err) => console.log(err));
});
