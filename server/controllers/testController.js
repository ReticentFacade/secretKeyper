// import User from "../models/User.js";

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     console.log("All Users are as follows ----> \n ", users);

//     res.status(200).json(users);
//   } catch (err) {
//     console.error("Error getting users: ", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// // getUsers();

// export { getUsers };

// import { generateOTPSecret } from "./2FA/generateOTPSecret.controller.js";

// const test = async (req, res) => {
//   try {
//     generateOTPSecret("test");
//     res.status(200).json({ message: "Success" });
//   } catch (err) {
//     console.log("Error generating OTP secret: ", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// export { test };

// import { checkUsernameForOTP } from "./helpers/checkUsernameForOTP.js";

// const test = async (req, res) => {
//   try {
//     const user = await checkUsernameForOTP("hailOTP");
//     console.log("This is username: ", user);
//     res.status(200).json({ message: "Success" });
//   } catch (err) {
//     console.log("Error generating OTP secret: ", err);
//     res.status(500).json({ message: err.message });
//   }
// };

import { generateOTP } from "./2FA/generateOTP.controller.js";

const test = async (req, res) => {
  generateOTP("hailOTP");
  res.status(200).json({ message: "Success" });
};

export { test };