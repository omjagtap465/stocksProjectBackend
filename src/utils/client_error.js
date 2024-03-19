import { ApiError } from "./api_errors.js";
class ClientError extends ApiError {
  constructor(name, message, explanation, statusCode) {
    let _message = message;
    let _name = name;
    let _explanation = explanation;
    let _statusCode = statusCode;
    super(_name, _message, _explanation, _statusCode);
  }
}
export { ClientError };
