const Joi = require("joi");
const purchaseController = require("../controllers/purchase.controller");

class PurchaseService {
    validateData(data) {
        const schema = Joi.object({
            userId: Joi.number().min(1).required(),
            systemId: Joi.number().min(1),
            purchase_amount: Joi.number().min(1),
        });
        return schema.validate(data);
    }

    async addPurchase(data) {
        try {
            const { error } = this.validateData(data);
            if (error) {
                return { error: "" + error };
            }
        } catch (error) {
            return { error: "" + error };
        }

        try {
            await purchaseController.createPurchase(
                data.userId,
                data.purchase_amount
            );
            return {
                result: {
                    details: [{ message: "Purchase was successfully created" }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }

    async deletePurchase(purchase_id) {
        try {
            await purchaseController.deletePurchase(purchase_id);
            return {
                result: {
                    details: [{ message: "Purchase was successfully deleted" }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }
    async updatePurchase(purchase_id, data) {
        try {
            await purchaseController.updatePurchase(purchase_id, data);
            return {
                result: {
                    details: [{ message: "Purchase was successfully updated" }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }

    async getUserPurchases(userId) {
        try {
            const purchases = await purchaseController.findAllUserPurchases(
                userId
            );
            return {
                result: {
                    details: [{ message: purchases }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }

    async getPurchaseHistory() {
        try {
            const purchaseHistory = await purchaseController.findAllPurchases();
            return {
                result: {
                    details: [{ message: purchaseHistory }],
                },
            };
        } catch (error) {
            return { error: "" + error };
        }
    }
}

module.exports = new PurchaseService();
