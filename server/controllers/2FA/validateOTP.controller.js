import speakeasy from "speakeasy";
import { retrieveOTPSecret } from "../helpers/retrieveOTPSecret.js";

const validateOTP = async (req, res) => {
  try {
    const { username, token } = req.body;
    
    // Retrieve the OTP secret associated with the user
    const otpSecret = await retrieveOTPSecret(username);

    // Verify the OTP
    const validated = speakeasy.totp.verify({
      secret: otpSecret,
      encoding: "base32",
      token: token,
      window: 20, // 10 minutes
    });

    if (!validated) {
      console.log("Invalid OTP!");
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    console.log("Is OTP validated?", validated);
    console.log("OTP validated successfully!");
    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (err) {
    console.log("Error validating OTP: ", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { validateOTP };
