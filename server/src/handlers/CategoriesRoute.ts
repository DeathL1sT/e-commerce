import { Categories, CategorieSchema } from "../models/Categories";
import express, { Request, NextFunction, Response } from "express";
import auth from "../middlewares/auth";

const store = new Categories();
const categorieRoute = (app: express.Application) => {
  app.post("/categories/create", auth, create);
  app.get("/categories", index);
  app.get("/categories/:id", auth, show);
  app.put("/categories/:id", auth, update);
  app.delete("/categories/:id", auth, del);
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
    const id = parseInt(req.body.id);
    const result = await store.show(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategorie = await store.create(req.body);
    res.json(newCategorie);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.body.id;
    const categorie = await store.update(id, req.body);
    res.json(categorie);
  } catch (err) {
    next(err);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.body.id);
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default categorieRoute;
