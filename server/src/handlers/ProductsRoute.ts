import express, { Request, Response, NextFunction } from "express";
import Product, { ProductSchema } from "../models/Products";
import auth from "../middlewares/auth";
import premission from "../middlewares/premission";
import { Premission } from "../models/Premissions";

const store = new Product();

const productRoute = (app: express.Application) => {
  app.get("/products", index);
  app.get("products/:id", show);
  app.post(
    "products/create",
    auth,
    premission(Premission.CREATE_PRODUCT),
    create
  );
  app.put("products/:id", auth, premission(Premission.UPDATE_PRODUCT), update);
  app.delete("/products/:id", auth, premission(Premission.DELETE_PRODUCT), del);
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await store.index(req.query.page as any);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.body.id;
    const result = await store.show(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const p: ProductSchema = {
      title: req.body.title,
      discreption: req.body.discreption,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
      categorie_id: req.body.categorie_id,
      inventory_id: req.body.inventory_id,
      discount_id: req.body.discount_id,
    };
    const result = await store.create(p);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    const p: ProductSchema = {
      title: req.body.title,
      discreption: req.body.discreption,
      imgUrl: req.body.imgUrl,
      price: req.body.price,
      categorie_id: req.body.categorie_id,
      inventory_id: req.body.inventory_id,
      discount_id: req.body.discount_id,
    };
    const result = await store.update(id, p);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default productRoute;
