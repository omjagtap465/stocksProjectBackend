import { Router } from "express";
const router = Router();
console.log("inside v1");
import {
  AuthController,
  WatchlistController,
  WatchlistStockController,
} from "../../controllers/index.js";
import { verifyToken } from "../../middlewares/auth_middleware.js";
router.post("/signup", AuthController.registerUserController);
router.post("/login", AuthController.loginUserController);
router.get("/getuser", verifyToken, AuthController.getUserController);
router.post(
  "/createwatchlist",
  verifyToken,
  WatchlistController.createWatchlistController
);
router.post(
  "/getwatchlistdata",

  WatchlistController.getWatchlistController
);
router.get(
  "/getwatchlistname",
  verifyToken,
  WatchlistController.getWatchlistNameController
);
router.post("/addstock", WatchlistStockController.addStockController);
router.delete(
  "/deletestock",
  verifyToken,
  WatchlistStockController.deleteStockController
);

export { router };
