import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// This file deals with:
// 1. Generating a token
// 1.1. Setting the token as a cookie
// 2. Verifying a token

const jwtGenerateToken = (userId, res) => {
  try {
    const token = jwt.sign(
      {
        id: userId,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Set the token as a cookie:
    res.cookie("jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return token;
  } catch (err) {
    console.log("Error generating token: ", err.message);
  }
};

const jwtVerifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    console.log("Decoded token: ", decodedToken);
    return decodedToken.id;
  } catch (err) {
    console.log("Error verifying token: ", err.message);
    return null;
  }
};

export { jwtGenerateToken, jwtVerifyToken };
