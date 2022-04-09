import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import { api } from "./middleware/api";

const reducer = combineReducers({
  users: usersReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api],
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
