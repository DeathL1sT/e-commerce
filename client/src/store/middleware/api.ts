import axios from "axios";
import { Middleware } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as actions from "../api";

export const api: Middleware<{}, RootState> =
  ({ dispatch }) =>
  (next) =>
  async (action: PayloadAction<any>) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;
    next(action);

    try {
      const res = await axios.request({
        baseURL: "http://localhost:3001/",
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(res.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
    } catch (error) {
      dispatch(actions.apiCallFaild((error as any).response.data));
      if (onError)
        dispatch({ type: onError, payload: (error as any).response.data });
    }
  };
