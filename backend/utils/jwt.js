const jwt = require ("jsonwebtoken");

require("dotenv").config();

//GENERATE TOKEN
exports.generateToken = (payload) => {

    return jwt.sign(

        payload,

        process.env.JWT_SECRET_KEY,

        {
            expiresIn: "1d"
        }
    );
};

//VERIFY TOKEN
exports.verifyToken = (token) => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
    );
};