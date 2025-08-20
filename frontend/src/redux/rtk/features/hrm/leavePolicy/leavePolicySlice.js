import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  leavePolicy: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get Leave policy by paginated  ==================
export const loadAllLeavePolicyPaginated = createAsyncThunk(
  "LeavePolicy/loadAllLeavePolicyPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`leave-policy?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All Leave Policy =============================
export const loadAllLeavePolicy= createAsyncThunk("LeavePolicy/loadAllLeavePolicy", async () => {
  try {
    const { data } = await axios.get(`leave-policy?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single Leave Policy============================
export const loadSingleLeavePolicy = createAsyncThunk(
  "LeavePolicy/loadSingleLeavePolicy",
  async (id) => {
    try {
      const { data } = await axios.get(`leave-policy/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add Leave Policy====================================
export const addLeavePolicy = createAsyncThunk("LeavePolicy/addLeavePolicy", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `leave-policy`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New Leave Policy Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update Leave ================================
export const updateLeavePolicy = createAsyncThunk(
  "leavePolicy/updateLeavePolicy",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `leave-policy/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Leave Policy Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// 6. =================delete leave policy =================
export const deleteLeavePolicy = createAsyncThunk("award/deleteLeavePolicy", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `leave-policy/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `Leave Policy ${status === "true" ? "Show":"Hide"} Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});


const leavePolicySlice = createSlice({
  name: "leave-policy",
  initialState,
  reducers:{
    clearLeavePolicy:(state)=>{
      state.leavePolicy = null;
    }
  },
  extraReducers: (builder) => {
    // 1 ================== get Leave by paginated ==================
    builder.addCase(loadAllLeavePolicyPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllLeavePolicyPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllLeavePolicy;
      state.total = action.payload.data.totalLeavePolicy;
    });

    builder.addCase(loadAllLeavePolicyPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  Leave ==================
    builder.addCase(loadAllLeavePolicy.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllLeavePolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllLeavePolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  Leave ==================
    builder.addCase(loadSingleLeavePolicy.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleLeavePolicy.fulfilled, (state, action) => {
      state.loading = false;
      state.leavePolicy = action.payload.data;
    });

    builder.addCase(loadSingleLeavePolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add LeavePolicy ==================
    builder.addCase(addLeavePolicy.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addLeavePolicy.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addLeavePolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  Leave ==================
    builder.addCase(updateLeavePolicy.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateLeavePolicy.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateLeavePolicy.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

   
  },
});

export default leavePolicySlice.reducer;
export const {clearLeavePolicy} = leavePolicySlice.actions;
