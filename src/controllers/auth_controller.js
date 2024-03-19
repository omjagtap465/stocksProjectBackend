import { ApiResponse } from "../utils/api_response.js";
import { UserService } from "../services/auth_service.js";
const userService = new UserService();
const registerUserController = async (req, res) => {
  try {
    //console.log("email: ", email);
    const createdUser = await userService.registerUser(req.body);
    console.log(createdUser);
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
  } catch (error) {
    throw error;
  }
};

const loginUserController = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    return res
      .status(201)
      .json(new ApiResponse(200, user, "User loggedIn Successfully"));
  } catch (error) {
    throw error;
  }
};

export { registerUserController, loginUserController };
