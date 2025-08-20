import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  leave: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get Leave by paginated  ==================
export const loadAllLeavePaginated = createAsyncThunk(
  "Leave/loadAllLeavePaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg,false);
      const { data } = await axios.get(`leave-application?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All Leave  =============================
export const loadAllLeave= createAsyncThunk("Leave/loadAllLeave", async () => {
  try {
    const { data } = await axios.get(`leave-application?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single Leave ============================
export const loadSingleLeave = createAsyncThunk(
  "Leave/loadSingleLeave",
  async (id) => {
    try {
      const { data } = await axios.get(`leave-application/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add Leave ====================================
export const addLeave = createAsyncThunk("Leave/addLeave", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `leave-application`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New Leave Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update Leave ================================
export const updateLeave = createAsyncThunk(
  "leave/updateLeave",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `leave-application/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Leave Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);


const leaveSlice = createSlice({
  name: "leave",
  initialState,
  extraReducers: (builder) => {
    // 1 ================== get Leave by paginated ==================
    builder.addCase(loadAllLeavePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllLeavePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllLeave;
      state.total = action.payload.data.totalLeave;
    });

    builder.addCase(loadAllLeavePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  Leave ==================
    builder.addCase(loadAllLeave.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllLeave.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllLeave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  Leave ==================
    builder.addCase(loadSingleLeave.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleLeave.fulfilled, (state, action) => {
      state.loading = false;
      state.leave = action.payload.data;
    });

    builder.addCase(loadSingleLeave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add Leave ==================
    builder.addCase(addLeave.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addLeave.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addLeave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  Leave ==================
    builder.addCase(updateLeave.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateLeave.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateLeave.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

   
  },
});

export default leaveSlice.reducer;
