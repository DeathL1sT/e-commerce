import NotFoundError from "./NotFoundError";

export default class InvaildUsernameOrPasswordError extends NotFoundError {
  message: string = "Invaild Username or Password";
  name: string = "InvaildUsernameOrPasswordError";
}
