const Joi = require("joi");
const bcrypt = require("bcrypt");
const UserController = require("../controllers/user.controller");
const { createToken, validateToken } = require("./JWT_Token");

//TODO: create user login and register
class AuthService {
    /**
     * Return result of comparing data with schema for authorization
     * @param {*} data data with login and password
     * @returns Boolean result
     */
    loginValidation(data) {
        const schema = Joi.object({
            login: Joi.string().min(6).required(),
            password: Joi.string().min(6).required(),
        });
        return schema.validate(data);
    }

    /**
     * Return result of comparing data with schema for registration
     * @param {*} data data with login, email, password and repeatPassword
     * @returns
     */

    registerValidation(data) {
        const schema = Joi.object({
            login: Joi.string().min(6).alphanum(),
            email: Joi.string().min(6).email(),
            password: Joi.string().min(6).required(),
            repeatPassword: Joi.string().min(6).required(),
        });
        return schema.validate(data);
    }

    /**
     * Find is user exist in database by provided data with login
     * @param {*} data Data with login
     * @returns
     */

    async isLoginExist(data) {
        const { login } = data;
        const users = await UserController.findAllUsers();
        const isExist = users.some((user) => {
            user.login === login;
        });
        return isExist;
    }

    /**
     * Find user by provided login
     * @param {*} login Login for searching
     * @returns User
     */

    async findByLogin(login) {
        const users = await UserController.findAllUsers();
        const filteredUsers = users.filter((user) => user.login === login);
        return filteredUsers[0];
    }

    /**
     * Find is user exist in database by provided data with email
     * @param {*} data Data with login
     * @returns
     */

    async isEmailExist(data) {
        const { email } = data;
        const users = await UserController.findAllUsers();
        let isExist = users.some((user) => {
            user.email === email;
        });
        return isExist;
    }
    //TODO: add bcrypt to adding user and checking login

    async isPasswordCorrect(data) {
        const { login, password } = data;
        const user = await this.findByLogin(login);
        const validPassword = await bcrypt.compare(password, user.password);
        return validPassword;
    }

    isRepeatPasswordCorrect(data) {
        const { password, repeatPassword } = data;
        return password === repeatPassword;
    }

    /**
     * Create object with login, id and jwt fields
     * @param {*} data Data for creating token. Should contain login
     * @returns tokenObject
     */
    async createTokenObject(data) {
        const { login } = data;
        const user = findByLogin(login);
        const token = createToken({ login: login, id: user.id });
        return { login: login, id: user.id, jwt: token };
    }

    async login(data) {
        try {
            const { error } = this.loginValidation(data); //Check req.body data
            if (error) {
                return { error };
            }
        } catch (err) {
            return { err };
        }

        const isLoginExist = await this.isLoginExist(data);
        if (!isLoginExist) {
            return {
                error: { details: [{ message: "Wrong login or password" }] },
            };
        } // Error format: error.details[0].message

        const isPasswordCorrect = this.isPasswordCorrect(data);
        if (!isPasswordCorrect) {
            return {
                error: { details: [{ message: "Wrong login or password[2]" }] },
            };
        }

        const tokenObject = await this.createTokenObject(data);
        return { result: { tokenObject } };
    }

    register(data) {}
}

module.exports = new AuthService();
