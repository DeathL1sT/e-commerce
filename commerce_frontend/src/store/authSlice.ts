import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import User from "../models/user";
import { RootState } from "./store";
export const registerUser = (user: Omit<User, "id">) =>
  apiCallBegan({
    url: "/user/register",
    method: "POST",
    data: user,
    onSuccess: authSlice.actions.userRegistered.type,
  });

export const login = (userName: string, password: string) =>
  apiCallBegan({
    url: "/auth/login",
    method: "POST",
    data: { userName, password },
    onSuccess: authSlice.actions.loggedIn.type,
  });

export const fetchMe = () =>
  apiCallBegan({
    url: "/user/@me",
    method: "GET",
    onSuccess: authSlice.actions.fetchedMe.type,
  });

const state = {
  user: undefined,
  token: localStorage.getItem("token"),
  isAuthintcated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    userRegistered(state, action: PayloadAction<any>) {
      state.user = action.payload;
      // state.token = localStorage.setItem("token", action.payload);
    },

    loggedIn(state, action: PayloadAction<any>) {
      const token = action.payload;
      const user = action.payload;
      state.token = token;
      localStorage.setItem("token", token);
      state.isAuthintcated = true;
    },

    logout(state, action: PayloadAction) {
      localStorage.removeItem("token");
      state.user = undefined;
      state.token = null;
      state.isAuthintcated = false;
    },

    fetchedMe(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const Authintcated = (state: RootState) =>
  state.auth.isAuthintcated === true && state.auth.token !== null;
