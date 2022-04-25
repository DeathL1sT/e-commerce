import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import Logger from "./middlewares/logger";
import categorieRoute from "./handlers/CategoriesRoute";
import discountRoute from "./handlers/DiscountRoute";
import productRoute from "./handlers/ProductsRoute";
import authRoute from "./handlers/AuthRoute";
import UserRoute from "./handlers/UserRoute";
import userPaymentRoute from "./handlers/userPaymentRoute";
import userAddressRoute from "./handlers/UserAddressRoute";
import paymentDetailsRoute from "./handlers/paymentDetailsRoute";
import { errorHandler } from "./middlewares/errorHandler";
dotenv.config();

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(Logger);

app.get("/", async (req: Request, res: Response) => {
  await res.send("hello world");
});

UserRoute(app);
authRoute(app);
categorieRoute(app);
discountRoute(app);
productRoute(app);
userPaymentRoute(app);
userAddressRoute(app);
paymentDetailsRoute(app);

app.use(errorHandler);

export default app;
