import express, { Request, NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";
import User, { UserSchema } from "../models/Users";

const store = new User();
const authRoute = (app: express.Application) => {
  app.post(
    "/auth/login",
    [
      body("userName").notEmpty().isEmail(),
      body("password").isStrongPassword().isLength({ min: 6 }),
    ],
    login
  );
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let userName = req.body.userName;
    let password = req.body.password;
    const token = await store.login(userName, password);
    res.json(token);
  } catch (err) {
    next(err);
  }
};

export default authRoute;
