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
        res.status(400).send(error.details[0].message);
    }
});
Router.post("/api/authService/register", (req, res) => {});

/**
 * export Router
 */
module.exports = Router;
