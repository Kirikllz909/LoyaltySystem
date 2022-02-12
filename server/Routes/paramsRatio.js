const express = require("express");
const ParamsRatioService = require("../middleware/paramsRatioService");

const Router = express.Router();

/**
 * Routes
 */
Router.put("/api/loyaltySystemService/addParamsRatio", async (req, res) => {
    const data = req.body;
    const { result, error } = await ParamsRatioService.addParamsRatio(data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.delete(
    "/api/loyaltySystemService/removeParamsRatio/:params_ratio_id",
    async (req, res) => {
        const params_ratio_id = req.params.params_ratio_id;
        const { result, error } = await ParamsRatioService.deleteParamsRatio(
            params_ratio_id
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
    "/api/loyaltySystemService/updateParamsRatio/:params_ratio_id",
    async (req, res) => {
        const data = req.body;
        const params_ratio_id = req.params.params_ratio_id;
        const { result, error } = await ParamsRatioService.updateParamsRatio(
            params_ratio_id,
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
    "/api/loyaltySystemService/paramsRatio/:systemId",
    async (req, res) => {
        const systemId = req.params.systemId;
        const { result, error } = await ParamsRatioService.getParamsRatio(
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
