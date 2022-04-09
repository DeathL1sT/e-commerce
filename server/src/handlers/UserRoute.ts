import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import User, { UserSchema } from "../models/Users";
import auth from "../middlewares/auth";
import premission from "../middlewares/premission";
import { Premission } from "../models/Premissions";

const store = new User();

const UserRoute = (app: express.Application) => {
  app.get("/user", auth, index);
  app.get("/user/:id", auth, show);
  app.post(
    "/user/create",
    [
      body("userName").notEmpty().isEmail(),
      body("password").isStrongPassword().isLength({ min: 6 }),
      body("firstName").isString().notEmpty(),
      body("lastName").isString().notEmpty(),
      body("telephone").notEmpty().isLength({ min: 10 }),
    ],
    auth,
    premission(Premission.CREATE_USER),
    create
  );
  app.put(
    "/user/:id",
    auth,
    premission(Premission.UPDATE_USER),
    [
      body("userName").notEmpty().isEmail(),
      body("password").isStrongPassword().isLength({ min: 6 }),
      body("firstName").isString().notEmpty(),
      body("lastName").isString().notEmpty(),
      body("telephone").notEmpty().isLength({ min: 10 }),
    ],
    update
  );
  app.delete("/user/:id", auth, premission(Premission.DELETE_USER), del);
  app.post(
    "/user/register",
    [
      body("userName").notEmpty().isEmail(),
      body("password").isStrongPassword().isLength({ min: 6 }),
      body("firstName").isString().notEmpty(),
      body("lastName").isString().notEmpty(),
      body("telephone").notEmpty().isLength({ min: 10 }),
    ],
    register
  );
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const result = await store.show(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user: UserSchema = {
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      premissions: req.body.premissions,
    };
    const result = await store.create(user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let id = req.body.id;
    let user: UserSchema = {
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      premissions: req.body.premissions,
    };
    const result = await store.update(id, user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id = req.body.id;
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user: UserSchema = {
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      premissions: Premission.NORMAL_USER,
    };
    const result = await store.create(user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default UserRoute;
