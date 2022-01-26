const express = require("express");
const PurchaseService = require("../middleware/purchaseService");

const Router = express.Router();

/**
 * Routes
 */
Router.put("/api/userService/addPurchase", async (req, res) => {
    const data = req.body;
    const { result, error } = await PurchaseService.addPurchase(data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.delete("/api/userService/removePurchase/:id", async (req, res) => {
    const id = req.params.id;
    const { result, error } = await PurchaseService.deletePurchase(id);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.patch("/api/userService/updatePurchase/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const { result, error } = await PurchaseService.updatePurchase(id, data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.get("/api/userService/purchasesUser/:id", async (req, res) => {
    const id = req.params.id;
    const { result, error } = await PurchaseService.getUserPurchases(id);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.get("/api/userService/purchaseHistory", async (req, res) => {
    const data = req.body;
    const { result, error } = await PurchaseService.getPurchaseHistory();
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

/**
 * export Router
 */
module.exports = Router;
