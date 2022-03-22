const Joi = require("joi");
const purchaseController = require("../controllers/purchase.controller");
const userController = require("../controllers/user.controller");
const loyaltySystemController = require("../controllers/loyaltySystem.controller");
const systemOptionService = require("./systemOptionsService");
const paramsRatioService = require("./paramsRatioService");

class PurchaseService {
    validateData(data) {
        const schema = Joi.object({
            userId: Joi.number().min(1).required(),
            systemId: Joi.number().min(1),
            option_id: Joi.number().min(0),
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

    async findSystemId(userId) {
        const system = await this.findSystem(userId);
        return system.system_id;
    }

    async getPurchases(userId) {
        const purchases = await purchaseController.findAllUserPurchases(userId);
        if (!purchases || purchases.length === 0) return "none";
        return purchases;
    }

    async findSystemOptions(systemId) {
        const { result } = await systemOptionService.getOptions(systemId);
        return result.details[0].message;
    }

    async findParamsRatio(systemId) {
        const { result } = await paramsRatioService.getParamsRatio(systemId);
        return result.details[0].message;
    }

    async calculateTotalPurchaseSum(purchases) {
        let totalPurchaseSum = 0;
        for (let i = 0; i < purchases.length; i++) {
            const purchase = purchases[i];
            totalPurchaseSum += purchase.total_amount;
        }
        return totalPurchaseSum;
    }

    async calculateFixedDiscount(purchaseAmount, option) {
        if (option.discount_value === null) return 0;
        let fixedDiscount = purchaseAmount * option.discount_value;
        return fixedDiscount;
    }

    async calculatePointsIncome(purchaseAmount, option) {
        if (option.purchase_exchange === null) return 0;
        let pointsIncome = purchaseAmount * option.purchase_exchange;
        return pointsIncome;
    }

    async calculatePointsDiscount(points, option) {
        if (option.score_rate_exchange === null) return 0;
        let pointsDiscount = points / option.score_rate_exchange;
        return pointsDiscount;
    }

    async filterArrByValue(purchaseAmount, options) {
        const arrFilteredByValue = options.filter((option) => {
            if (
                option.min_purchase_value === null ||
                purchaseAmount >= option.min_purchase_value
            )
                if (
                    option.max_purchase_value === null ||
                    purchaseAmount <= option.max_purchase_value
                )
                    return true;
            return false;
        });
        return arrFilteredByValue;
    }

    async filterArrByTotalPurchaseSum(totalPurchaseSum, arrFilteredByValue) {
        const arrFilteredByTotalPurchaseSum = arrFilteredByValue.filter(
            (option) => {
                if (
                    option.min_total_purchase_sum === null ||
                    totalPurchaseSum >= option.min_total_purchase_sum
                )
                    if (
                        option.max_total_purchase_sum === null ||
                        totalPurchaseSum <= option.max_total_purchase_sum
                    )
                        return true;
                return false;
            }
        );
        return arrFilteredByTotalPurchaseSum;
    }

    async filterArrByDate(arrFilteredByTotalPurchaseSum) {
        const arrFilteredByDate = arrFilteredByTotalPurchaseSum.filter(
            (option) => {
                let now = Date.now();
                if (
                    option.min_discount_date === null ||
                    now >= option.min_discount_date
                )
                    if (
                        option.max_discount_date === null ||
                        now <= option.max_discount_date
                    )
                        return true;
                return false;
            }
        );
        return arrFilteredByDate;
    }

    async filterArrByDiscountValue(
        purchaseAmount,
        pointsForDiscount,
        userBalance,
        arrFilteredByDate
    ) {
        const arrFilteredByDiscountValue = arrFilteredByDate.filter(
            (option) => {
                if (option.score_rate_exchange === null) return false;
                let totalDiscount = 0;
                let pointsToCurrency =
                    pointsForDiscount / option.score_rate_exchange;
                if (option.discount_value === null)
                    totalDiscount = pointsToCurrency;
                else
                    totalDiscount =
                        pointsToCurrency +
                        purchaseAmount * option.discount_value;
                if (totalDiscount <= purchaseAmount)
                    if (pointsForDiscount <= userBalance) return true;
                return false;
            }
        );
        return arrFilteredByDiscountValue;
    }

    async filterArrByPaymentLimit(
        purchaseAmount,
        pointsForDiscount,
        arrFilteredByDiscountValue
    ) {
        const arrFilteredByPaymentLimit = arrFilteredByDiscountValue.filter(
            (option) => {
                if (option.score_rate_exchange === null) return false;
                let pointsToCurrency =
                    pointsForDiscount / option.score_rate_exchange;
                let pointsDiscountPercent = pointsToCurrency / purchaseAmount;
                if (
                    option.points_payment_limit_min === null ||
                    pointsDiscountPercent >= option.points_payment_limit_min
                )
                    if (
                        option.points_payment_limit_max === null ||
                        pointsDiscountPercent <= option.points_payment_limit_max
                    )
                        return true;
                return false;
            }
        );
        return arrFilteredByPaymentLimit;
    }

    async findMaxIndex(arr) {
        if (arr.length === 0) return -1;
        let maxElement = arr[0];
        let maxIndex = 0;
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            if (maxElement < element) {
                maxElement = element;
                maxIndex = i;
            }
        }
        return maxIndex;
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

        const systemId = await this.findSystemId(data.userId);
        const options = await this.findSystemOptions(systemId);
        const purchases = await this.getPurchases(data.userId);
        const users = await userController.findUser(data.userId);
        const paramsRatio = await this.findParamsRatio(systemId);

        if (options === null) {
            return { error: "Missing options in loyalty system" };
        }

        const totalPurchaseSum = await this.calculateTotalPurchaseSum(
            purchases
        );
        const userBalance = users[0].balance;
        const purchaseAmount = data.purchase_amount;
        const pointsForDiscount = data.points_amount_for_discount;

        //Filter array by xxx_purchase_value
        const arrFilteredByValue = await this.filterArrByValue(
            purchaseAmount,
            options
        );

        //filter arr by total purchase sum
        const arrFilteredByTotalPurchaseSum =
            await this.filterArrByTotalPurchaseSum(
                totalPurchaseSum,
                arrFilteredByValue
            );

        //Filter array by date
        const arrFilteredByDate = await this.filterArrByDate(
            arrFilteredByTotalPurchaseSum
        );

        let arrFilteredByPaymentLimit = [];
        //Filter array by points_payment_limit
        if (Number(pointsForDiscount) > 0) {
            let arrFilteredByDiscountValue =
                await this.filterArrByDiscountValue(
                    purchaseAmount,
                    Number(pointsForDiscount),
                    userBalance,
                    arrFilteredByDate
                );
            arrFilteredByPaymentLimit = await this.filterArrByPaymentLimit(
                purchaseAmount,
                Number(pointsForDiscount),
                arrFilteredByDiscountValue
            );
        }

        //calculate ratios summary
        let ratioSumArr = [];
        let workingArr = [];
        let selectedOptionId = 0;
        if (Number(pointsForDiscount) > 0)
            workingArr = arrFilteredByPaymentLimit;
        else workingArr = arrFilteredByDate;
        for (let i = 0; i < workingArr.length; i++) {
            const option = workingArr[i];
            let fixedDiscount = await this.calculateFixedDiscount(
                    purchaseAmount,
                    option
                ),
                pointsDiscount = await this.calculatePointsDiscount(
                    pointsForDiscount,
                    option
                ),
                pointsGot = await this.calculatePointsIncome(
                    purchaseAmount - fixedDiscount - pointsDiscount,
                    option
                );
            let ratioSum =
                fixedDiscount * paramsRatio[0].total_discount_ratio +
                pointsGot * paramsRatio[0].total_points_gain_ratio -
                pointsDiscount * paramsRatio[0].total_points_lost_ratio;
            ratioSumArr.push(ratioSum);
        }
        let maxRatioSumIndex = await this.findMaxIndex(ratioSumArr);
        if (maxRatioSumIndex === -1)
            return { error: "Missing options with correct conditions" };
        selectedOptionId = workingArr[maxRatioSumIndex].option_id;
        let fixedDiscount = await this.calculateFixedDiscount(
                purchaseAmount,
                workingArr[maxRatioSumIndex]
            ),
            pointsDiscount = await this.calculatePointsDiscount(
                pointsForDiscount,
                workingArr[maxRatioSumIndex]
            ),
            pointsGot = await this.calculatePointsIncome(
                purchaseAmount - fixedDiscount - pointsDiscount,
                workingArr[maxRatioSumIndex]
            );

        let purchase = {};
        purchase.purchase_amount = data.purchase_amount;
        purchase.discount_amount = fixedDiscount + pointsDiscount;
        purchase.total_amount = purchaseAmount - fixedDiscount - pointsDiscount;
        purchase.userId = data.userId;
        purchase.option_id = selectedOptionId;

        await userController.updateUser(purchase.userId, {
            balance: userBalance + pointsGot - pointsDiscount,
        });
        try {
            await purchaseController.createPurchase(purchase.userId, purchase);
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
