import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  jobWorkExperience: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get JobWorkExperience by paginated  ==================
export const loadAllJobWorkExperiencePaginated = createAsyncThunk(
  "JobWorkExperience/loadAllJobWorkExperiencePaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job-workExperience?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All JobWorkExperience  =============================
export const loadAllJobWorkExperience = createAsyncThunk("JobWorkExperience/loadAllJobWorkExperience", async () => {
  try {
    const { data } = await axios.get(`job-workExperience?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single JobWorkExperience ============================
export const loadSingleJobWorkExperience = createAsyncThunk(
  "JobWorkExperience/loadSingleJobWorkExperience",
  async (id) => {
    try {
      const { data } = await axios.get(`job-workExperience/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add JobWorkExperience ====================================
export const addJobWorkExperience = createAsyncThunk("JobWorkExperience/addJobWorkExperience", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-workExperience`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New JobWorkExperience Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update JobWorkExperience ================================
export const updateJobWorkExperience = createAsyncThunk(
  "JobWorkExperience/updateJobWorkExperience",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-workExperience/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "JobWorkExperience Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete JobWorkExperience ===============================
export const deleteJobWorkExperience = createAsyncThunk("JobWorkExperience/deleteJobWorkExperience", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-workExperience/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `JobWorkExperience ${status === "true" ? "Show":"Hide"} Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});

const jobWorkExperienceSlice = createSlice({
  name: "JobWorkExperience",
  initialState,
  reducers: {
    clearJobWorkExperience: (state) => {
      state.jobWorkExperience = null;
    },  
    editJobWorkExperience: (state, action) => {
        state.jobWorkExperience = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    // 1 ================== get JobWorkExperience by paginated ==================
    builder.addCase(loadAllJobWorkExperiencePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobWorkExperiencePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllJobWorkExperience;
      state.total = action.payload.data.totalJobWorkExperience;
    });

    builder.addCase(loadAllJobWorkExperiencePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  JobWorkExperience ==================
    builder.addCase(loadAllJobWorkExperience.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobWorkExperience.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllJobWorkExperience.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  JobWorkExperience ==================
    builder.addCase(loadSingleJobWorkExperience.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleJobWorkExperience.fulfilled, (state, action) => {
      state.loading = false;
      state.jobWorkExperience = action.payload.data;
    });

    builder.addCase(loadSingleJobWorkExperience.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add JobWorkExperience ==================
    builder.addCase(addJobWorkExperience.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJobWorkExperience.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJobWorkExperience.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  JobWorkExperience ==================
    builder.addCase(updateJobWorkExperience.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJobWorkExperience.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJobWorkExperience.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete JobWorkExperience ==================
    builder.addCase(deleteJobWorkExperience.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJobWorkExperience.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJobWorkExperience.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobWorkExperienceSlice.reducer;
export const {clearJobWorkExperience, editJobWorkExperience} = jobWorkExperienceSlice.actions;
