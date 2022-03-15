import express, { Request, Response, NextFunction } from "express";
import Product, { ProductSchema } from "../models/Products";

const store = new Product();

const productRoute = (app: express.Application) => {
  app.get("/products", index);
  app.get("products/:id", show);
  app.post("products/create", create);
  app.put("products/:id", update);
  app.delete("products/:id", del);
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
