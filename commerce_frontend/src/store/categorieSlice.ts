import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { PayloadAction } from "@reduxjs/toolkit";
import Categorie from "../models/categorie";
import { RootState } from "./store";

export const AddCategori = (categorie: Pick<Categorie, "title">) =>
  apiCallBegan({
    url: "/categories/create",
    method: "POST",
    data: categorie,
    onSuccess: addCategorie.type,
  });

export const UpdateCategori = (categorie: Categorie) =>
  apiCallBegan({
    url: "/categories/" + categorie.id,
    method: "PUT",
    data: categorie,
    onSuccess: addCategorie.type,
  });

export const deleteCategori = (id: number) =>
  apiCallBegan({
    url: "/categories/" + id,
    method: "DELETE",
    onSuccess: delcategorie.type,
  });

export const fichPage = (page: number = 1) =>
  apiCallBegan({
    url: "/categories?page=" + page,
    method: "GET",
    onSuccess: fetchedPage.type,
  });

export const fichById = (id: number) =>
  apiCallBegan({
    url: "/categories/" + id,
    method: "GET",
    onSuccess: addCategorie.type,
  });

type Slice = { all: { [key: number]: Categorie } };

export const categorieSlice = createSlice({
  name: "categorie",
  initialState: { all: {} } as Slice,
  reducers: {
    addCategorie(state, action: PayloadAction<Categorie>) {
      const { id } = action.payload;
      state.all[id] = action.payload;
    },

    delcategorie(state, action: PayloadAction<Categorie>) {
      const { id } = action.payload;
      state.all[id] = action.payload;
    },

    fetchedPage(state, action: PayloadAction<Categorie[]>) {
      action.payload.forEach((categorie) => {
        const { id } = categorie;
        state.all[id] = categorie;
      });
    },
  },
});

export const { addCategorie, delcategorie, fetchedPage } =
  categorieSlice.actions;
export default categorieSlice.reducer;
//export const  catList = createSelector((state:RootState)=>state.categorie.all)
