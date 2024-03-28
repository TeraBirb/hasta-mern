const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // skip browser OPTIONS interaction
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1]; // Authorization: "Bearer TOKEN"
        if (!token) {
            return next(new Error("Token problem. No token :L"));
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        // dynamically adding data to reqest object
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        console.log(err);
        return next(new Error("Authentication failed. Token problem."));
    }
};