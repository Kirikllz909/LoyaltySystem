const db = require("../models");
const SystemOption = db.system_options;

exports.createSystemOption = (systemOption) => {
    return SystemOption.create({
        min_purchase_value: systemOption.min_purchase_value,
        max_purchase_value: systemOption.max_purchase_value,
        min_total_purchase_sum: systemOption.min_total_purchase_sum,
        max_total_purchase_sum: systemOption.max_total_purchase_sum,
        discount_value: systemOption.discount_value,
        purchase_exchange: systemOption.purchase_exchange,
        score_rate_exchange: systemOption.score_rate_exchange,
        points_payment_limit_min: systemOption.points_payment_limit_min,
        points_payment_limit_max: systemOption.points_payment_limit_max,
        min_discount_date: systemOption.min_discount_date,
        max_discount_date: systemOption.max_discount_date,
        points_time_limit: systemOption.points_time_limit,
        systemId: systemOption.systemId,
    })
        .then((newSystemOption) => {
            console.log(
                ">> New system option was successfully created: " +
                    JSON.stringify(newSystemOption, null, 4)
            );
            return newSystemOption;
        })
        .catch((err) =>
            console.log(">> Failed to create new system option: " + err)
        );
};

exports.updateSystemOption = (optionId, systemOption) => {
    SystemOption.update(
        {
            min_purchase_value: systemOption.min_purchase_value,
            max_purchase_value: systemOption.max_purchase_value,
            min_total_purchase_sum: systemOption.min_total_purchase_sum,
            max_total_purchase_sum: systemOption.max_total_purchase_sum,
            discount_value: systemOption.discount_value,
            purchase_exchange: systemOption.purchase_exchange,
            score_rate_exchange: systemOption.score_rate_exchange,
            points_payment_limit_min: systemOption.points_payment_limit_min,
            points_payment_limit_max: systemOption.points_payment_limit_max,
            min_discount_date: systemOption.min_discount_date,
            max_discount_date: systemOption.max_discount_date,
            points_time_limit: systemOption.points_time_limit,
            systemId: systemOption.systemId,
        },
        { where: { option_id: optionId } }
    )
        .then((newSystemOption) => {
            console.log(
                ">>System option was successfully updated: " +
                    JSON.stringify(newSystemOption, null, 4)
            );
        })
        .catch((err) => {
            console.log(">> Failed to update system option: " + err);
        });
};

exports.deleteSystemOption = (optionId) => {
    SystemOption.destroy({ where: { option_id: optionId } })
        .then(() => {
            console.log(">> Option was successfully deleted");
        })
        .catch((err) => {
            console.log(">> Failed to delete option: " + err);
        });
};

exports.deleteSystemOptions = (systemId) => {
    SystemOption.destroy({ where: { systemId: systemId } })
        .then(() => {
            console.log(">> Options were successfully deleted");
        })
        .catch((err) => {
            console.log(">> Failed to delete options: " + err);
        });
};

exports.findAllSystemOptions = (systemId) => {
    return SystemOption.findAll({ where: { systemId: systemId } })
        .then((foundOptions) => {
            console.log(
                ">> Found all options: " + JSON.stringify(foundOptions, null, 4)
            );
            return foundOptions;
        })
        .catch((err) => {
            console.log(">> Failed to find all options: " + err);
        });
};
