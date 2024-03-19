import { Router } from "express";
const router = Router();
console.log("inside v1");
import {
  AuthController,
  WatchlistController,
} from "../../controllers/index.js";
router.post("/signup", AuthController.registerUserController);
router.post("/login", AuthController.loginUserController);
router.post("/createwatchlist", WatchlistController.createWatchlistController);
router.get("/getwatchlistdata", WatchlistController.getWatchlistController);
router.get("/getwatchlistname", WatchlistController.getWatchlistNameController);
//watchlist
// watchlist_stocks
// user hits url with the user id and
// watchlist name watch list gets created send back the created watchlist [watchlists table]
//  user hits url with watchlist id and stock
export { router };
