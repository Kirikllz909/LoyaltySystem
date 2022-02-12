const Joi = require("joi");
const systemOptionController = require("../controllers/systemOption.controller");
const paramsRatioController = require("../controllers/paramsRatio.controller");

class paramsRatiosService {
    validateData(data) {
        const schema = Joi.object({
            total_discount_ratio: Joi.number().min(0),
            total_points_gain_ratio: Joi.number().min(0),
            total_points_lost_ratio: Joi.number().min(0),
            systemId: Joi.number().min(1).required(),
        });
        return schema.validate(data);
    }

    async addParamsRatio(data) {
        try {
            const { error } = this.validateData(data);
            if (error) {
                return { error: "" + error };
            }
        } catch (error) {
            return { error: "" + error };
        }
        try {
            await paramsRatioController.createParamsRatio(data);
            return {
                result: {
                    details: [
                        { message: "Params ratio was successfully created" },
                    ],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }

    async getParamsRatio(systemId) {
        try {
            const paramsRatio = await paramsRatioController.findAllParamsRatios(
                systemId
            );
            return {
                result: {
                    details: [{ message: paramsRatio }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async updateParamsRatio(params_ratio_id, data) {
        try {
            const { error } = this.validateData(data);
            if (error) {
                return { error: "" + error };
            }
        } catch (error) {
            return { error: "" + error };
        }
        try {
            await paramsRatioController.updateParamsRatio(
                params_ratio_id,
                data
            );
            return {
                result: {
                    details: [
                        { message: "Params ratio was successfully updated" },
                    ],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async deleteParamsRatio(params_ratio_id) {
        try {
            await paramsRatioController.deleteParamsRatio(params_ratio_id);
            return {
                result: {
                    details: [
                        { message: "Params ratio was successfully deleted" },
                    ],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async deleteParamsRatios(systemId) {
        try {
            await paramsRatioController.deleteParamsRatios(systemId);
            return {
                result: {
                    details: [
                        { message: "Params ratios were successfully deleted" },
                    ],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }
}

module.exports = new paramsRatiosService();
