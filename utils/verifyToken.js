import jwt, { decode } from "jsonwebtoken";
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return false;
    else {
      return decoded;
    }
  });
};
export default verifyToken;
