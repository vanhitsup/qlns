import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  tota: null,
  designation: null,
  error: "",
  loading: false,
};

// ADD_DESIGNATION
export const addDesignation = createAsyncThunk(
  "designation/addDesignation",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `designation`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Designation added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const updateDesignation = createAsyncThunk(
  "designation/updateDesignation",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `designation/${id}`,
        data: values,
      });

      return successHandler(data, "Designation updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_DESIGNATION
export const deleteDesignation = createAsyncThunk(
  "designation/deleteDesignation",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `designation/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
         data,
        `Designation ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DESIGNATION_DETAILS
export const loadSingleDesignation = createAsyncThunk(
  "designation/loadSingleDesignation",
  async (id) => {
    try {
      const { data } = await axios.get(`designation/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// DESIGNATIONS
export const loadAllDesignation = createAsyncThunk(
  "designation/loadAllDesignation",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`designation?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const designationSlice = createSlice({
  name: "designation",
  initialState,
  reducers: {
    clearDesignation: (state) => {
      state.designation = null;
    },
    clearDesignationList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllDesignation ======

    builder.addCase(loadAllDesignation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllDesignation.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload.data)) {
        state.list = action.payload?.data;
      } else {
        state.list = action.payload?.data.getAllDesignation;
        state.total = action.payload?.data.totalDesignation;
      }
    });

    builder.addCase(loadAllDesignation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addDesignation ======

    builder.addCase(addDesignation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addDesignation.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload?.data);
      state.list = list;
    });

    builder.addCase(addDesignation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleDesignation ======

    builder.addCase(loadSingleDesignation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleDesignation.fulfilled, (state, action) => {
      state.loading = false;
      state.designation = action.payload?.data;
    });

    builder.addCase(loadSingleDesignation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteDesignation ======

    builder.addCase(deleteDesignation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteDesignation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteDesignation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default designationSlice.reducer;
export const { clearDesignation,clearDesignationList } = designationSlice.actions;
