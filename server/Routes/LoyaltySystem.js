const express = require("express");
const LoyaltySystemService = require("../middleware/loyaltySystemService.js");

const Router = express.Router();

/**
 * Routes
 */
Router.put("/api/loyaltySystemService/addLoyaltySystem", async (req, res) => {
    const data = req.body;
    const { result, error } = await LoyaltySystemService.addLoyaltySystem(data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.delete(
    "/api/loyaltySystemService/removeLoyaltySystem",
    async (req, res) => {
        const data = req.body;
        const { result, error } =
            await LoyaltySystemService.removeLoyaltySystem(data.systemId);
        if (error) {
            res.status(400).send(
                error.details ? error.details[0].message : error
            );
        }
        if (result) {
            console.log(result.details[0].message);
            res.status(200).send(result.details[0].message);
        }
    }
);

Router.patch(
    "/api/loyaltySystemService/updateLoyaltySystem",
    async (req, res) => {
        const data = req.body;
        const { result, error } =
            await LoyaltySystemService.updateLoyaltySystem(data.systemId, data);
        if (error) {
            res.status(400).send(
                error.details ? error.details[0].message : error
            );
        }
        if (result) {
            console.log(result.details[0].message);
            res.status(200).send(result.details[0].message);
        }
    }
);

/**
 * export Router
 */
module.exports = Router;
