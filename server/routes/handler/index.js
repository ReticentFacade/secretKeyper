import { Router } from "express";
import authRouter from "./auth-routes.js";
import credentialsRouter from "./credentials-route.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/credentials", authMiddleware, credentialsRouter);
// apiRouter.use("/credentials", credentialsRouter);

export default apiRouter;
