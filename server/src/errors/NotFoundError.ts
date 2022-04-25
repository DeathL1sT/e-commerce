import MessageSafeError from "./MessageSafeError";

export default class NotFoundError extends MessageSafeError {
  message = "Not Found";
}
