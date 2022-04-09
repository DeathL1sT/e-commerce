import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<{
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  onSuccess?: string;
  onError?: string;
}>("api/CallBegan");
export const apiCallSuccess = createAction<any>("api/CallSuccess");
export const apiCallFaild = createAction<any>("api/CallFaild");
