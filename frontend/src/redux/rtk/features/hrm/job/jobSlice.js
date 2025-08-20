import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  job: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get Job by paginated  ==================
export const loadAllJobPaginated = createAsyncThunk(
  "Job/loadAllJobPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All Job  =============================
export const loadAllJob = createAsyncThunk("Job/loadAllJob", async () => {
  try {
    const { data } = await axios.get(`job?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single Job ============================
export const loadSingleJob = createAsyncThunk(
  "Job/loadSingleJob",
  async (id) => {
    try {
      const { data } = await axios.get(`job/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add Job ====================================
export const addJob = createAsyncThunk("Job/addJob", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New Job Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update Job ================================
export const updateJob = createAsyncThunk(
  "Job/updateJob",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Job Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete Job ===============================
export const deleteJob = createAsyncThunk("Job/deleteJob", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `Job ${status === "true" ? "Show":"Hide"} Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});

const jobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    clearJob: (state) => {
      state.job = null;
    },  
    editJob: (state, action) => {
        state.job = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    // 1 ================== get Job by paginated ==================
    builder.addCase(loadAllJobPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllJob;
      state.total = action.payload.data.totalJob;
    });

    builder.addCase(loadAllJobPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  Job ==================
    builder.addCase(loadAllJob.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJob.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  Job ==================
    builder.addCase(loadSingleJob.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleJob.fulfilled, (state, action) => {
      state.loading = false;
      state.job = action.payload.data;
    });

    builder.addCase(loadSingleJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add Job ==================
    builder.addCase(addJob.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJob.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  Job ==================
    builder.addCase(updateJob.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJob.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete Job ==================
    builder.addCase(deleteJob.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJob.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobSlice.reducer;
export const {clearJob, editJob} = jobSlice.actions;
