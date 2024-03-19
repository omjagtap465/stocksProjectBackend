import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api_errors.js";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/index.js";
import config from "../config/index.js";
const { JWT } = config;
class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }

  async registerUser(userData) {
    const { email, username, password } = userData;
    if ([email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    const existedUser = await this.UserRepository.getByEmail(email);
    console.log("Service Layer", existedUser);
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }

    const hash = await this.beforeCreate(password);
    userData.password = hash;
    const createdUser = await this.UserRepository.create(userData);
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }
    return createdUser;
  }
  async beforeCreate(password) {
    const hash = bcrypt.hashSync(password, 10);

    return hash;
  }
  async login(userData) {
    try {
      const { email, username, password } = userData;

      if (!(username || email)) {
        throw new ApiError(400, "username or email is required");
      }

      const user = await this.UserRepository.getByEmail(email);

      if (!user) {
        throw new ApiError(404, "User does not exist");
      }

      const passwordMatch = await this.checkPassword(password, user.password);
      console.log("Password Match", passwordMatch);

      // return res.status(200).json(
      //   new ApiResponse(
      //     200,
      //     {
      //       user: loggedInUser,
      //       accessToken,
      //     },
      //     "User logged In Successfully"
      //   )
      // );
      if (!passwordMatch) {
        console.log("Password Doesnt Match");
        throw { error: "Incorrect Password" };
      }
      const newToken = await this.createToken({
        email: user.email,
        id: user.id,
      });
      console.log(newToken);
      return newToken;
    } catch (error) {
      throw error;
    }
  }
  async createToken(user) {
    try {
      console.log(JWT);
      const token = jwt.sign(user, JWT, { expiresIn: "1h" });
      return token;
    } catch (error) {
      console.log("Something went wrong while token Creation");
      throw error;
    }
  }
  async isAuthenticated(token) {
    try {
      const response = await this.verifyToken(token);
      console.log(response);
      if (!response) {
        throw { error: "Wrong token" };
      }
      const user = await this.UserRepository.getById(response.id);
      if (!user) {
        throw { error: "No user found" };
      }
      console.log("User", user);
      return user.id;
    } catch (error) {
      console.log("Something went wrong while token Verification");
      throw error;
    }
  }
  async verifyToken(token) {
    try {
      console.log("Verify-Token", token);
      const tokenVerification = jwt.verify(token, JWT);
      console.log(tokenVerification);
      return tokenVerification;
    } catch (error) {
      throw { error: "Verification Issue" };
    }
  }
  async checkPassword(password, encryptedPassword) {
    try {
      const verified = bcrypt.compareSync(password, encryptedPassword);
      return verified;
    } catch (error) {
      throw new ApiError(500, "Password Verification Incorrect");
    }
  }
}
export { UserService };
