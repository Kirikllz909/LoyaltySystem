const express = require("express");
const CumulativeOptionsService = require("../middleware/cumulativeOptionsService");

const Router = express.Router();

/**
 * Routes
 */
Router.put(
    "/api/loyaltySystemService/addCumulativeOption",
    async (req, res) => {
        const data = req.body;
        const { result, error } = await CumulativeOptionsService.addOption(
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

Router.delete(
    "/api/loyaltySystemService/removeCumulativeOption/:option_id",
    async (req, res) => {
        const option_id = req.params.option_id;
        const { result, error } = await CumulativeOptionsService.deleteOption(
            option_id
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

Router.patch(
    "/api/loyaltySystemService/updateCumulativeOption/:option_id",
    async (req, res) => {
        const data = req.body;
        const option_id = req.params.option_id;
        const { result, error } = await CumulativeOptionsService.updateOption(
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
    "/api/loyaltySystemService/cumulativeOptions/:systemId",
    async (req, res) => {
        const systemId = req.params.systemId;
        const { result, error } = await CumulativeOptionsService.getOptions(
            systemId
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

/**
 * export Router
 */
module.exports = Router;
