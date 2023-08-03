import { jwtVerifyToken } from "../controllers/helpers/jwtToken.js";
import { localStorage } from "../controllers/Auth/authController.js";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const jwt_secret_key = process.env.JWT_SECRET_KEY;

    const token = localStorage.getItem("jwt");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Please log-in first." });
    }

    const decoded = await jwtVerifyToken(token, jwt_secret_key);
    // Attach the decoded user information to the request object for further use in other middleware or route handlers.
    req.user = decoded;

    next();
  } catch (err) {
    console.log("authMiddleware error: ", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;
