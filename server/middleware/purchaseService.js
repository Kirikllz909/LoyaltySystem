const Joi = require("joi");
const purchaseController = require("../controllers/purchase.controller");
const userController = require("../controllers/user.controller");
const loyaltySystemController = require("../controllers/loyaltySystem.controller");
const accamulativeOptionService = require("../middleware/accamulativeOptionsService");
const fixedOptionService = require("../middleware/fixedOptionsService");
const cumulativeOptionService = require("../middleware/cumulativeOptionsService");

class PurchaseService {
    validateData(data) {
        const schema = Joi.object({
            userId: Joi.number().min(1).required(),
            systemId: Joi.number().min(1),
            purchase_amount: Joi.number().min(1),
            points_amount_for_discount: Joi.number().min(0), //Amount of points for discount
        });
        return schema.validate(data);
    }

    async findSystem(userId) {
        const user = await userController.findUser(userId);
        if (!user || user.length === 0) return "none";
        const system = await loyaltySystemController.findSystem(
            user[0].systemId
        );
        if (!system || system.length === 0) return "none";
        return system[0];
    }

    async findSystemType(userId) {
        const system = await this.findSystem(userId);
        return system.type;
    }
    async findSystemId(userId) {
        const system = await this.findSystem(userId);
        return system.system_id;
    }

    async getPurchases(userId) {
        const purchases = await purchaseController.findAllUserPurchases(userId);
        if (!purchases || purchases.length === 0) return "none";
        return purchases;
    }

    async findSystemOptions(userId) {
        const systemId = await this.findSystemId(userId);
        const type = await this.findSystemType(userId);
        if (type === "fixed") {
            const { result } = await fixedOptionService.getOption(systemId);
            return result.details[0].message;
        }
        if (type === "cumulative") {
            const { result } = await cumulativeOptionService.getOptions(
                systemId
            );
            return result.details[0].message;
        }
        if (type === "accamulative") {
            const { result } = await accamulativeOptionService.getOptions(
                systemId
            );
            return result.details[0].message;
        }
        if (type === "none") {
            return null;
        }
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

        const type = await this.findSystemType(data.userId);
        const options = await this.findSystemOptions(data.userId);
        const purchases = await this.getPurchases(data.userId);
        const users = await userController.findUser(data.userId);

        if (options === null) {
            return { error: "Missing options in loyalty system" };
        }
        if (type === "fixed") {
            const discountPercent = options[0].discount_value / 100;
            let discountSum = data.purchase_amount * discountPercent;
            data.discount_amount = discountSum;
            data.total_amount = data.purchase_amount - data.discount_amount;
        }
        if (type === "cumulative") {
            let sum = 0;
            let index = 0;
            for (let i = 0; i < purchases.length; i++) {
                sum += purchases[i].total_amount;
            }
            for (let i = 0; i < options.length; i++) {
                if (sum >= options[i].step_value) index = i;
                else break;
            }
            const discountPercent = options[index].discount_value / 100;
            let discountSum = data.purchase_amount * discountPercent;
            data.discount_amount = discountSum;
            data.total_amount = data.purchase_amount - data.discount_amount;
        }
        if (type === "accamulative") {
            let index = 0;
            let purchaseAmount = data.purchase_amount;
            for (let i = 0; i < options.length; i++) {
                if (purchaseAmount >= options[i].step_value) index = i;
                else break;
            }
            if (data.points_amount_for_discount) {
                let balance = users[0].balance;
                if (balance === 0) return { error: "Balance is 0" };
                let balanceInRubles =
                    Number(balance) / options[index].score_rate_exchange;
                let discountSum =
                    data.points_amount_for_discount /
                    options[index].score_rate_exchange;
                if (discountSum > balanceInRubles)
                    discountSum = balanceInRubles;
                if (discountSum > data.purchase_amount)
                    discountSum = data.purchase_amount;
                data.discount_amount = discountSum;
                data.total_amount = data.purchase_amount - data.discount_amount;
                let points =
                    options[index].purchase_exchange * data.total_amount;
                let newBalance = {};
                newBalance.balance =
                    balance -
                    discountSum * options[index].score_rate_exchange +
                    points;
                await userController.updateUser(data.userId, newBalance);
            } else {
                let balance = Number(users[0].balance);
                data.discount_amount = 0;
                data.total_amount = data.purchase_amount;
                let newBalance = {};
                newBalance.balance = balance + Number(points);
                await userController.updateUser(data.userId, newBalance);
            }
        }

        try {
            await purchaseController.createPurchase(data.userId, data);
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
