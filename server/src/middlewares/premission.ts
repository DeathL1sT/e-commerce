import { Request, Response, NextFunction } from "express";
import { Premission, hasPremission } from "../models/Premissions";

export default function premission(prem: Premission) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPrem = res.locals.prem;
    if (userPrem && hasPremission(userPrem, prem)) {
      next();
      return;
    }

    res.status(401).json({ msg: "access not allowed" });
  };
}
