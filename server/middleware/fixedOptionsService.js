const Joi = require("joi");
const fixedOptionsController = require("../controllers/fixedOption.controller");

class fixedOptionsService {
    validateData(data) {
        const schema = Joi.object({
            discount_value: Joi.number().min(1),
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
            await fixedOptionsController.createFixedOption({
                discount_value: data.discount_value,
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

    async getOption(systemId) {
        try {
            const option = await fixedOptionsController.findFixedOption(
                systemId
            );
            return {
                result: {
                    details: [{ message: option }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async updateOption(option_id, data) {
        try {
            await fixedOptionsController.updateFixedOption(option_id, data);
            return {
                result: {
                    details: [{ message: "Option was successfully updated" }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }
}

module.exports = new fixedOptionsService();
