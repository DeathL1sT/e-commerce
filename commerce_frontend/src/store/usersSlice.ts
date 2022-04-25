import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import User from "../models/user";
import { RootState } from "./store";
import { PayloadAction } from "@reduxjs/toolkit";

export const createUser = (user: Omit<User, "id">) =>
  apiCallBegan({
    url: "/user/create",
    method: "POST",
    data: user,
    onSuccess: usercreate.type,
  });

export const getusers = () =>
  apiCallBegan({
    url: "/users",
    method: "GET",
    onSuccess: usersfitch.type,
  });

export const getuser = (userId: number) =>
  apiCallBegan({
    url: "/users/" + userId,
    method: "GET",
    onSuccess: usercreate.type,
  });

export const updateUser = (user: User) =>
  apiCallBegan({
    url: "/users/" + user.id,
    method: "PUT",
    data: user,
    onSuccess: updateuser.type,
    onError: updateUserError.type,
  });

export const deleteUser = (user: User) =>
  apiCallBegan({
    url: "/users/" + user.id,
    method: "DELETE",
    onSuccess: deleteuser.type,
  });

type Slice = {
  all: { [key: number]: User };
  error?: string;
};

const usersSlice = createSlice({
  name: "users",
  initialState: { all: {} } as Slice,
  reducers: {
    usersfitch(state, action: PayloadAction<User[]>) {
      action.payload.forEach((user) => {
        const { id } = user;
        state.all[id] = user;
      });
    },

    usercreate(state, action: PayloadAction<User>) {
      const { id } = action.payload;
      state.all[id] = action.payload;
    },

    updateuser(state, action: PayloadAction<User>) {
      const { id } = action.payload;
      state.all[id] = action.payload;
      state.error = "";
    },

    updateUserError(state, action: PayloadAction<{ message: string }>) {
      state.error = action.payload.message;
    },

    deleteuser(state, action: PayloadAction<User>) {
      const { id } = action.payload;
      delete state.all[id];
    },
  },
});

export const {
  usercreate,
  usersfitch,
  updateuser,
  deleteuser,
  updateUserError,
} = usersSlice.actions;
export default usersSlice.reducer;

export const getUsers = createSelector(
  (state: RootState) => state.users.all,
  (users) => Object.values(users)
);

export const getUserById = (userId: number) => (state: RootState) =>
  state.users.all[userId];
