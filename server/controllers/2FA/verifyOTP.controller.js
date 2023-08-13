import speakeasy from "speakeasy";
import { retrieveOTPSecret } from "../helpers/retrieveOTPSecret.js";
import User from "../../models/User.js";

const verifyOTP = async (req, res) => {
  try {
    const { username, token } = req.body;

    // Retrieve the OTP secret associated with the user
    const hashedOTP = await retrieveOTPSecret(username);

    // Verify the OTP
    const verified = speakeasy.totp.verify({
      secret: hashedOTP,
      encoding: "base32",
      token: token,
      window: 20, // tolerance window of 20 time steps (10 minutes)
    });

    if (!verified) {
      console.log("Invalid OTP!");
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    console.log("Is OTP verified?", verified);

    // Update the user's `is_2fa_enabled` field to `true`
    await User.findOneAndUpdate(
      { username },
      { is_2fa_enabled: true },
      { new: true },
    );

    console.log("OTP verified successfully!");
    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (err) {
    console.log("Error verifying OTP: ", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { verifyOTP };
