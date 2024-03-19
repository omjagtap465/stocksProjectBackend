import { WatchlistService } from "../services/watchlist_service.js";
import { ApiError } from "../utils/api_errors.js";
import { ApiResponse } from "../utils/api_response.js";
const watchlistService = new WatchlistService();
const createWatchlistController = async (req, res) => {
  try {
    const watchlistData = req.body;
    const watchlist = await watchlistService.createWatchlist(watchlistData);
    console.log(watchlist);

    return res
      .status(200)
      .json(new ApiResponse(200, watchlist, "Watchlist  Created Successfully"));
  } catch (error) {
    // Handle errors
    if (error instanceof ApiError) {
      // If the error is an instance of ApiError, rethrow it
      console.log(error);
      throw error;
    } else if (error instanceof ApiResponse) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            error.statusCode,
            error.data,
            error.message,
            error.success
          )
        );
    } else {
      throw new ApiError(500, "Internal Server Error", false);
    }
  }
};
const getWatchlistController = async (req, res) => {
  try {
    const watchlistData = req.body;
    const watchlist = await watchlistService.getWatchlist(watchlistData);

    return res
      .status(200)
      .json(new ApiResponse(200, watchlist, "Watchlist  Created Successfully"));
  } catch (error) {
    // Handle errors
    console.log(error);
    if (error instanceof ApiError) {
      throw error;
    } else if (
      error.statusCode === 400 &&
      error.data === "Watchlist Fetching Issues"
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Watchlist Fetching Issues", false));
    } else {
      throw new ApiError(500, "Internal Server Error", false);
    }
  }
};
const getWatchlistNameController = async (req, res) => {
  try {
    const { userid } = req.body;
    const watchlist = await watchlistService.getWatchlistName(userid);

    return res
      .status(200)
      .json(new ApiResponse(200, watchlist, "Watchlist  Created Successfully"));
  } catch (error) {
    // Handle errors
    if (error instanceof ApiError) {
      // If the error is an instance of ApiError, rethrow it
      throw error;
    } else if (
      error.statusCode === 400 &&
      error.data === "Watchlist Fetching Issues"
    ) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Watchlist Fetching Issues", false));
    } else {
      throw new ApiError(500, "Internal Server Error", false);
    }
  }
};

export {
  createWatchlistController,
  getWatchlistController,
  getWatchlistNameController,
};
