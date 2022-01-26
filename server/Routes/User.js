const express = require("express");
const UserService = require("../middleware/userService.js");

const Router = express.Router();

/**
 * Routes
 */
Router.put("/api/userService/addUser", async (req, res) => {
    const data = req.body;
    const { result, error } = await UserService.addUser(data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.delete("/api/userService/removeUser/:id", async (req, res) => {
    const id = req.params.id;
    const { result, error } = await UserService.deleteUser(id);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.patch("/api/userService/updateUser/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const { result, error } = await UserService.updateUser(id, data);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.get("/api/userService/user/:id", async (req, res) => {
    const id = req.params.id;
    const { result, error } = await UserService.getUser(id);
    if (error) {
        res.status(400).send(error.details ? error.details[0].message : error);
    }
    if (result) {
        console.log(result.details[0].message);
        res.status(200).send(result.details[0].message);
    }
});

Router.get("/api/userService/users", async (req, res) => {
    const data = req.body;
    const { result, error } = await UserService.getUsers();
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
