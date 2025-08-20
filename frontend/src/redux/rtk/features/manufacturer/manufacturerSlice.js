import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "@/utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  error: "",
  info: null,
  loading: false,
  edit: false,
};

// 1 .======================= loadALLManufacturer ==========================
export const loadALLManufacturer = createAsyncThunk(
  "payment/loadALLManufacturer",
  async () => {
    try {
      const { data } = await axios.get(`/manufacturer?query=all`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
// 1 .======================= loadALLManufacturerByPaginated ==========================
export const loadALLManufacturerByPaginated = createAsyncThunk(
  "payment/loadALLManufacturerByPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`/manufacturer?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// 2 .======================= AddManufacturer ==========================
export const addManufacturer = createAsyncThunk(
  "payment/AddManufacturer",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `manufacturer`,
        data: values,
      });

      return successHandler(data, "Manufacturer Added Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// 3 .======================= updateManufacturer ==========================
export const updateManufacturer = createAsyncThunk(
  "payment/updateManufacturer",
  async ({id,values}) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `manufacturer/${id}`,
        data: values,
      });

      return successHandler(data, "Manufacturer Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// 4 .======================= deleteManufacturer ==========================
export const deleteManufacturer = createAsyncThunk(
  "payment/deleteManufacturer",
  async ({id, status}) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `manufacturer/${id}`,
         data: {
                status: status ? status : "false",
        },
      });
      return successHandler(data, `Manufacturer deleted successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    editManufacturer: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearManufacturerList: (state, action) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1 .======================= loadALLManufacturer ==========================
    builder.addCase(loadALLManufacturer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadALLManufacturer.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadALLManufacturer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1 .======================= loadALLManufacturerByPaginated ==========================
    builder.addCase(loadALLManufacturerByPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadALLManufacturerByPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllManufacturers;
      state.total = action.payload?.data?.totalManufacturers;
    });

    builder.addCase(loadALLManufacturerByPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 .======================= AddManufacturer ==========================
    builder.addCase(addManufacturer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addManufacturer.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addManufacturer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 .======================= updateManualPayment ==========================
    builder.addCase(updateManufacturer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateManufacturer.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateManufacturer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 .======================= deleteManualPayment ==========================
    builder.addCase(deleteManufacturer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteManufacturer.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteManufacturer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default manufacturerSlice.reducer;
export const { editManufacturer,clearManufacturerList } = manufacturerSlice.actions;
