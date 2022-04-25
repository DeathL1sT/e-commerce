import axios from "axios";

import * as actions from "../api";

export const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onSuccess, onError } = action.payload;
    const token = localStorage.getItem("token");
    next(action);

    try {
      const res = await axios.request({
        baseURL: "http://localhost:3001/",
        url,
        method,
        data,
        headers: {
          Authorization: token,
        },
      });
      dispatch(actions.apiCallSuccess(res.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
    } catch (error) {
      dispatch(actions.apiCallFaild(error.response.data));
      if (onError) dispatch({ type: onError, payload: error.response.data });
    }
  };
