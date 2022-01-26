const Joi = require("joi");
const accamulativeOptionController = require("../controllers/accamulativeOption.controller");

class accamulativeOptionsService {
    validateData(data) {
        const schema = Joi.object({
            step_value: Joi.number().min(1),
            purchase_exchange: Joi.number().min(1),
            score_rate_exchange: Joi.number().min(1),
            points_payment_limit_min: Joi.number().min(1),
            points_payment_limit_max: Joi.number().min(1),
            points_time_limit: Joi.string().min(2),
            systemId: Joi.number().min(1),
            option_id: Joi.number().min(1),
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
            await accamulativeOptionController.createAccamulativeOption({
                step_value: data.step_value,
                purchase_exchange: data.purchase_exchange,
                score_rate_exchange: data.score_rate_exchange,
                points_payment_limit_min: data.points_payment_limit_min,
                points_payment_limit_max: data.points_payment_limit_max,
                points_time_limit: data.points_time_limit,
                systemId: data.systemId,
            });
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
            const options =
                await accamulativeOptionController.findAllAccamulativeOptions(
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
            await accamulativeOptionController.updateAccamulativeOption(
                option_id,
                data
            );
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
            await accamulativeOptionController.deleteAccamulativeOption(
                option_id
            );
            return {
                result: {
                    details: [{ message: "Option was successfully deleted" }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async deleteOptions(data) {
        try {
            await accamulativeOptionController.deleteAccamulativeOptions(
                data.systemId
            );
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

module.exports = new accamulativeOptionsService();
