import Watchlist from "../models/watchlist.js";
import WatchlistStock from "../models/watchlist_stocks.js";
import { ValidationError } from "../utils/validation_error.js";
class WatchlistStockRepository {
  async addStock(data) {
    try {
      const stockData = await WatchlistStock.create(data);

      return stockData;
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
  //   async addStock(watchListName) {
  //     try {
  //       const watchlistData = await Watchlist.findOne({
  //         where: {
  //           watchlist_name: watchListName,
  //         },
  //       });
  //       return watchlistData;
  //     } catch (error) {
  //       if (error.name == "SequelizeValidationError") {
  //         console.log("Creating New Validation Error");
  //         let validationError = new ValidationError(error);
  //         throw validationError;
  //       }
  //       console.log("Error", error);
  //       throw error;
  //     }
  //   }

  //   async getByWatchlistId(watchlistId) {
  //     try {
  //       console.log(watchlistId);
  //       const watchlistStocks = await WatchlistStock.findAll({
  //         // attributes: ["ticker", "watchlist_id"],

  //         where: { watchlist_id: watchlistId },
  //       });

  //       return watchlistStocks;
  //     } catch (error) {
  //       console.error("Error finding watchlist stocks:", error);
  //       throw error;
  //     }
  //   }
  async deleteStock(stockId) {
    try {
      console.log(stockId);
      const stockData = await WatchlistStock.destroy({
        where: { id: stockId },
      });

      console.log("Watchlist Stocks:", stockData);
      return stockData;
    } catch (error) {
      console.error("Error finding watchlist stocks:", error);
      throw error;
    }
  }
}

export { WatchlistStockRepository };
