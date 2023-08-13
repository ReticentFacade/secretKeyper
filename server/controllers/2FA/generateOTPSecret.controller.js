import speakeasy from "speakeasy";
import bcrypt from "bcrypt";
import OTP from "../../models/OTP.js";

const generateOTPSecret = async (username) => {
  try {
    console.log("This is the generateOTPSecretController...");
    const secret = speakeasy.generateSecret();
    
    // Hash and salt the secret before storing it in the db
    const hashedSecret = await bcrypt.hash(secret.base32, 10);

    const data = {
        username, 
        otpSecret: hashedSecret,
    }
    console.log("data: ", data);
    const otp = await OTP.create(data);
    if (!otp) {
        console.log("Error saving OTP secret to db");
    } 
    console.log("OTP secret saved to db successfully");

    return secret.base32;
  } catch (err) {
    console.log("Error generating OTP: ", err);
  }
};

export { generateOTPSecret };
