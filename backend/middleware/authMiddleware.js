const { verifyToken }  = require("../utils/jwt");

//VERIFY USER TOKEN
exports.verifyUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        //check token exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token is required"
            });
        }
        //remove Bearer
        const token = authHeader.split(" ")[1];

        //vrify token
        const decoded = verifyToken(token);

        //store user data in request
        req.user = decoded;
        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });  
    }
};
