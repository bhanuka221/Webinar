const jwt = require("jsonwebtoken");
const jtwKey = require("../utils/Constant");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jtwKey.JWT_PRIVATE_KEY);
    req.decodedUserData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication Failed" });
  }
};
