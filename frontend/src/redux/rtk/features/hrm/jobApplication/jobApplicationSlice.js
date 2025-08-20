import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  jobApplication: null,
  jobApplicationStatus: null,
  edit: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get JobApplication by paginated  ==================
export const loadAllJobApplicationPaginated = createAsyncThunk(
  "JobApplication/loadAllJobApplicationPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job-application?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All JobApplication  =============================
export const loadAllJobApplication = createAsyncThunk(
  "JobApplication/loadAllJobApplication",
  async (query) => {
    try {
      const { data } = await axios.get(
        `job-application?query=${query ? query : "all"}`
      );

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 3 ================== load Single JobApplication ============================
export const loadSingleJobApplication = createAsyncThunk(
  "JobApplication/loadSingleJobApplication",
  async (id) => {
    try {
      const { data } = await axios.get(`job-application/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add JobApplication ====================================
export const addJobApplication = createAsyncThunk(
  "JobApplication/addJobApplication",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-application`,
        data: values,
      });

      return successHandler(data, "New JobApplication Added Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 5 ================== update JobApplication ================================
export const updateJobApplication = createAsyncThunk(
  "JobApplication/updateJobApplication",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-application/${id}`,
        data: values,
      });

      return successHandler(data, "JobApplication Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete JobApplication ===============================
export const deleteJobApplication = createAsyncThunk(
  "JobApplication/deleteJobApplication",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-application/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `JobApplication ${status === "true" ? "Show" : "Hide"} Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const jobApplicationSlice = createSlice({
  name: "JobApplication",
  initialState,
  reducers: {
    clearJobApplication: (state) => {
      state.jobApplication = null;
    },
    editJobApplication: (state, action) => {
      state.edit = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 1 ================== get JobApplication by paginated ==================
    builder.addCase(loadAllJobApplicationPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllJobApplicationPaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload.data.getAllJobApplication;
        state.total = action.payload.data.totalJobApplication;
      }
    );

    builder.addCase(
      loadAllJobApplicationPaginated.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );

    // 2 ================== get all  JobApplication ==================
    builder.addCase(loadAllJobApplication.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobApplication.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllJobApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  JobApplication ==================
    builder.addCase(loadSingleJobApplication.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleJobApplication.fulfilled, (state, action) => {
      state.loading = false;
      state.jobApplication = action.payload.data;
    });

    builder.addCase(loadSingleJobApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add JobApplication ==================
    builder.addCase(addJobApplication.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJobApplication.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJobApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  JobApplication ==================
    builder.addCase(updateJobApplication.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJobApplication.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJobApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete JobApplication ==================
    builder.addCase(deleteJobApplication.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJobApplication.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJobApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobApplicationSlice.reducer;
export const { clearJobApplication, editJobApplication } =
  jobApplicationSlice.actions;
