import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  attendance: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get Attendance by paginated  ==================
export const loadAllAttendancePaginated = createAsyncThunk(
  "Attendance/loadAllAttendancePaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`attendance?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All Attendance =============================
export const loadAllAttendance = createAsyncThunk(
  "Attendance/loadAllAttendance",
  async () => {
    try {
      const { data } = await axios.get(`attendance`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 3 ================== load Single Attendance ============================
export const loadSingleAttendance = createAsyncThunk(
  "Attendance/loadSingleAttendance",
  async (id) => {
    try {
      const { data } = await axios.get(`attendance/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add Attendance ====================================
export const addAttendance = createAsyncThunk(
  "Attendance/addAttendance",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `attendance?query=manualPunch`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "New Attendance Added Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// 5 ================== get Attendance by userId with paginated ====================================
export const getAllAttendanceByUserIdWithPaginated = createAsyncThunk(
  "Attendance/getAllAttendanceByUserIdWithPaginated",
  async ({id,pageConfig}) => {
    try {
    const query = queryGenerator(pageConfig);
    const { data } = await axios.get(`attendance/${id}/user/${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);


const attendanceSlice = createSlice({
  name: "Attendance",
  initialState,
  extraReducers: (builder) => {
    // 1 ================== get Attendance by paginated ==================
    builder.addCase(loadAllAttendancePaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAttendancePaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list =action.payload.data.getAllAttendance;
      state.total =action.payload.data.totalAttendance;
    });

    builder.addCase(loadAllAttendancePaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  Attendance ==================
    builder.addCase(loadAllAttendance.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.list =action.payload.data;
    });

    builder.addCase(loadAllAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  Attendance ==================
    builder.addCase(loadSingleAttendance.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.attendance = action.payload.data;
    });

    builder.addCase(loadSingleAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add addAttendance ==================
    builder.addCase(addAttendance.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addAttendance.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addAttendance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });


    // 5 ================== get All Attendance By User Id With Paginated ==================
    builder.addCase(getAllAttendanceByUserIdWithPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllAttendanceByUserIdWithPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(getAllAttendanceByUserIdWithPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default attendanceSlice.reducer;
