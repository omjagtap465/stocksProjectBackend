import { ApiResponse } from "../utils/api_response.js";
import { UserService } from "../services/auth_service.js";
import { ApiError } from "../utils/api_errors.js";
const userService = new UserService();
const registerUserController = async (req, res) => {
  try {
    //console.log("email: ", email);
    const createdUser = await userService.registerUser(req.body);
    if (createdUser instanceof ApiError) {
      var response = new ApiResponse(
        createdUser.statusCode,
        createdUser.data,
        createdUser.message
      );
    } else {
      response = new ApiResponse(
        201,
        createdUser,
        "User Registered Successfully"
      );
    }
    return res.status(201).json(response);
  } catch (error) {
    throw error;
  }
};

const loginUserController = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    delete user.password;
    delete user.createdAt;
    delete user.updataedAt;
    return res
      .status(201)
      .json(new ApiResponse(200, user, "User loggedIn Successfully"));
  } catch (error) {
    throw error;
  }
};
const getUserController = async (req, res) => {
  try {
    const user = await userService.getUser(req.body);
    delete user.password;
    delete user.createdAt;
    delete user.updataedAt;
    return res
      .status(201)
      .json(new ApiResponse(200, user, "User loggedIn Successfully"));
  } catch (error) {
    throw error;
  }
};

export { registerUserController, loginUserController, getUserController };
