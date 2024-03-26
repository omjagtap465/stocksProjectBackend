import { ValidationError } from "../utils/validation_error.js";
import User from "../models/user.js";
class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        console.log("Creating New Validation Error", error.errors);
        let validationError = new ValidationError(error);
        throw validationError;
      }
      console.log("Error in Repository", error);
      return error;
    }
  }

  async getByEmail(email) {
    try {
      const user = await User.findOne({ where: { email: email } });
      // if (!user) {
      //   let error = new ClientError(
      //     "User Credentials",
      //     "Invalid Email",
      //     "Please Check the Email",
      //     StatusCodes.NOT_FOUND
      //   );
      //   throw error;
      // }
      // console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      const user = await User.findByPk(id);
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
export { UserRepository };
