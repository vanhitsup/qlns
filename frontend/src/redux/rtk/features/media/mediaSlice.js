import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  media: null,
  error: "",
  loading: false,
  total: 0,
};

// ADD_VAT_TAX
export const addMedia = createAsyncThunk("media/addMedia", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data;",
      },
      url: `media/upload`,
      data: values,
    });
    return successHandler(data, "Media uploaded successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// UPDATE_VAT_TAZ
export const updateMedia = createAsyncThunk(
  "media/UpdateMedia",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `product-vat/${id}`,
        data: values,
      });
      dispatch(loadAllMediaPaginated({ status: true, page: 1, count: 10 }));
      return successHandler(data, "Media Update Success");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_VAT_TAZ
export const deleteMedia = createAsyncThunk(
  "media/DeleteMedia",
  async (values) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `/media`,
        data: { images: values },
      });

      return successHandler(data, `Media delete successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// VAT_TAZ_DETAILS
export const loadSingleMedia = createAsyncThunk(
  "media/loadSingleMedia",
  async (id) => {
    try {
      const { data } = await axios.get(`media/view/${id}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

// Load all VAT_TAX
export const loadAllMedia = createAsyncThunk("media/loadAllMedia", async () => {
  try {
    const { data } = await axios.get(`/media?query=all`);
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});
//Load All VAT_TAX for Paginated
export const loadAllMediaPaginated = createAsyncThunk(
  "media/loadAllMediaPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`media?${query}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    editMedia: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearMedia: (state) => {
      state.brand = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllMedia ======

    builder.addCase(loadAllMedia.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllMedia.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllMedia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllMediaPaginated ======

    builder.addCase(loadAllMediaPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllMediaPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllImage;
      state.total = action.payload?.data?.totalImage;
    });

    builder.addCase(loadAllMediaPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addMedia ======

    builder.addCase(addMedia.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addMedia.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addMedia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 3) ===== builders for update Vat Tax ===========
    builder.addCase(updateMedia.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateMedia.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateMedia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 4) ====== builders for loadSingleMedia ======

    builder.addCase(loadSingleMedia.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleMedia.fulfilled, (state, action) => {
      state.loading = false;
      state.media = action?.payload?.data;
    });

    builder.addCase(loadSingleMedia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for deleteMedia ======

    builder.addCase(deleteMedia.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteMedia.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteMedia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
  },
});

export default mediaSlice.reducer;
export const { clearMedia, editMedia } = mediaSlice.actions;
