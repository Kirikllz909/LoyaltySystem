const Joi = require("joi");
const LoyaltySystemController = require("../controllers/loyaltySystem.controller");

//TODO: test all services (all options)

class LoyaltySystemService {
    /**
     * Check id for correctness
     * @param {*} systemId System id
     * @returns error or nothing
     */
    validateId(systemId) {
        const schema = Joi.object({
            systemId: Joi.number().min(1).positive().required(),
        });
        return schema.validate(systemId);
    }

    /**
     * Check data fpr correctness
     * @param {*} data Data for checking. Should contain name, description and type.
     * @returns error or nothing
     */

    validateData(data) {
        const schema = Joi.object({
            name: Joi.string().min(1).required(),
            description: Joi.string().min(1).required(),
            type: Joi.string().min(5).required(),
            is_default: Joi.boolean().required(),
        });
        return schema.validate(data);
    }

    validateType(data) {
        const { type } = data;
        if (
            type !== "fixed" &&
            type !== "cumulative" &&
            type !== "accamulative"
        )
            return { error: "Wrong type" };
        return { error: "" };
    }

    async isLoyaltySystemExist(systemId) {
        const systems = await LoyaltySystemController.findAllSystems();
        if (systems.length === 0) return false;
        const filteredArray = systems.filter(
            (system) => system.system_id === systemId
        );
        if (filteredArray.length === 0) return false;
        return true;
    }

    async isLoyaltySystemNameExist(data) {
        const { name } = data;
        const systems = await LoyaltySystemController.findAllSystems();
        if (!systems) return false;
        if (systems.length === 0) return false;
        const filteredArray = systems.filter((system) => system.name === name);
        if (filteredArray.length === 0) return false;
        return true;
    }

    async getLoyaltySystem(systemId) {
        try {
            const system = await LoyaltySystemController.findSystem(systemId);
            return {
                result: {
                    details: [{ message: system }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async getAllLoyaltySystems() {
        try {
            const systems = await LoyaltySystemController.findAllSystems();
            return {
                result: {
                    details: [{ message: systems }],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }

    async addLoyaltySystem(data) {
        try {
            const { error } = this.validateData(data);
            if (error) {
                return { error: "" + error };
            }
        } catch (error) {
            return { error: "" + error };
        }

        const { error } = this.validateType(data);
        if (error) {
            return { error: "" + error };
        }

        try {
            const isExistName = await this.isLoyaltySystemNameExist(data);
            if (isExistName) {
                return {
                    error: "Loyalty system with this name already exists",
                };
            }
        } catch (error) {
            return { error: "" + error };
        }

        try {
            await LoyaltySystemController.createLoyaltySystem({
                name: data.name,
                description: data.description,
                type: data.type,
                is_default: data.is_default,
            });
            return {
                result: {
                    details: [{ message: "System was successfully created" }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }
    async removeLoyaltySystem(systemId) {
        try {
            await LoyaltySystemController.deleteLoyaltySystem(systemId);
            return {
                result: {
                    details: [
                        { message: "Loyalty system was successfully deleted" },
                    ],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }
    async updateLoyaltySystem(systemId, data) {
        try {
            await LoyaltySystemController.updateLoyaltySystem(systemId, data);
            return {
                result: {
                    details: [
                        { message: "Loyalty system was successfully updated" },
                    ],
                },
            };
        } catch (e) {
            return { error: "" + e };
        }
    }
}

module.exports = new LoyaltySystemService();
