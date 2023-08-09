import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const sessionMiddleware = () => {
  try {
    console.log("sessionMiddleware running...");
    const middleware =  session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: true,
      },
    });
    
    // Method to delete a session -> 
    middleware.deleteSession = (req) => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session: ", err.message);
        } else {
          console.log("Session destroyed successfully");
        }
      });
    };

    // Method to regenerate a session -> 
    middleware.regenerateSession = (req, callback) => {
      req.session.regenerate(callback);
    };

    return middleware;
  } catch (err) {
    console.error("Error in sessionMiddleware: ", err.message);
    throw new Error(err.message);
  }
};

export { sessionMiddleware };
