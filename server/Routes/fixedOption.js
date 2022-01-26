const express = require("express");
const FixedOptionsService = require("../middleware/fixedOptionsService");

const Router = express.Router();

/**
 * Routes
 */
Router.put("/api/loyaltySystemService/addFixedOption", async (req, res) => {
    const data = req.body;
    const { result, error } = await FixedOptionsService.addOption(data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.patch(
    "/api/loyaltySystemService/updateFixedOption/:option_id",
    async (req, res) => {
        const data = req.body;
        const option_id = req.params.option_id;
        const { result, error } = await FixedOptionsService.updateOption(
            option_id,
            data
        );
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

Router.get(
    "/api/loyaltySystemService/fixedOption/:systemId",
    async (req, res) => {
        const systemId = req.params.systemId;
        const { result, error } = await FixedOptionsService.getOption(systemId);
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
