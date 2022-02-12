const db = require("../models");
const LoyaltySystem = db.loyalty_systems;

/**
 * Create loyalty system with provided information
 * @param {*} loyaltySystem Data of creating loyalty system. Should contain name, description, type and isDefault
 */

exports.createLoyaltySystem = (loyaltySystem) => {
    return LoyaltySystem.create(loyaltySystem)
        .then((newLoyaltySystem) => {
            console.log(
                ">> Loyalty system was successfully created: " +
                    JSON.stringify(newLoyaltySystem, null, 4)
            );
            return newLoyaltySystem;
        })
        .catch((err) => {
            console.log(">> Error while creating loyalty system: " + err);
        });
};

/**
 * Delete system by provided id
 * @param {*} systemId Id of deleting system
 */

exports.deleteLoyaltySystem = (systemId) => {
    LoyaltySystem.destroy({
        where: { system_id: systemId },
    })
        .then(() => {
            console.log(">> Successfully deleted loyalty system");
        })
        .catch((err) => {
            console.log(">> Error while deleting loyalty system: " + err);
        });
};

/**
 *
 * @param {*} systemId Id of updating loyalty system
 * @param {*} loyaltySystem Data for updating loyalty system. Should contain name, description and type
 */

exports.updateLoyaltySystem = (systemId, loyaltySystem) => {
    LoyaltySystem.update(
        {
            name: loyaltySystem.name,
            description: loyaltySystem.description,
        },
        {
            where: { system_id: systemId },
        }
    )
        .then((newLoyaltySystem) => {
            console.log(
                ">>  loyalty system was successfully updated: " +
                    JSON.stringify(newLoyaltySystem, null, 4)
            );
        })
        .catch((err) => {
            console.log(">> Error while updating loyalty system");
        });
};

/**
 * Find all systems in DB
 * @returns loyaltySystem[0..*]
 */

exports.findAllSystems = () => {
    return LoyaltySystem.findAll()
        .then((allSystems) => {
            console.log(
                ">> All systems was found: \n" +
                    JSON.stringify(allSystems, null, 4)
            );
            return allSystems;
        })
        .catch((err) => {
            console.log(">> Error while finding all systems: " + err);
        });
};

/**
 * Find loyalty system by provided id
 * @param {*} systemId Id of finding system
 * @returns loyaltySystem
 */

exports.findSystem = (systemId) => {
    return LoyaltySystem.findAll({ where: { system_id: systemId } })
        .then((foundSystem) => {
            console.log(
                ">> Found system: " + JSON.stringify(foundSystem, null, 4)
            );
            return foundSystem;
        })
        .catch((err) => {
            console.log(">> Error while finding system: " + err);
        });
};
