import { WatchlistStockService } from "../services/watchlist_stock_service.js";
import { ApiError } from "../utils/api_errors.js";
import { ApiResponse } from "../utils/api_response.js";
const watchlistStockService = new WatchlistStockService();
const addStockController = async (req, res) => {
  try {
    const stockData = req.body;
    const stock = await watchlistStockService.addStock(stockData);
    console.log(stock);

    return res
      .status(200)
      .json(new ApiResponse(200, stock, "Stock  Created Successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(error);
      throw error;
    } else if (error instanceof ApiResponse) {
      return res
        .status(400)
        .json(
          -new ApiResponse(
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
const deleteStockController = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.body;
    const stock = await watchlistStockService.deleteStock(id);

    return res
      .status(200)
      .json(new ApiResponse(200, stock, "Stock  Deleted Successfully"));
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

export { addStockController, deleteStockController };
