import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { apiCallFaild } from "./api";
import { RootState } from "./store";

interface Toast {
  id: number;
  type: "error" | "success";
  message: string;
}

type Slice = { toasts: Toast[] };

export const toastSlice = createSlice({
  name: "toast",
  initialState: { toasts: [] } as Slice,
  reducers: {
    pushToast(state, action: PayloadAction<Toast>) {
      state.toasts.push(action.payload);
    },
    dismissToast(state, action: PayloadAction<Toast>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { pushToast, dismissToast } = toastSlice.actions;
export default toastSlice.reducer;

export const selectToasts = (state: RootState) => state.toast.toasts;
