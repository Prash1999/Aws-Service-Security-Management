const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "Jai Shree Ram - This app will not work without shree ram blessing");
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};