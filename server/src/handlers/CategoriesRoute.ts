import { Categories } from "../models/Categories";
import express, { Request, NextFunction, Response } from "express";

const store = new Categories();

const categorieRoute = (app: express.Application) => {
  app.post("/categories/create", create);
  app.get("/categories", index);
  app.get("/categories/:id", show);
  app.put("/categories/:id", update);
  app.delete("/categories/:id", del);
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
    const id = req.params.id;
    const result = await store.show(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const title: string = req.body.title;
    const newCategorie = await store.create(title);
    res.json(newCategorie);
  } catch (err) {
    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const categorie = await store.update(id, req.body);
    res.json(categorie);
  } catch (err) {
    next(err);
  }
};

const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await store.delete(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export default categorieRoute;
