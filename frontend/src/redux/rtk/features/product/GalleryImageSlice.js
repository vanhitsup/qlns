import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";

const initialState = {
  list: null,
  error: "",
  loading: false,
  total: 0,
};

export const deleteProductGalleryImage = createAsyncThunk(
  "product/deleteImage",
  async ({ values, id }) => {
    try {
      const { data } = await axios({
        method: "patch",
        url: `product/${id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: values,
      });
      return successHandler(data, "Product image deleted successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const addProductGalleryImage = createAsyncThunk(
  "product/addProductGalleryImage",
  async ({ values, id }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product/${id}`,
        data: values,
      });
      return successHandler(data, "Product image added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const GalleryImageSlice = createSlice({
  name: "GalleryImageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default GalleryImageSlice.reducer;
export const { clearProduct, clearProductList } = GalleryImageSlice.actions;
