import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import Logger from "./middlewear/logger";
import categorieRoute from "./handlers/CategoriesRoute";

dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(Logger);

app.get("/", async (req: Request, res: Response) => {
  await res.send("hello world");
});

categorieRoute(app);

export default app;
