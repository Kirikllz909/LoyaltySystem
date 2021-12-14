const db = require("../models");
const User = db.users;

//TODO: after first launch check how update user's loyalty system id

/**
 * Create user with provided information
 * @param {*} user Object which contains login, password, email, role, balance
 * @returns user
 */
exports.createUser = (user) => {
    return User.create({
        login: user.login,
        password: user.password,
        email: user.email,
        role: user.role,
        balance: user.balance,
    })
        .then((user) => {
            console.log(
                ">> User was created: " + JSON.stringify(user, null, 4)
            );
            return user;
        })
        .catch((err) => {
            console.log(">> Error while creating user: " + err);
        });
};
/**
 * Destroy user by provided id
 * @param {*} userId User id for destroy
 */

exports.deleteUser = (userId) => {
    User.destroy({
        where: { id: userId },
    })
        .then(() => {
            console.log(">> User was successfully deleted");
        })
        .catch((err) => {
            console.log(">> Error while deleting user: " + err);
        });
};
/**
 * Update all user info by provided data
 * @param {*} user Should contain all data for updating user
 * @returns updated user
 */

exports.updateUser = (user) => {
    return User.update(
        {
            login: user.login,
            password: user.password,
            email: user.email,
            role: user.role,
            balance: user.balance,
        },
        { where: { id: user.id } }
    )
        .then((user) => {
            console.log(
                ">> User was successfully updated: " +
                    JSON.stringify(user, null, 4)
            );
        })
        .catch((err) => {
            console.log(">> Error while updating user: " + err);
        });
};
/**
 * FInd all users contained in the database
 * @returns all users in database
 */

exports.findAllUsers = () => {
    return User.findAll()
        .then((users) => {
            return users;
        })
        .catch((err) => {
            console.log(">> Error while finding all users: " + err);
        });
};
/**
 * Find user by provided id
 * @param {*} id user id
 * @returns  user
 */

exports.findUser = (userId) => {
    return User.findAll({ where: { id: userId } })
        .then((user) => {
            console.log(">> User: \n" + JSON.stringify(user, null, 4));
            return user;
        })
        .catch((err) => {
            console.log(">> Error while finding user: " + err);
        });
};
