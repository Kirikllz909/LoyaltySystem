const Joi = require("joi");
const userController = require("../controllers/user.controller");

class UserService {
    validateData(data) {
        const schema = Joi.object({
            login: Joi.string().min(6).alphanum(),
            email: Joi.string().min(6).email(),
            password: Joi.string().min(6),
            role: Joi.string().min(4),
            balance: Joi.number().min(1),
            systemId: Joi.number().min(1),
            id: Joi.number().min(1),
        });
        return schema.validate(data);
    }

    async addUser(data) {
        try {
            const { error } = this.validateData(data);
            if (error) {
                return { error: "" + error };
            }
        } catch (error) {
            return { error: "" + error };
        }
        try {
            await userController.createUser(data);
            return {
                result: {
                    details: [{ message: "Option was successfully created" }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }

    async getUsers() {
        try {
            const users = await userController.findAllUsers();
            return {
                result: {
                    details: [{ message: users }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async getUser(id) {
        try {
            const user = await userController.findUser(id);
            return {
                result: {
                    details: [{ message: user }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async updateUser(data) {
        try {
            await userController.updateUser(data.id, data);
            return {
                result: {
                    details: [{ message: "Option was successfully updated" }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async deleteUser(data) {
        try {
            await userController.deleteUser(data.id);
            return {
                result: {
                    details: [{ message: "Option was successfully deleted" }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }
}

/**
 * Exporting UserService
 */
module.exports = new UserService();
