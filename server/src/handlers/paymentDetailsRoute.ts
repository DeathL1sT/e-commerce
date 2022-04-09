import express, { Request, Response, NextFunction } from "express";
import PaymentDetails, { PaymentDeatilsSchema } from "../models/PaymentDetails";
import auth from "../middlewares/auth";
import { body, validationResult } from "express-validator";

const store = new PaymentDetails();

const paymentDetailsRoute = (app: express.Application) => {
  app.get("/payment-details", auth, index);
  app.get("/payment-details/:id", auth, show);
  app.post(
    "/payment-details",
    auth,
    [
      body("orderId").notEmpty(),
      body("amount").isNumeric(),
      body("provider").notEmpty(),
      body("status").notEmpty().isString(),
    ],
    create
  );
  app.put(
    "/payment-details/:id",
    auth,
    [
      body("orderId").notEmpty(),
      body("amount").isNumeric(),
      body("provider").notEmpty(),
      body("status").notEmpty().isString(),
    ],
    update
  );
  app.delete("/payment-details/:id", auth, del);
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
    const data: PaymentDeatilsSchema = {
      orderId: req.body.orderId,
      amount: +req.body.amount,
      provider: req.body.provider,
      status: req.body.status,
    };
    const result = await store.create(data);
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
    const id = req.body.id;
    const data: PaymentDeatilsSchema = {
      orderId: req.body.orderId,
      amount: +req.body.amount,
      provider: req.body.provider,
      status: req.body.status,
    };
    const result = await store.update(id, data);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.id;
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default paymentDetailsRoute;
