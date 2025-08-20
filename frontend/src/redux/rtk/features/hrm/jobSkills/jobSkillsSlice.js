import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  jobSkills: null,
  total: null,
  edit:null,
  error: "",
  loading: false,
};

// 1 ================== get JobSkills by paginated  ==================
export const loadAllJobSkillsPaginated = createAsyncThunk(
  "JobSkills/loadAllJobSkillsPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`job-skills?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All JobSkills  =============================
export const loadAllJobSkills = createAsyncThunk("JobSkills/loadAllJobSkills", async () => {
  try {
    const { data } = await axios.get(`job-skills?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single JobSkills ============================
export const loadSingleJobSkills = createAsyncThunk(
  "JobSkills/loadSingleJobSkills",
  async (id) => {
    try {
      const { data } = await axios.get(`job-skills/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add JobSkills ====================================
export const addJobSkills = createAsyncThunk("JobSkills/addJobSkills", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-skills`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New JobSkills Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update JobSkills ================================
export const updateJobSkills = createAsyncThunk(
  "JobSkills/updateJobSkills",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `job-skills/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "JobSkills Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete JobSkills ===============================
export const deleteJobSkills = createAsyncThunk("JobSkills/deleteJobSkills", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `job-skills/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `Job Skills ${status === "true" ? "Show":"Hide"} Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});

const jobSkillsSlice = createSlice({
  name: "JobSkills",
  initialState,
  reducers: {
    clearJobSkills: (state) => {
      state.jobSkills = null;
    },  
    editJobSkills: (state, action) => {
        state.edit = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    // 1 ================== get JobSkills by paginated ==================
    builder.addCase(loadAllJobSkillsPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobSkillsPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllJobSkills;
      state.total = action.payload.data.totalJobSkills;
    });

    builder.addCase(loadAllJobSkillsPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  JobSkills ==================
    builder.addCase(loadAllJobSkills.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllJobSkills.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllJobSkills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  JobSkills ==================
    builder.addCase(loadSingleJobSkills.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleJobSkills.fulfilled, (state, action) => {
      state.loading = false;
      state.jobSkills = action.payload.data;
    });

    builder.addCase(loadSingleJobSkills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add JobSkills ==================
    builder.addCase(addJobSkills.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addJobSkills.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addJobSkills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  JobSkills ==================
    builder.addCase(updateJobSkills.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateJobSkills.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateJobSkills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete JobSkills ==================
    builder.addCase(deleteJobSkills.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteJobSkills.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteJobSkills.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default jobSkillsSlice.reducer;
export const {clearJobSkills, editJobSkills} = jobSkillsSlice.actions;
