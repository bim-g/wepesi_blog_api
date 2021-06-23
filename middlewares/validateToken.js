require("dotenv/config");
const jwt =require ('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    let token = req.headers["auth-token"];
    if (!token) {
        return res.status(200).json({
            status: 401,
            message: "Access Refuse"
        });
    }
    try {
        let verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = verified;
        return next();
    } catch (e) {
        res.status(200).json({
            status: 400,
            message: "Invalide Token"
        });
    }
};

module.exports=verifyToken;