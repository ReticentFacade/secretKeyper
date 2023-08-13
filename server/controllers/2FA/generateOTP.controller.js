import speakeasy from "speakeasy";
import nodemailer from "nodemailer";
import { retrieveOTPSecret } from "../helpers/retrieveOTPSecret.js";

const generateOTP = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Retrieve the OTP secret associated with the user
    const otpSecret = await retrieveOTPSecret(username);
    console.log("Retrieved OTP secret:", otpSecret);

    // Generate a TOTP
    const totp = speakeasy.totp({
      secret: otpSecret,
      encoding: "base32",
      window: 20, // tolerance window of 20 time steps (10 minutes) 
      // window: 1, // Tolerance window (in number of time steps): Means, if the user enters OTP within 1 time step (30 seconds before and after current step/time), it will be accepted
    });
    console.log("totp: ", totp);

    // Send OTP through email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        // REPLACE WITH ENV VARIABLES!!!!!!
        user: "chiya2911@gmail.com",
        pass: "yeacukngihorehmz",
      },
    });
    console.log("transporter: ", transporter);

    const mailOptions = {
      // REPLACE WITH ENV VARIABLES!!!!!!
      from: "chiya2911@gmail.com",
      to: email, // User's registered email address
      subject: "Your OTP for Two-Factor Authentication",
      html: `<p>Your OTP is: ${totp}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (err) {
    console.error("Error generating OTP: ", err.message);
    res.status(500).json({ message: err.message });
  }
};

export { generateOTP };