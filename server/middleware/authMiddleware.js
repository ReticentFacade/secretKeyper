import { jwtVerifyToken } from "../controllers/helpers/jwtToken.js";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // Right now just using jwt-token to verify, instead of session-tokens
    console.log("authMiddleware running...");

    const jwt_secret_key = process.env.JWT_SECRET_KEY;

    const token = req.header("x-auth-token"); // IF TOKEN IS SENT IN THE HEADER
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Bro, log in first :)" });
    }

    const decoded = await jwtVerifyToken(token, jwt_secret_key);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token 😞 " });
    }

    // Attaching the decoded user information to the request object for further use in other middleware or route handlers
    req.user = decoded;

    next();
  } catch (err) {
    console.log("authMiddleware error: ", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export { authMiddleware };
