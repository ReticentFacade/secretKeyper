import speakeasy from "speakeasy";
import { checkUsernameInOTP } from "./checkUsernameInOTP.js";

const retrieveOTPSecret = async (username) => {
  try {
    const userData = await checkUsernameInOTP(username);
    if (!userData) {
      console.log("User doesn't exist. Please register first ^.^");
      return {
        status: 404,
        message: "User doesn't exist. Please register first ^.^",
      };
    }
    // Retrieve the OTP secret associated with the user
    const otpSecret = userData.otpSecret;

    // Hash the OTP secret before returning
    // const hashedToken = speakeasy.utils.base32ToHex(otpSecret);
    // return hashedToken;
    return otpSecret;
  } catch (err) {
    console.error("Error retrieving OTP secret: ", err.message);
    return { status: 500, message: err.message };
  }
};

export { retrieveOTPSecret };
