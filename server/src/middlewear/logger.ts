import { Request, Response, NextFunction } from "express";

export default function Logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`${req.method} ${req.url}`);
  next();
}
