import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import { api } from "./middleware/api";
import authSlice from "./authSlice";
import categorieSlice from "./categorieSlice";
import productSlice from "./productSlice";
import toastSlice from "./toastSlice";
import { toast } from "./middleware/toast";

const reducer = combineReducers({
  users: usersReducer,
  auth: authSlice,
  categorie: categorieSlice,
  product: productSlice,
  toast: toastSlice,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api, toast],
});

export type RootState = ReturnType<typeof reducer>;
