import mongoose from "mongoose";
import crypto from "crypto";

const otpSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    otpSecret: {
        type: String,
        required: true,
    },
    // hashedSecret: {
    //     type: String,
    //     required: true,
    // },
    // salt: {
    //     type: String,
    //     required: true,
    // },
},
{
    collection: "otp",
});

// otpSchema.methods.verifyOTP = function(otp) {
//     const hash = crypto
//         .createHash('sha256', this.salt)
//         .update(otp)
//         .digest('hex');
//     return hash === this.hashedSecret;
// };

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;