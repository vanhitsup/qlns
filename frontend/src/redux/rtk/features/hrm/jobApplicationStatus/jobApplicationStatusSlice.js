import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  jobApplicationStatus: null,
  edit: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get JobApplicationStatus by paginated  ==================
export const loadAllJobApplicationStatusPaginated = createAsyncThunk(
  "JobApplicationStatus/loadAllJobApplicationStatusPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job-applicationStatus?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All JobApplicationStatus  =============================
export const loadAllJobApplicationStatus = createAsyncThunk(
  "JobApplicationStatus/loadAllJobApplicationStatus",
  async () => {
    try {
      const { data } = await axios.get(`job-applicationStatus?query=all`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 3 ================== load Single JobApplicationStatus ============================
export const loadSingleJobApplicationStatus = createAsyncThunk(
  "JobApplicationStatus/loadSingleJobApplicationStatus",
  async (id) => {
    try {
      const { data } = await axios.get(`job-applicationStatus/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add JobApplicationStatus ====================================
export const addJobApplicationStatus = createAsyncThunk(
  "JobApplicationStatus/addJobApplicationStatus",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-applicationStatus`,
        data: values,
      });

      return successHandler(
        data,
        "New JobApplicationStatus Added Successfully"
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 5 ================== update JobApplicationStatus ================================
export const updateJobApplicationStatus = createAsyncThunk(
  "JobApplicationStatus/updateJobApplicationStatus",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-applicationStatus/${id}`,
        data: values,
      });

      return successHandler(
        data,
        "Job Application Status Updated Successfully"
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete JobApplicationStatus ===============================
export const deleteJobApplicationStatus = createAsyncThunk(
  "JobApplicationStatus/deleteJobApplicationStatus",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-applicationStatus/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Job Application Status ${
          status === "true" ? "Show" : "Hide"
        } Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const jobApplicationStatusSlice = createSlice({
  name: "JobApplicationStatus",
  initialState,
  reducers: {
    clearJobApplicationStatus: (state) => {
      state.jobApplicationStatus = null;
    },
    editJobApplicationStatus: (state, action) => {
      state.edit = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 1 ================== get JobApplicationStatus by paginated ==================
    builder.addCase(loadAllJobApplicationStatusPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllJobApplicationStatusPaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload.data.getAllJobApplicationStatus;
        state.total = action.payload.data.totalJobApplicationStatus;
      }
    );

    builder.addCase(
      loadAllJobApplicationStatusPaginated.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );

    // 2 ================== get all  JobApplicationStatus ==================
    builder.addCase(loadAllJobApplicationStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobApplicationStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.jobApplicationStatus = action.payload.data;
    });

    builder.addCase(loadAllJobApplicationStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  JobApplicationStatus ==================
    builder.addCase(loadSingleJobApplicationStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadSingleJobApplicationStatus.fulfilled,
      (state, action) => {
        state.loading = false;
        state.jobApplicationStatus = action.payload.data;
      }
    );

    builder.addCase(
      loadSingleJobApplicationStatus.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      }
    );

    // 4 ================== add JobApplicationStatus ==================
    builder.addCase(addJobApplicationStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJobApplicationStatus.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJobApplicationStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  JobApplicationStatus ==================
    builder.addCase(updateJobApplicationStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJobApplicationStatus.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJobApplicationStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete JobApplicationStatus ==================
    builder.addCase(deleteJobApplicationStatus.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJobApplicationStatus.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJobApplicationStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobApplicationStatusSlice.reducer;
export const { clearJobApplicationStatus, editJobApplicationStatus } =
  jobApplicationStatusSlice.actions;
