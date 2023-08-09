import { jwtVerifyToken } from "../controllers/helpers/jwtToken.js";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    console.log("authMiddleware running...");

    const token = req.session.authToken; // get token from the session
    console.log("Token from session: ", token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. Bro, log in first :)" });
    }

    const decoded = await jwtVerifyToken(token);
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
