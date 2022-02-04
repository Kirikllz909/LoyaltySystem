const express = require("express");
const SystemOptionService = require("../middleware/systemOptionsService");

const Router = express.Router();

/**
 * Routes
 */
Router.put("/api/loyaltySystemService/addSystemOption", async (req, res) => {
    const data = req.body;
    const { result, error } = await SystemOptionService.addOption(data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.delete(
    "/api/loyaltySystemService/removeSystemOption/:option_id",
    async (req, res) => {
        const option_id = req.params.option_id;
        const { result, error } = await SystemOptionService.deleteOption(
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
    "/api/loyaltySystemService/updateSystemOption/:option_id",
    async (req, res) => {
        const data = req.body;
        const option_id = req.params.option_id;
        const { result, error } = await SystemOptionService.updateOption(
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
    "/api/loyaltySystemService/systemOptions/:systemId",
    async (req, res) => {
        const systemId = req.params.systemId;
        const { result, error } = await SystemOptionService.getOptions(
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
