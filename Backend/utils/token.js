import jwt from "jsonwebtoken";

const tokenId = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default tokenId;
