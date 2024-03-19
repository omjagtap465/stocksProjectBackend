import { Router } from "express";
const router = Router();
console.log("inside v1");
import {
  AuthController,
  WatchlistController,
} from "../../controllers/index.js";
import { verifyToken } from "../../middlewares/auth_middleware.js";
router.post("/signup", AuthController.registerUserController);
router.post("/login", AuthController.loginUserController);
router.post(
  "/createwatchlist",
  verifyToken,
  WatchlistController.createWatchlistController
);
router.get(
  "/getwatchlistdata",

  WatchlistController.getWatchlistController
);
router.get(
  "/getwatchlistname",
  verifyToken,
  WatchlistController.getWatchlistNameController
);

export { router };
