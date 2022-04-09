import express, { Request, Response, NextFunction } from "express";
import UserAddress, { UserAddressSchema } from "../models/UserAddress";
import auth from "../middlewares/auth";
import { body, validationResult } from "express-validator";

const store = new UserAddress();

const userAddressRoute = (app: express.Application) => {
  app.get("/user-address", auth, index);
  app.get("/user-address/:id", auth, show);
  app.post(
    "/user-address/create",
    auth,
    [
      body("userId").notEmpty,
      body("addressLine1").notEmpty(),
      body("addressLine2").notEmpty(),
      body("city").notEmpty(),
      body("postalCode").notEmpty(),
      body("country").notEmpty(),
      body("telephone").notEmpty(),
      body("mobile").notEmpty(),
    ],
    create
  );
  app.put(
    "/user-address/update",
    auth,
    [
      body("userId").notEmpty,
      body("addressLine1").notEmpty(),
      body("addressLine2").notEmpty(),
      body("city").notEmpty(),
      body("postalCode").notEmpty(),
      body("country").notEmpty(),
      body("telephone").notEmpty(),
      body("mobile").notEmpty(),
    ],
    update
  );
  app.delete("/user-address/:id", auth, del);
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
    const data: UserAddressSchema = {
      userId: req.body.userId,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
      telephone: req.body.telephone,
      mobile: req.body.mobile,
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
    const data: UserAddressSchema = {
      userId: req.body.userId,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
      telephone: req.body.telephone,
      mobile: req.body.mobile,
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

export default userAddressRoute;
