import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  jobLocation: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get JobLocation by paginated  ==================
export const loadAllJobLocationPaginated = createAsyncThunk(
  "JobLocation/loadAllJobLocationPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job-location?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All JobLocation  =============================
export const loadAllJobLocation = createAsyncThunk("JobLocation/loadAllJobLocation", async () => {
  try {
    const { data } = await axios.get(`job-location?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single JobLocation ============================
export const loadSingleJobLocation = createAsyncThunk(
  "JobLocation/loadSingleJobLocation",
  async (id) => {
    try {
      const { data } = await axios.get(`job-location/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add JobLocation ====================================
export const addJobLocation = createAsyncThunk("JobLocation/addJobLocation", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-location`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New JobLocation Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update JobLocation ================================
export const updateJobLocation = createAsyncThunk(
  "JobLocation/updateJobLocation",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-location/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "JobLocation Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete JobLocation ===============================
export const deleteJobLocation = createAsyncThunk("JobLocation/deleteJobLocation", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-location/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `Job Location ${status === "true" ? "Show":"Hide"} Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});

const jobLocationSlice = createSlice({
  name: "JobLocation",
  initialState,
  reducers: {
    clearJobLocation: (state) => {
      state.jobLocation = null;
    },  
    editJobLocation: (state, action) => {
        state.jobLocation = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    // 1 ================== get JobLocation by paginated ==================
    builder.addCase(loadAllJobLocationPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobLocationPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllJobLocation;
      state.total = action.payload.data.totalJobLocation;
    });

    builder.addCase(loadAllJobLocationPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  JobLocation ==================
    builder.addCase(loadAllJobLocation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllJobLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  JobLocation ==================
    builder.addCase(loadSingleJobLocation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleJobLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.jobLocation = action.payload.data;
    });

    builder.addCase(loadSingleJobLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add JobLocation ==================
    builder.addCase(addJobLocation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJobLocation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJobLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  JobLocation ==================
    builder.addCase(updateJobLocation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJobLocation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJobLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete JobLocation ==================
    builder.addCase(deleteJobLocation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJobLocation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJobLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobLocationSlice.reducer;
export const {clearJobLocation, editJobLocation} = jobLocationSlice.actions;
