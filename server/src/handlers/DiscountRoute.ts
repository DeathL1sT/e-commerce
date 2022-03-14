import { Discount } from "../models/Discount";
import express, { Request, Response, NextFunction } from "express";

const store = new Discount();

const discountRoute = (app: express.Application) => {
  app.get("/discounts", index);
  app.get("/discounts/:id", show);
  app.post("/discounts/create", create);
  app.put("/discounts/:id", update);
  app.delete("/discounts/:id", del);
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
  try {
    d = req.body;
    const result = await store.create(d);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.body.id;
    let dis = {
      title: req.body.title,
      discreption: req.body.discreption,
      percent: parseInt(req.body.percent),
      active: req.body.active,
    };

    const result = await store.update(id, dis);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.body.id;
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default discountRoute;
