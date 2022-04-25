import InvaildInputError from "./InvaildInputError";

export default class UsernameAlreadyExistsError extends InvaildInputError {
  name: string = "UsernameAlreadyExistsError";
  message: string = "Username is already in use";
}
