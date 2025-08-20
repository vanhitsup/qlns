import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  jobType: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get JobType by paginated  ==================
export const loadAllJobTypePaginated = createAsyncThunk(
  "JobType/loadAllJobTypePaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job-type?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All JobType  =============================
export const loadAllJobType = createAsyncThunk("JobType/loadAllJobType", async () => {
  try {
    const { data } = await axios.get(`job-type?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single JobType ============================
export const loadSingleJobType = createAsyncThunk(
  "JobType/loadSingleJobType",
  async (id) => {
    try {
      const { data } = await axios.get(`job-type/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add JobType ====================================
export const addJobType = createAsyncThunk("JobType/addJobType", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-type`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New JobType Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update JobType ================================
export const updateJobType = createAsyncThunk(
  "JobType/updateJobType",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-type/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "JobType Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete JobType ===============================
export const deleteJobType = createAsyncThunk("JobType/deleteJobType", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-type/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `JobType ${status === "true" ? "Show":"Hide"} Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});

const jobTypeSlice = createSlice({
  name: "JobType",
  initialState,
  reducers: {
    clearJobType: (state) => {
      state.JobType = null;
    },  
    editJobType: (state, action) => {
        state.jobType = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    // 1 ================== get JobType by paginated ==================
    builder.addCase(loadAllJobTypePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobTypePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllJobType;
      state.total = action.payload.data.totalJobType;
    });

    builder.addCase(loadAllJobTypePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  JobType ==================
    builder.addCase(loadAllJobType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobType.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllJobType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  JobType ==================
    builder.addCase(loadSingleJobType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleJobType.fulfilled, (state, action) => {
      state.loading = false;
      state.jobType = action.payload.data;
    });

    builder.addCase(loadSingleJobType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add JobType ==================
    builder.addCase(addJobType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJobType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJobType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  JobType ==================
    builder.addCase(updateJobType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJobType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJobType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete JobType ==================
    builder.addCase(deleteJobType.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJobType.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJobType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobTypeSlice.reducer;
export const {clearJobType, editJobType} = jobTypeSlice.actions;
