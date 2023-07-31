import User from "../models/User.js";

const checkUsername = async (username, next) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      console.log(
        `Bro, username ${username} doesn't exist. You gotta register first.`
      );
    } else if (user) {
      console.log(`Username ${username} exists. Logging you in now...`);
    }
    return user ? user.username : null;
    next();
  } catch (err) {
    console.error("Error checking username: ", err.message);
    return false;
  }
};

export { checkUsername };