import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

const authenticatetoken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, process.env.secretkey, (err, user) => {
    if (err) {
      return res.status(403).json({ message : "Token Expired . Please Signin again"});
    }
    req.user = user;
    next();
  });
};


export default authenticatetoken;
