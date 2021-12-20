const Joi = require("joi");
const bcrypt = require("bcrypt");
const UserController = require("../controllers/user.controller");
const LoyaltySystemController = require("../controllers/loyaltySystem.controller");
const { createToken } = require("./JWT_Token");

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
            balance: Joi.number().min(1),
            systemId: Joi.number().min(1),
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
        if (!users || users.length === 0) return false;
        const filteredArray = users.filter((user) => user.login === login);
        if (filteredArray.length === 0) return false;
        return true;
    }

    /**
     * Find user by provided login
     * @param {*} login Login for searching
     * @returns User
     */

    async findByLogin(data) {
        const { login } = data;
        const users = await UserController.findAllUsers();
        if (!users || users.length === 0) return false;
        const filteredArray = users.filter((user) => user.login === login);
        if (filteredArray.length === 0) return false;
        return filteredArray[0];
    }

    /**
     * Find is user exist in database by provided data with email
     * @param {*} data Data with login
     * @returns
     */

    async isEmailExist(data) {
        const { email } = data;
        const users = await UserController.findAllUsers();
        if (!users || users.length === 0) return false;
        const filteredArray = users.filter((user) => user.email === email);
        if (filteredArray.length === 0) return false;
        return true;
    }

    async isPasswordCorrect(data) {
        const { password } = data;
        const user = await this.findByLogin(data);
        if (!user) return false;
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
        const user = await this.findByLogin(data);
        const token = createToken({ login: login, id: user.id });
        return { login: login, id: user.id, jwt: token };
    }

    async login(data) {
        try {
            const { error } = this.loginValidation(data); //Check req.body data
            if (error) {
                return { error: "" + error };
            }
        } catch (error) {
            return { error: "" + error };
        }

        const isLoginExist = await this.isLoginExist(data);
        if (!isLoginExist) {
            return {
                error: { details: [{ message: "Wrong login or password" }] },
            };
        } // Error format: error.details[0].message

        const isPasswordCorrect = await this.isPasswordCorrect(data);
        if (!isPasswordCorrect) {
            return {
                error: {
                    details: [{ message: "Wrong login or password" }],
                },
            };
        }

        const tokenObject = await this.createTokenObject(data);

        try {
            await UserController.updateUser(tokenObject.id, {
                jwt_token: tokenObject.jwt,
            });
            return { result: { tokenObject } };
        } catch (error) {
            return { error: "" + error };
        }
    }

    async register(data) {
        try {
            const { error } = this.registerValidation(data);
            if (error) return { error: "" + error };
        } catch (error) {
            return { error: "" + error };
        }

        const isRepeatPasswordCorrect = await this.isRepeatPasswordCorrect(
            data
        );
        if (!isRepeatPasswordCorrect) {
            return {
                error: {
                    details: [
                        {
                            message:
                                "Password and repeat password are not equal",
                        },
                    ],
                },
            };
        }

        const isLoginExist = await this.isLoginExist(data);
        if (isLoginExist) {
            return {
                error: { details: [{ message: "Login already exists" }] },
            };
        }

        const isEmailExist = await this.isEmailExist(data);
        if (isEmailExist) {
            return {
                error: { details: [{ message: "Email already exists" }] },
            };
        }

        let salt, hashedPassword;
        try {
            salt = await bcrypt.genSalt(10);
        } catch (err) {
            return { error: "" + error };
        }

        try {
            hashedPassword = await bcrypt.hash(data.password, salt);
        } catch (error) {
            return { error: "" + error };
        }

        try {
            const defaultSystem =
                await LoyaltySystemController.findDefaultSystem();
            const createdUser = await UserController.createUser(data.systemId, {
                login: data.login,
                password: hashedPassword,
                email: data.email,
                role: "user",
                balance: data.balance ? data.balance : 0,
                systemId: data.systemId
                    ? data.systemId
                    : defaultSystem.system_id,
            });
            if (!createdUser) {
                return {
                    error: {
                        details: [{ message: "Error while creating user" }],
                    },
                };
            }
            return {
                result: {
                    details: [{ message: "User was created successfully" }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }
}

module.exports = new AuthService();
