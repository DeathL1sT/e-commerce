import { Request, Response, NextFunction } from "express";

import InvaildInputError from "../errors/InvaildInputError";
import MessageSafeError from "../errors/MessageSafeError";
import NotFoundError from "../errors/NotFoundError";
import UserNotFoundError from "../errors/UserNotFoundError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof MessageSafeError) {
    if (err instanceof InvaildInputError) {
      res.status(400);
    } else if (err instanceof NotFoundError) {
      res.status(404);
    } else {
      res.status(500);
    }

    return res.json({ message: err.message });
  }

  res.status(500).json({ message: "Internal Server Error" });
};
