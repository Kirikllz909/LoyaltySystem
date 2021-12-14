const db = require("../models");
const Purchase = db.purchases;

/**
 * Create purchase by provided data
 * @param {*} userId id of user
 * @param {*} purchase_amount Purchase cost amount
 * @returns created purchase
 */

exports.createPurchase = (userId, purchase_amount) => {
    return Purchase.create({
        purchase_amount: purchase_amount,
        userId: userId,
    })
        .then((purchase) => {
            console.log(
                ">> Purchase was created: " + JSON.stringify(purchase, null, 4)
            );
            return purchase;
        })
        .catch((err) => {
            console.log(">> Error while creating purchase: " + err);
        });
};

/**
 * Delete purchase by provided id
 * @param {*} purchaseId id of deleting purchase
 */

exports.deletePurchase = (purchaseId) => {
    Purchase.destroy({ where: { purchase_id: purchaseId } })
        .then(() => {
            console.log(">> Purchase was successfully deleted");
        })
        .catch((err) => {
            console.log(">> Error while deleting purchase: " + err);
        });
};

/**
 * Update purchase by provided data
 * @param {*} purchaseId purchaseId for updating purchase
 * @param {*} purchase data for updating purchase
 */

exports.updatePurchase = (purchaseId, purchase) => {
    Purchase.update(
        {
            purchase_amount: purchase.purchase_amount,
            userId: purchase.userId,
        },
        { where: { purchase_id: purchaseId } }
    )
        .then((newPurchase) => {
            console.log(
                ">> Purchase updated successfully: " +
                    JSON.stringify(newPurchase, null, 4)
            );
            return newPurchase;
        })
        .catch((error) => {
            console.log(
                ">> Error while updating purchase: " +
                    JSON.stringify(error, null, 4)
            );
        });
};

/**
 * Find all purchases by provided user id
 * @param {*} userId userId for searching all purchases
 * @returns  Purchase[0..*]
 */

exports.findAllUserPurchases = (userId) => {
    return Purchase.findAll({ where: { userId: userId } })
        .then((purchases) => {
            console.log(
                ">> Found user purchases: \n" +
                    JSON.stringify(purchases, null, 4)
            );
            return purchases;
        })
        .catch((err) => {
            console.log(">> Error while finding all purchases: " + err);
        });
};

/**
 * Find all purchases in table
 * @returns all found purchases
 */

exports.findAllPurchases = () => {
    return Purchase.findAll()
        .then((purchases) => {
            console.log(
                ">> Found all purchases: \n" +
                    JSON.stringify(purchases, null, 4)
            );
            return purchases;
        })
        .catch((err) => {
            console.log(">> Error while finding all purchases: " + err);
        });
};
