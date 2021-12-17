const db = require("../models");
const FixedSystemOption = db.fixed_system_options;

/**
 * Create fixed system option with provided information
 * @param {*} fixedOption data for creating fixed system option. Require discount_value and systemId
 */

exports.createFixedOption = (fixedOption) => {
    return FixedSystemOption.create({
        discount_value: fixedOption.discount_value,
        systemId: fixedOption.systemId,
    })
        .then((newFixedOption) => {
            console.log(
                ">> Fixed option was successfully created: " + JSON,
                stringify(newFixedOption, null, 4)
            );
            return newFixedOption;
        })
        .catch((err) => {
            console.log(">> Failed to create Fixed option");
        });
};

/**
 * Update fixed system option with provided information
 * @param {*} optionId Id for updating fixed option
 * @param {*} fixedOption Data for updating fixed option. Require discount_value
 */

exports.updateFixedOption = (optionId, fixedOption) => {
    FixedSystemOption.update(
        {
            discount_value: fixedOption.discount_value,
        },
        { where: { option_id: optionId } }
    )
        .then((newFixedOption) => {
            console.log(
                ">> Fixed option was successfully updated: " +
                    JSON.stringify(newFixedOption, null, 4)
            );
        })
        .catch((err) => {
            console.log(">> Error while updating option: " + err);
        });
};
