import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import Product from "../models/product";
import { RootState } from "./store";

export const createProduct = (product: Omit<Product, "id">) =>
  apiCallBegan({
    url: "/products/create",
    method: "POST",
    data: product,
    onSuccess: addProduct.type,
  });

export const updateProduct = (product: Product) =>
  apiCallBegan({
    url: "/products/" + product.id,
    method: "PUT",
    data: product,
    onSuccess: addProduct.type,
  });

export const deleteProduct = (id: number) =>
  apiCallBegan({
    url: "/products/" + id,
    method: "DELETE",
    onSuccess: delProduct.type,
  });

export const fetchById = (id: number) =>
  apiCallBegan({
    url: "/products/" + id,
    method: "GET",
    onSuccess: addProduct.type,
  });

export const fetchPage = (page: number = 1) =>
  apiCallBegan({
    url: "/products?page=" + page,
    method: "GET",
    onSuccess: fetched.type,
  });

type Slice = {
  all: { [key: number]: Product };
};

export const productSlice = createSlice({
  name: "product",
  initialState: { all: {} } as Slice,
  reducers: {
    fetched(state, action: PayloadAction<Product[]>) {
      action.payload.forEach((product) => {
        const { id } = product;
        state.all[id] = product;
      });
    },
    addProduct(state, action: PayloadAction<Product>) {
      const { id } = action.payload;
      state.all[id] = action.payload;
    },

    delProduct(state, action: PayloadAction<Product>) {
      const { id } = action.payload;
      delete state.all[id];
    },
  },
});

export const { addProduct, delProduct, fetched } = productSlice.actions;
export default productSlice.reducer;
export const products = createSelector(
  (state: RootState) => state.product.all,
  (products) => Object.values(products)
);
