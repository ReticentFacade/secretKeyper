import { register, login } from "./Auth/authController.js";
import { getCredentials, addCredentials, updateCredentials, deleteCredentials } from "./credentialsController.js";

const controllers = {
    register,
    login,
    getCredentials,
    addCredentials,
    updateCredentials,
    deleteCredentials,
};

export default controllers;