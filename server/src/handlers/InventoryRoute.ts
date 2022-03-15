import Inventory, { InventorySchema } from "../models/Inventory";
import express, { Request, Response, NextFunction } from "express";

const store = new Inventory();

const inventoryRoute = (app: express.Application) => {
  app.get("/inventory", index);
  app.get("/inventory/:id", show);
  app.post("/inventory/create", create);
  app.put("/inventory/:id", update);
  app.delete("/inventory/:id", del);
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
    const i: InventorySchema = { quantity: req.body.quantity };
    const result = await store.create(i);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const i: InventorySchema = { quantity: req.body.quantity };
    const result = await store.update(id, i);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default inventoryRoute;
