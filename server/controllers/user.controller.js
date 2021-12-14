const db = require("../models");
const User = db.users;

/**
 * Create user with provided information
 * @param {*} user Object which contains login, password, email, role, balance
 * @returns user
 */
exports.createUser = (systemId, user) => {
    return User.create({
        login: user.login,
        password: user.password,
        email: user.email,
        role: user.role,
        balance: user.balance,
        systemId: systemId,
    })
        .then((newUser) => {
            console.log(
                ">> User was created: " + JSON.stringify(newUser, null, 4)
            );
            return newUser;
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
 *Update user by provided data
 * @param {*} userId which user is being updated
 * @param {*} user Data for update (login, password, email, role, balance)
 * @returns
 */

exports.updateUser = (userId, user) => {
    return User.update(
        {
            login: user.login,
            password: user.password,
            email: user.email,
            role: user.role,
            balance: user.balance,
        },
        { where: { id: userId } }
    )
        .then((newUser) => {
            console.log(
                ">> User was successfully updated: " +
                    JSON.stringify(newUser, null, 4)
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
