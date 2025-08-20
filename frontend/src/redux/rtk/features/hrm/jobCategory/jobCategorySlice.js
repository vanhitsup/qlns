import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  jobCategory: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get JobCategory by paginated  ==================
export const loadAllJobCategoryPaginated = createAsyncThunk(
  "JobCategory/loadAllJobCategoryPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job-category?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All JobCategory  =============================
export const loadAllJobCategory = createAsyncThunk("JobCategory/loadAllJobCategory", async () => {
  try {
    const { data } = await axios.get(`job-category?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single JobCategory ============================
export const loadSingleJobCategory = createAsyncThunk(
  "JobCategory/loadSingleJobCategory",
  async (id) => {
    try {
      const { data } = await axios.get(`job-category/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add JobCategory ====================================
export const addJobCategory = createAsyncThunk("JobCategory/addJobCategory", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-category`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New JobCategory Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update JobCategory ================================
export const updateJobCategory = createAsyncThunk(
  "JobCategory/updateJobCategory",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-category/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "JobCategory Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete JobCategory ===============================
export const deleteJobCategory = createAsyncThunk("JobCategory/deleteJobCategory", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-category/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `JobCategory ${status === "true" ? "Show":"Hide"} Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});

const jobCategorySlice = createSlice({
  name: "JobCategory",
  initialState,
  reducers: {
    clearJobCategory: (state) => {
      state.jobCategory = null;
    },  
    editJobCategory: (state, action) => {
        state.jobCategory = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    // 1 ================== get JobCategory by paginated ==================
    builder.addCase(loadAllJobCategoryPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobCategoryPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllJobCategory;
      state.total = action.payload.data.totalJobCategory;
    });

    builder.addCase(loadAllJobCategoryPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  JobCategory ==================
    builder.addCase(loadAllJobCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllJobCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  JobCategory ==================
    builder.addCase(loadSingleJobCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleJobCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.jobCategory = action.payload.data;
    });

    builder.addCase(loadSingleJobCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add JobCategory ==================
    builder.addCase(addJobCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJobCategory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJobCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  JobCategory ==================
    builder.addCase(updateJobCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJobCategory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJobCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete JobCategory ==================
    builder.addCase(deleteJobCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJobCategory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJobCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobCategorySlice.reducer;
export const {clearJobCategory, editJobCategory} = jobCategorySlice.actions;
