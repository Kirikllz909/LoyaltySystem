const Joi = require("joi");
const systemOptionController = require("../controllers/systemOption.controller");

class systemOptionsService {
    validateData(data) {
        const schema = Joi.object({
            step_value: Joi.number().min(0),
            min_purchase_value: Joi.number().min(0),
            max_purchase_value: Joi.number().min(0),
            discount_value: Joi.number().min(0),
            purchase_exchange: Joi.number().min(0),
            score_rate_exchange: Joi.number().min(0),
            points_payment_limit_min: Joi.number().min(0),
            points_payment_limit_max: Joi.number().min(0),
            min_discount_date: Joi.date(),
            max_discount_date: Joi.date(),
            points_time_limit: Joi.string().min(2),
            systemId: Joi.number().min(1).required(),
        });
        return schema.validate(data);
    }

    async addOption(data) {
        try {
            const { error } = this.validateData(data);
            if (error) {
                return { error: "" + error };
            }
        } catch (error) {
            return { error: "" + error };
        }
        try {
            await systemOptionController.createSystemOption(data);
            return {
                result: {
                    details: [{ message: "Option was successfully created" }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }

    async getOptions(systemId) {
        try {
            const options = await systemOptionController.findAllSystemOptions(
                systemId
            );
            return {
                result: {
                    details: [{ message: options }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async updateOption(option_id, data) {
        try {
            const { error } = this.validateData(data);
            if (error) {
                return { error: "" + error };
            }
        } catch (error) {
            return { error: "" + error };
        }
        try {
            await systemOptionController.updateSystemOption(option_id, data);
            return {
                result: {
                    details: [{ message: "Option was successfully updated" }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async deleteOption(option_id) {
        try {
            await systemOptionController.deleteSystemOption(option_id);
            return {
                result: {
                    details: [{ message: "Option was successfully deleted" }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async deleteOptions(systemId) {
        try {
            await systemOptionController.deleteSystemOptions(systemId);
            return {
                result: {
                    details: [{ message: "Options were successfully deleted" }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }
}

module.exports = new systemOptionsService();
