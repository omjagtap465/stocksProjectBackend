import { StatusCodes } from "http-status-codes";
import { ApiError } from "./api_errors.js";
class ValidationError extends ApiError {
  constructor(error) {
    let name = error.name;
    let explanation = [];

    super(name, "Something went Wrong", explanation, StatusCodes.BAD_REQUEST);
  }
}

export { ValidationError };
