import { apiCallFaild } from "../api";
import { pushToast, dismissToast } from "../toastSlice";

let toastId = 0;

export const toast =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);

    if (action.type === apiCallFaild.type) {
      const toast = {
        id: toastId++,
        type: "error",
        message: action.payload.message,
      };
      dispatch(pushToast(toast));
    }

    if (action.type === pushToast.type) {
      setTimeout(() => dispatch(dismissToast(action.payload)), 3000);
    }
  };
