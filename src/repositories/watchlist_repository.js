import Watchlist from "../models/watchlist.js";
import WatchlistStock from "../models/watchlist_stocks.js";
import { ValidationError } from "../utils/validation_error.js";
class WatchlistRepository {
  async createWatchlist(data) {
    try {
      const watchlistData = await Watchlist.create(data);

      return watchlistData;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        console.log("Creating New Validation Error");
        let validationError = new ValidationError(error);
        throw validationError;
      }
      console.log("Error", error);
      throw error;
    }
  }
  async getByWatchlistName(watchListName) {
    try {
      const watchlistData = await Watchlist.findOne({
        where: {
          watchlist_name: watchListName,
        },
      });
      return watchlistData;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        console.log("Creating New Validation Error");
        let validationError = new ValidationError(error);
        throw validationError;
      }
      console.log("Error", error);
      throw error;
    }
  }

  async getByWatchlistId(watchlistId) {
    try {
      console.log(watchlistId);
      const watchlistStocks = await WatchlistStock.findAll({
        // attributes: ["ticker", "watchlist_id"],

        where: { watchlist_id: watchlistId },
      });

      console.log("Watchlist Stocks:", watchlistStocks);
      return watchlistStocks;
    } catch (error) {
      console.error("Error finding watchlist stocks:", error);
      throw error;
    }
  }
  async getWatchlistName(userId) {
    try {
      console.log(userId);
      const watchlistName = await Watchlist.findAll({
        where: { user_id: userId },
      });

      console.log("Watchlist Stocks:", watchlistName);
      return watchlistName;
    } catch (error) {
      console.error("Error finding watchlist stocks:", error);
      throw error;
    }
  }
}

export { WatchlistRepository };
