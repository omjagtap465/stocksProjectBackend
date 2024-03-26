import { ApiResponse } from "../utils/api_response.js";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { ApiError } from "../utils/api_errors.js";
const { JWT } = config;
const verifyToken = async (req, res, next) => {
  try {
    console.log(req.headers);
    let bearerHeader = req.headers["authorization"];
    console.log(bearerHeader);
    const bearerToken = bearerHeader.split(" ")[1];
    if (!bearerToken) {
      return res.json(
        new ApiResponse(401, null, "Authorization token is missing", false)
      );
    }
    const tokenVerification = jwt.verify(bearerToken, JWT);
    console.log(tokenVerification, "Error");
    req.body.user_id = tokenVerification.id;
    next();
  } catch (error) {
    throw error;
  }
};
export { verifyToken };
