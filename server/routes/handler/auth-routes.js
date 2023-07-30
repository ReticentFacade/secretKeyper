import { Router } from "express";
import controller from "../../controllers/index.js";
import { getUsers } from "../../controllers/testController.js";

const authRouter = Router();

authRouter.get("/getUsers", getUsers); // remove later
authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);

export default authRouter;
