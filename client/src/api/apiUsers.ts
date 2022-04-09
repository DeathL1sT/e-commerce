import axios from "axios";

export type User = {
  id?: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  telephone: string;
};

export const registerUser = axios.request({
  method: "post",
  baseURL: "https://localhost:3001",
  url: "/user/register",
  data: {},
});
