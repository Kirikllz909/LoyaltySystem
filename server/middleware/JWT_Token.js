const { verify, sign } = require("jsonwebtoken");

/**
 *
 * @param {*} user  should contain login and id
 * @returns JWT token
 */
const createToken = (user) => {
    const accessToken = sign(
        { userName: user.login, id: user.id },
        process.env.JWT_SECRET
    );
    return accessToken;
};

/**
 *
 * @param {*} req request for token verification
 * @param {*} res sending response
 * @param {*} next for completing next routes
 * @returns
 */
const validateToken = (req, res, next) => {
    const accessToken = req.header("auth-token");

    if (!accessToken)
        return res.status(400).json({ error: "User not authenticated" });
    try {
        const validateToken = verify(accessToken, process.env.JWT_SECRET);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (e) {
        return res.status(400).json({ error: e });
    }
};

module.exports = { createToken, validateToken };
