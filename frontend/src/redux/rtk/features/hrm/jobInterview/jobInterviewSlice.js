import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  jobInterview: null,
  edit: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get JobInterview by paginated  ==================
export const loadAllJobInterviewPaginated = createAsyncThunk(
  "JobInterview/loadAllJobInterviewPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job-interview?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All JobInterview  =============================
export const loadAllJobInterview = createAsyncThunk(
  "JobInterview/loadAllJobInterview",
  async () => {
    try {
      const { data } = await axios.get(`job-interview?query=all`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 3 ================== load Single JobInterview ============================
export const loadSingleJobInterview = createAsyncThunk(
  "JobInterview/loadSingleJobInterview",
  async (id) => {
    try {
      const { data } = await axios.get(`job-interview/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add JobInterview ====================================
export const addJobInterview = createAsyncThunk(
  "JobInterview/addJobInterview",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-interview`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "New JobInterview Added Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 5 ================== update JobInterview ================================
export const updateJobInterview = createAsyncThunk(
  "JobInterview/updateJobInterview",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-interview/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "JobInterview Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete JobInterview ===============================
export const deleteJobInterview = createAsyncThunk(
  "JobInterview/deleteJobInterview",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-interview/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `JobInterview ${status === "true" ? "Show" : "Hide"} Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const jobInterviewSlice = createSlice({
  name: "JobInterview",
  initialState,
  reducers: {
    clearJobInterview: (state) => {
      state.jobInterview = null;
    },
    editJobInterview: (state, action) => {
      state.edit = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 1 ================== get JobInterview by paginated ==================
    builder.addCase(loadAllJobInterviewPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobInterviewPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllJobInterview;
      state.total = action.payload.data.totalJobInterview;
    });

    builder.addCase(loadAllJobInterviewPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  JobInterview ==================
    builder.addCase(loadAllJobInterview.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobInterview.fulfilled, (state, action) => {
      state.loading = false;
      state.jobInterview = action.payload.data;
    });

    builder.addCase(loadAllJobInterview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  JobInterview ==================
    builder.addCase(loadSingleJobInterview.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleJobInterview.fulfilled, (state, action) => {
      state.loading = false;
      state.jobInterview = action.payload.data;
    });

    builder.addCase(loadSingleJobInterview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add JobInterview ==================
    builder.addCase(addJobInterview.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJobInterview.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJobInterview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  JobInterview ==================
    builder.addCase(updateJobInterview.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJobInterview.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJobInterview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete JobInterview ==================
    builder.addCase(deleteJobInterview.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJobInterview.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJobInterview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobInterviewSlice.reducer;
export const { clearJobInterview, editJobInterview } =
  jobInterviewSlice.actions;
