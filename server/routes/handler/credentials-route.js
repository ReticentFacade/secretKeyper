import { Router } from "express";
import controller from "../../controllers/index.js";

const credentialsRouter = Router();

credentialsRouter.get("/getCredentials", controller.getCredentials);
credentialsRouter.post("/addCredentials", controller.addCredentials);
credentialsRouter.put("/updateCredentials", controller.updateCredentials);
credentialsRouter.delete("/deleteCredentials", controller.deleteCredentials);

export default credentialsRouter;
