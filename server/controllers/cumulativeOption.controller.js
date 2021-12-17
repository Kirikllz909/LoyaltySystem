const db = require("../models");
const CumulativeSystemOption = db.cumulative_system_options;

/**
 * Creating cumulative system option by provided data
 * @param {*} cumulativeOption Data for creating option. Should contain step_value, discount_value, counting_period and systemId
 * @returns created cumulative option
 */

exports.createCumulativeOption = (cumulativeOption) => {
    return CumulativeSystemOption.create({
        step_value: cumulativeOption.step_value,
        discount_value: cumulativeOption.discount_value,
        counting_period: cumulativeOption.counting_period,
        systemId: cumulativeOption.systemId,
    })
        .then((newCumulativeOption) => {
            console.log(
                ">> Cumulative option was successfully created: " +
                    JSON.stringify(newCumulativeOption, null, 4)
            );
            return newCumulativeOption;
        })
        .catch((err) => {
            console.log(">> Error while creating cumulative option: " + err);
        });
};

/**
 * Delete option by provided option id
 * @param {*} optionId Id of deleting option
 */

exports.deleteCumulativeOption = (optionId) => {
    CumulativeSystemOption.destroy({ where: { option_id: optionId } })
        .then(() => {
            console.log(">> Delete was successful");
        })
        .catch((err) => {
            console.log(">> Error while deleting cumulative option: " + err);
        });
};

/**
 * Update existing option with provided data
 * @param {*} optionId Id for updating option
 * @param {*} cumulativeOption Data for new option/ Require step_value, discount_value, counting_period and systemId
 */

exports.updateCumulativeOption = (optionId, cumulativeOption) => {
    CumulativeSystemOption.update(
        {
            step_value: cumulativeOption.step_value,
            discount_value: cumulativeOption.discount_value,
            counting_period: cumulativeOption.counting_period,
            systemId: cumulativeOption.systemId,
        },
        { where: { option_id: optionId } }
    )
        .then((newCumulativeOption) => {
            console.log(
                ">> Cumulative option was successfully updated: " +
                    JSON.stringify(newCumulativeOption, null, 4)
            );
        })
        .catch((err) => {
            console.log(">> Failed to update Cumulative option: " + err);
        });
};

/**
 * Find all cumulative options by provided system id
 * @param {*} systemId System id for searching all options
 * @returns cumulativeSystemOption[0..*]
 */

exports.findAllCumulativeOptions = (systemId) => {
    return CumulativeSystemOption.findAll({ where: { systemId: systemId } })
        .then((foundOptions) => {
            console.log(
                ">> Found options:" + JSON.stringify(foundOptions, null, 4)
            );
            return foundOptions;
        })
        .catch((err) => {
            console.log(">> Error while finding options: " + err);
        });
};
