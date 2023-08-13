import speakeasy from "speakeasy";
import User from "../../models/User.js";

const disableOTP = async (req, res) => {
  try {
    console.log("This is the disableOTPController...");
    const { username } = req.body;

    // Update the User's 2FA status to false:
    await User.findOneAndUpdate(
      { username },
      { is_2fa_enabled: false },
      { new: true }
    );

    console.log(`2FA disabled successfully for ${username}!`);
    res
      .status(200)
      .json({ message: `2FA disabled successfully for ${username}!` });
  } catch (err) {
    console.log("Error disabling OTP: ", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { disableOTP };
