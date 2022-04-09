import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import User from "../models/user";

export const registerUser = (user: Omit<User, "id">) =>
  apiCallBegan({
    url: "/user/register",
    method: "POST",
    data: user,
    onSuccess: userRegistered.type,
  });

export const createUser = (user: Omit<User, "id">) => {
  apiCallBegan({
    url: "/user/create",
    method: "POST",
    data: user,
    onSuccess: usercreate.type,
  });
};

export const getusers = () => {
  apiCallBegan({
    url: "/users",
    method: "GET",
    data: [],
    onSuccess: usersfitch.type,
  });
};

export const getuser = (user: Pick<User, "id">) => {
  apiCallBegan({
    url: "/users/:id",
    method: "GET",
    data: user,
    onSuccess: getUser.type,
  });
};

export const updateUser = (user: Pick<User, "id">) => {
  apiCallBegan({
    url: "/users/:id",
    method: "PUT",
    data: user,
    onSuccess: updateuser.type,
  });
};

export const deleteUser = (user: Pick<User, "id">) => {
  apiCallBegan({
    url: "/users/:id",
    method: "DELETE",
    data: user,
    onSuccess: deleteuser.type,
  });
};

const state: { list: User[] } = { list: [] };

const usersSlice = createSlice({
  name: "users",
  initialState: state,
  reducers: {
    getUser(stat, action: PayloadAction<User>) {
      stat.list.find((user) => user.id === action.payload.id);
    },

    usersfitch(stat, action: PayloadAction<User[]>) {
      action.payload = stat.list;
    },

    userRegistered(state, action: PayloadAction<User>) {
      state.list.push(action.payload);
    },

    usercreate(state, action: PayloadAction<User>) {
      state.list.push(action.payload);
    },

    updateuser(stat, action: PayloadAction<User>) {
      const user = stat.list.find((user) => user.id === action.payload.id);
      [...stat.list, user];
    },

    deleteuser(stat, action: PayloadAction<User>) {
      const user = stat.list.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const {
  userRegistered,
  usercreate,
  usersfitch,
  getUser,
  updateuser,
  deleteuser,
} = usersSlice.actions;
export default usersSlice.reducer;
//export const userSelector = createSelector((state) => state.list);
