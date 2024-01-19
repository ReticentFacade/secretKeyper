import User from "../../models/User.js";
import { aesEncrypt, aesDecrypt } from "../helpers/encryption.js";
import { jwtGenerateToken, jwtVerifyToken } from "../helpers/jwtToken.js";
import checkPassword from "../helpers/checkPassword.js";
import { checkUsername } from "../../middleware/checkUsername.js";
import { generateOTPSecret } from "../2FA/generateOTPSecret.controller.js";

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check password strength:
    const pwStrength = checkPassword(password, username);

    if (pwStrength === "weak") {
      return res.status(400).json({ message: "Weak password" });
    }

    const data = {
      name,
      username,
      email,
      password: aesEncrypt(password),
    };
    const user = await User.create(data);

    if (user) {
      const otpSecret = await generateOTPSecret(username);
      console.log("This is otpSecret: ", otpSecret);

      // jwtGenerateToken will generate token AND set the token as a (res.)cookie:
      let token = jwtGenerateToken(user._id, res);

      console.log("User saved successfully: \n", user);
      console.log("Token generated 😈 ----> \n", token);
      res.status(201).json({ message: "User saved successfully" });
    }
  } catch (err) {
    console.error("Error creating user: ", err.message);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username exists:
    const user = await checkUsername(username);

    // Decrypt the stored password
    const decryptedPassword = aesDecrypt(user.password);

    // Comparing the decrypted password with the provided password
    if (decryptedPassword === password) {
      // Generate token after authentication:
      const token = jwtGenerateToken(user._id, res);

      console.log("User logged in successfully: ", user);
      console.log("Token generated and saved 😈 ----> \n", token);

      // The next two lines just deal with token-verification after authentication. Use if needed, later.
      // Verify the token:
      const verifyToken = jwtVerifyToken(token);
      console.log("This is verifyToken:----> ", verifyToken);
      if (verifyToken !== null) {
        console.log("Token verified successfully: ", verifyToken);
        console.log("User authenticated successfully :)");
        res.status(200).json({ message: "User logged in successfully", token: token, username: user.username });
        // User is authenticated.
      } else {
        console.log("Oops! Token verification failed");
        // Because of invalid/expired token. HANDLE it.
      }
    } else {
      console.log("Oops! Wrong password");
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    console.log("Error logging in user: ", err.message);
    res.status(500).json({ message: err.message });
  }
};

export { register, login };
