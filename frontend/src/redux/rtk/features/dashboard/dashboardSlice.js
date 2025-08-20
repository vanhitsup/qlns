import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "@/utils/functions";

const initialState = {
  info: null,
  error: "",
  loading: false,
  hrmInfo: false,
  crmInfo: false,
};

export const loadDashboardData = createAsyncThunk(
  "dashboard/loadDashboardData",
  async (q) => {
    try {
      const query = queryGenerator(q);
      const { data } = await axios.get(`dashboard?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);
export const loadHRMDashboardData = createAsyncThunk(
  "dashboard/loadHRMDashboardData",
  async (q) => {
    try {
      const query = queryGenerator(q, false);
      const { data } = await axios.get(`hrm-dashboard?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);
export const loadCRMDashboardData = createAsyncThunk(
  "dashboard/loadCRMDashboardData",
  async (q) => {
    try {
      const query = queryGenerator(q, false);
      const { data } = await axios.get(`crm-dashboard?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.info = null;
    },
  },

  extraReducers: (builder) => {
    // 1) ====== builders for loadDashboardData ======
    builder.addCase(loadDashboardData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.info = action.payload?.data;
    });
    // 2) ====== builders for loadHRMDashboardData ======
    builder.addCase(loadHRMDashboardData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadHRMDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.hrmInfo = action.payload?.data;
    });
    // 3) ====== builders for loadCRMDashboardData ======
    builder.addCase(loadCRMDashboardData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadCRMDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.crmInfo = action.payload?.data;
    });
  },
});

export default dashboardSlice.reducer;
export const { clearDashboard } = dashboardSlice.actions;
