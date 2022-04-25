import NotFoundError from "./NotFoundError";

export default class UserNotFoundError extends NotFoundError {
  message: string = "User Not Found";
  name: string = "UserNotFoundError";
}
