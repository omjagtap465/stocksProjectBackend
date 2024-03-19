import { Router } from "express";
import { router } from "./v1/index.js";
console.log("inside v1");
const appRouter = Router();
appRouter.use("/v1", router);
export { appRouter };
