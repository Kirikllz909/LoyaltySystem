const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");

const loyaltySystemRoutes = require("./Routes/LoyaltySystem");
const userRoutes = require("./Routes/User");
const purchaseRoutes = require("./Routes/Purchase");
const systemOptionRoutes = require("./Routes/systemOption");
const paramsRatioRoutes = require("./Routes/paramsRatio");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(loyaltySystemRoutes);
app.use(userRoutes);
app.use(purchaseRoutes);
app.use(systemOptionRoutes);
app.use(paramsRatioRoutes);

app.listen(process.env.PORT || 3030, () => {
    console.log(`listening on ${process.env.PORT}`);
    db.sequelize
        .sync({ force: true })
        .then(() => {
            console.log("Drop and resync db");
        })
        .catch((err) => console.log(err));
});
