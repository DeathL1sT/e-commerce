import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import User, { UserSchema } from "../models/Users";
import auth from "../middlewares/auth";
import premission from "../middlewares/premission";
import { Premission } from "../models/Premissions";
import UsernameAlreadyExistsError from "../errors/UsernameAlreadyExistsError";

const store = new User();

const UserRoute = (app: express.Application) => {
  app.get("/user/@me", auth, me);

  app.get("/user", auth, index);
  app.get("/user/:id", auth, show);
  app.post(
    "/user/create",
    [
      body("userName").notEmpty().isEmail(),
      body("password").isEmpty(),
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
  // app.post(
  //   "/login",
  //   [
  //     body("userName").notEmpty().isEmail(),
  //     body("password").notEmpty().isLength({ min: 6 }),
  //   ],
  //   login
  // );
};

const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await store.show(res.locals.userId);
    delete (result as any).password;
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await store.index();
    result.forEach((r) => delete (r as any).password);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const result = await store.show(id);
    delete (result as any).password;
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

// const login = async (req: Request, res: Response, next: NextFunction) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   try {
//     let userName = req.body.userName;
//     let password = req.body.password;
//     const result = await store.login(userName, password);
//     res.json(result);
//   } catch (err) {
//     next(err);
//   }
// };

const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user: UserSchema = {
      userName: req.body.userName,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      premissions: Premission.NORMAL_USER,
    };
    console.log("AAAAAAAAAAAAAAAAAAAa");
    const result = await store.create(user);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default UserRoute;
