import OTP from "../../models/OTP.js";

const checkUsernameInOTP = async (username) => {
  try {
    const user = await OTP.findOne({ username });
    if (!user) {
      console.log(
        `Bro, username ${username} doesn't exist. You gotta register first.`
      );
    } else if (user) {
      console.log(`Username ${username} exists.`);
    }
    // return user ? user.username : null;
    return user; // return the entire user object including encrypted password
  } catch (err) {
    console.error("Error checking username: ", err.message);
    return false;
  }
};

export { checkUsernameInOTP };
