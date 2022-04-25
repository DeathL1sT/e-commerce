export default class MessageSafeError implements Error {
  name: string = "MessageSafeError";
  message: string = "Internal Server Error";
  stack?: string | undefined;
}
