const db = require("../models");
const SystemOption = db.system_options;
const ParamsRatio = db.params_ratio;

exports.createParamsRatio = (paramsRatio) => {
    return ParamsRatio.create({
        total_discount_ratio: paramsRatio.total_discount_ratio,
        total_points_gain_ratio: paramsRatio.total_points_gain_ratio,
        total_points_lost_ratio: paramsRatio.total_points_lost_ratio,
    })
        .then((newParamsRatio) => {
            console.log(
                ">> New params ratio was successfully created: " +
                    JSON.stringify(newParamsRatio, null, 4)
            );
            return newParamsRatio;
        })
        .catch((err) =>
            console.log(">> Failed to create new params ratio: " + err)
        );
};

exports.updateParamsRatio = (paramsRatioId, paramsRatio) => {
    ParamsRatio.update(
        {
            total_discount_ratio: paramsRatio.total_discount_ratio,
            total_points_gain_ratio: paramsRatio.total_points_gain_ratio,
            total_points_lost_ratio: paramsRatio.total_points_lost_ratio,
        },
        { where: { params_ratio_id: paramsRatioId } }
    )
        .then((newParamsRatio) => {
            console.log(
                ">>Params ratio was successfully updated: " +
                    JSON.stringify(newParamsRatio, null, 4)
            );
        })
        .catch((err) => {
            console.log(">> Failed to update params ratio: " + err);
        });
};

exports.deleteParamsRatio = (paramsRatioId) => {
    ParamsRatio.destroy({ where: { params_ratio_id: paramsRatioId } })
        .then(() => {
            console.log(">> Params ratio was successfully deleted");
        })
        .catch((err) => {
            console.log(">> Failed to delete params ratio: " + err);
        });
};

exports.deleteParamsRatios = (systemId) => {
    ParamsRatio.destroy({ where: { systemId: systemId } })
        .then(() => {
            console.log(
                ">> All params ration in system were successfully deleted"
            );
        })
        .catch((err) => {
            console.log(">> Failed to delete params ratio in system: " + err);
        });
};

exports.findAllParamsRatios = (systemId) => {
    return ParamsRatio.findAll({ where: { systemId: systemId } })
        .then((foundParamsRatios) => {
            console.log(
                ">> Found all params ratios in system: " +
                    JSON.stringify(foundParamsRatios, null, 4)
            );
            return foundParamsRatios;
        })
        .catch((err) => {
            console.log(">> Failed to find all params ratio in system: " + err);
        });
};
