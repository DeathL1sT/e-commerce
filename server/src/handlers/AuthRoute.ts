import express, { Request, NextFunction, Response } from "express";
import User, { UserSchema } from "../models/Users";

const store = new User();
const authRoute = (app: express.Application) => {
  app.post("/auth/login", login);
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;
    const token = await store.login(userName, password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export default authRoute;
