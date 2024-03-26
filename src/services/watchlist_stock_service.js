import { WatchlistStockRepository } from "../repositories/index.js";
// import { ApiError } from "../utils/api_errors.js";
// import { ApiResponse } from "../utils/api_response.js";
class WatchlistStockService {
  constructor() {
    this.WatchlistStockRepository = new WatchlistStockRepository();
  }
  async addStock(stockData) {
    try {
      const addedStock = await this.WatchlistStockRepository.addStock(
        stockData
      );
      return addedStock;
    } catch (error) {
      console.log("Something went wrong while Adding Stock ");
      throw error;
    }
  }
  async deleteStock(stockId) {
    try {
      const deletedStock = await this.WatchlistStockRepository.deleteStock(
        stockId
      );

      return deletedStock;
    } catch (error) {
      console.log("Something went wrong while deleting Stock Fetching");
      throw error;
    }
  }
  //   async getWatchlistName(userId) {
  //     try {
  //       const getWatchlist = await this.WatchlistRepository.getWatchlistName(
  //         userId
  //       );
  //       if (!getWatchlist) {
  //         throw new ApiResponse(400, "Watchlist Not Exists");
  //       }

  //       return getWatchlist;
  //     } catch (error) {
  //       console.log("Something went wrong while Watchlist Fetching");
  //       throw error;
  //     }
  //   }
}
export { WatchlistStockService };
