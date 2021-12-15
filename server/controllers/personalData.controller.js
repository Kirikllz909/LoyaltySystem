const db = require("../models");
const personalData = db.personal_datas;

/**
 * Create personal information for user by provided userId and information
 * @param {*} userId id of user
 * @param {*} personalData info to add, should countain name, last_name, phone_number
 * @returns personalInfo
 */

exports.createPersonalData = (userId, personalData) => {
    return personalData
        .create({
            name: personalData.name,
            last_name: personalData.last_name,
            phone_number: personalData.phone_number,
            userId: userId,
        })
        .then((newInfo) => {
            console.log(
                ">> Added new info: " + JSON.stringify(newInfo, null, 4)
            );
            return newInfo;
        })
        .catch((err) => {
            console.log(">> Error while adding new info: " + err);
        });
};

/**
 * Delete user's personal information
 * @param {*} userId Id of user to delete personal information
 */

exports.removePersonalData = (userId) => {
    personalData
        .destroy({ where: { userId: userId } })
        .then(() => {
            console.log(">> PersonalData was successfully removed");
        })
        .catch((err) => {
            console.log(">> Error while removing personal data: " + err);
        });
};

/**
 *Update user's personal data by provided values
 * @param {*} userId id of updating user
 * @param {*} personalData data for updating
 * @returns newPersonal data
 */

exports.updatePersonalData = (userId, personalData) => {
    return personalData
        .update(
            {
                name: personalData.name,
                last_name: personalData.last_name,
                phone_number: personalData.phone_number,
                age: personalData.age,
            },
            { where: { userId: userId } }
        )
        .then((newPersonalData) => {
            console.log(
                ">> PersonalData was successfully updated: " +
                    JSON.stringify(newPersonalData, null, 4)
            );
            return newPersonalData;
        })
        .catch((err) => {
            console.log(">> Error while updating personal data: " + err);
        });
};

/**
 * Find user personal data by provided user id
 * @param {*} userId user id
 * @returns personalData
 */

exports.findUserPersonalData = (userId) => {
    return personalData
        .findAll({ where: { userId: userId } })
        .then((personalData) => {
            console.log(
                ">> User's personal data was found: " +
                    JSON.stringify(personalData, null, 4)
            );
            return personalData;
        })
        .catch((err) => {
            console.log(">> Error while finding user's personal data: " + err);
        });
};

/**
 * Find all personal information for all users contained in the database
 * @returns all users personal data
 */

exports.findAllUsersPersonalData = () => {
    return personalData
        .findAll()
        .then((personalData) => {
            console.log(
                ">>Found users personal data: " +
                    JSON.stringify(personalData, null, 4)
            );
            return personalData;
        })
        .catch((err) => {
            console.log(">> Error while finding users personal data: " + err);
        });
};
