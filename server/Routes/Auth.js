const express = require("express");
const AuthService = require("../middleware/authService.js");

const Router = express.Router();

/**
 * Routes
 */
Router.post("/api/authService/login", async (req, res) => {
    const data = req.body;
    const { result, error } = await AuthService.login(data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});
Router.post("/api/authService/register", async (req, res) => {
    const data = req.body;
    const { result, error } = await AuthService.register(data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(201).send(result.details[0].message);
    }
});

/**
 * export Router
 */
module.exports = Router;
