import "dotenv/config";
import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({message: "Not authorized, no token"});
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET).userId;
    req.userId = decode;
    next();
  } catch (err) {
    return res.status(401).json({message: "Token is invalid or expired"});
  }
};

export default isAuth;
