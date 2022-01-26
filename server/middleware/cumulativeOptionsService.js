const Joi = require("joi");
const cumulativeOptionController = require("../controllers/cumulativeOption.controller");

class cumulativeOptionsService {
    validateData(data) {
        const schema = Joi.object({
            step_value: Joi.number().min(1),
            discount_value: Joi.number().min(1),
            counting_period: Joi.string().min(1),
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
            await cumulativeOptionController.createCumulativeOption(data);
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
                await cumulativeOptionController.findAllCumulativeOptions(
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
            await cumulativeOptionController.updateCumulativeOption(
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
            await cumulativeOptionController.deleteCumulativeOption(option_id);
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
            await cumulativeOptionController.deleteCumulativeOptions(systemId);
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

module.exports = new cumulativeOptionsService();
