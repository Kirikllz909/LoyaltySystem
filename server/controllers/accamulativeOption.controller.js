const db = require("../models");
const AccamulativeSystemOption = db.accamulative_system_options;

/**
 *Create new accamulative system option by provided data
 * @param {*} accamulativeOption Data for creating new option. Should contain step_value, purchase_exchange, score_rate_exchange, points_payment_limit_min, points_payment_limit_max, points_time_limit and systemId
 * @returns newAccumulativeSystemOption
 */

exports.createAccamulativeOption = (accamulativeOption) => {
    return AccamulativeSystemOption.create({
        step_value: accamulativeOption.step_value,
        purchase_exchange: accamulativeOption.purchase_exchange,
        score_rate_exchange: accamulativeOption.score_rate_exchange,
        points_payment_limit_min: accamulativeOption.points_payment_limit_min,
        points_payment_limit_max: accamulativeOption.points_payment_limit_max,
        points_time_limit: accamulativeOption.points_time_limit,
        systemId: accamulativeOption.systemId,
    })
        .then((newAccumulativeSystemOption) => {
            console.log(
                ">> New accamulative system option was successfully created: " +
                    JSON,
                stringify(newAccumulativeSystemOption, null, 4)
            );
            return newAccumulativeSystemOption;
        })
        .catch((err) =>
            console.log(
                ">> Failed to create new accamulative system option: " + err
            )
        );
};

/**
 *Update data of option by provided id
 * @param {*} optionId Id of updating option
 * @param {*} accamulativeOption Data for updating option. Should contain step_value, purchase_exchange, score_rate_exchange, points_payment_limit_min, points_payment_limit_max, points_time_limit and systemId
 */

exports.updateAccamulativeOption = (optionId, accamulativeOption) => {
    AccamulativeSystemOption.update(
        {
            step_value: accamulativeOption.step_value,
            purchase_exchange: accamulativeOption.purchase_exchange,
            score_rate_exchange: accamulativeOption.score_rate_exchange,
            points_payment_limit_min:
                accamulativeOption.points_payment_limit_min,
            points_payment_limit_max:
                accamulativeOption.points_payment_limit_max,
            points_time_limit: accamulativeOption.points_time_limit,
            systemId: accamulativeOption.systemId,
        },
        { where: { option_id: optionId } }
    )
        .then((newAccamulativeOption) => {
            console.log(
                ">> New accamulative system option was successfully created: " +
                    JSON.stringify(newAccamulativeOption, null, 4)
            );
        })
        .catch((err) => {
            console.log(">> Failed to create new accamulative option: " + err);
        });
};

/**
 * Delete option by provided id
 * @param {*} optionId Id of option to delete
 */

exports.deleteAccamulativeOption = (optionId) => {
    AccamulativeSystemOption.destroy(optionId)
        .then(() => {
            console.log(">> Option was successfully deleted");
        })
        .catch((err) => {
            console.log(">> Failed to delete option: " + err);
        });
};

/**
 * Find all options by provided system id
 * @param {*} systemId System id for searching options
 * @returns accamulativeSystemOption[0..*]
 */

exports.findAllAccamulativeOptions = (systemId) => {
    return AccamulativeSystemOption.findAll({ where: { systemId: systemId } })
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
