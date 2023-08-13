import { Router } from "express";
import controller from "../../controllers/index.js";
// import { getUsers } from "../../controllers/testController.js";
// import { test } from "../../controllers/testController.js"

const authRouter = Router();

// authRouter.get("/getUsers", getUsers); // remove later
// authRouter.get("/test", test); // remove later
authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);

// 2FA: 
authRouter.post("/otp/generate", controller.generateOTP);
authRouter.post("/otp/verify", controller.verifyOTP);
authRouter.post("/otp/validate", controller.validateOTP);
authRouter.post("/otp/disable", controller.disableOTP);

export default authRouter;
