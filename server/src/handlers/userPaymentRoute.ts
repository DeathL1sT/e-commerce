import express, { Request, Response, NextFunction } from "express";
import UserPayment, { UserPaymentSchema } from "../models/UserPayment";
import auth from "../middlewares/auth";
import { body, validationResult } from "express-validator";

const store = new UserPayment();

const userPaymentRoute = (app: express.Application) => {
  app.get("/user-payment", auth, index);
  app.get("/user-payment/:id", auth, show);
  app.post(
    "/user-payment",
    auth,
    [
      body("userId").notEmpty(),
      body("paymentType").notEmpty(),
      body("provider").notEmpty(),
      body("accountNum").notEmpty(),
      body("expire").notEmpty(),
    ],
    create
  );
  app.put(
    "/user-payment/:id",
    auth,
    [
      body("userId").notEmpty(),
      body("paymentType").notEmpty(),
      body("provider").notEmpty(),
      body("accountNum").notEmpty(),
      body("expire").notEmpty(),
    ],
    update
  );
  app.delete("/user-payment/:id", auth, del);
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
  const paymment: UserPaymentSchema = {
    userId: req.body.userId,
    paymentType: req.body.paymentType,
    provider: req.body.provider,
    accountNum: req.body.accountNum,
    expire: req.body.expire,
  };
  try {
    const result = await store.create(paymment);
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
  const paymment: UserPaymentSchema = {
    userId: req.body.userId,
    paymentType: req.body.paymentType,
    provider: req.body.provider,
    accountNum: req.body.accountNum,
    expire: req.body.expire,
  };
  const id = req.body.id;
  try {
    const result = await store.update(id, paymment);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id;
  try {
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default userPaymentRoute;
