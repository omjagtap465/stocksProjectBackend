import watchlist_name from "../models/watchlist.js";
import { WatchlistRepository } from "../repositories/index.js";
import { ApiError } from "../utils/api_errors.js";
import { ApiResponse } from "../utils/api_response.js";
class WatchlistService {
  constructor() {
    this.WatchlistRepository = new WatchlistRepository();
  }
  async createWatchlist(watchlistData) {
    try {
      const { watchlist_name } = watchlistData;
      const checkWatchlist = await this.WatchlistRepository.getByWatchlistName(
        watchlist_name
      );
      if (checkWatchlist) {
        throw new ApiResponse(400, "Watchlist Already Exists");
      }
      const watchlist = await this.WatchlistRepository.createWatchlist(
        watchlistData
      );
      return watchlist;
    } catch (error) {
      console.log("Something went wrong while Watchlist Creation");
      throw error;
    }
  }
  async getWatchlist(watchlistData) {
    try {
      const { id } = watchlistData;
      console.log(id);
      const getWatchlist = await this.WatchlistRepository.getByWatchlistId(id);
      if (!getWatchlist) {
        throw new ApiResponse(400, "Watchlist Data Not Exists");
      }

      return getWatchlist;
    } catch (error) {
      console.log("Something went wrong while Watchlist Fetching");
      throw error;
    }
  }
  async getWatchlistName(userId) {
    try {
      const getWatchlist = await this.WatchlistRepository.getWatchlistName(
        userId
      );
      if (!getWatchlist) {
        throw new ApiResponse(400, "Watchlist Not Exists");
      }

      return getWatchlist;
    } catch (error) {
      console.log("Something went wrong while Watchlist Fetching");
      throw error;
    }
  }
}
export { WatchlistService };
