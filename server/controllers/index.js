import { register, login } from "./Auth/authController.js";
import { getCredentials, addCredentials, updateCredentials, deleteCredentials } from "./credentialsController.js";
import { generateOTPSecret } from "./2FA/generateOTPSecret.controller.js";
import { generateOTP } from "./2FA/generateOTP.controller.js";
import { verifyOTP } from "./2FA/verifyOTP.controller.js";
import { validateOTP } from "./2FA/validateOTP.controller.js";
import { disableOTP } from "./2FA/disableOTP.controller.js";

const controllers = {
    register,
    login,
    getCredentials,
    addCredentials,
    updateCredentials,
    deleteCredentials,
    generateOTPSecret,
    generateOTP,
    verifyOTP,
    validateOTP,
    disableOTP,
};

export default controllers;