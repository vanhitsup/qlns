import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  weeklyHoliday: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get WeeklyHoliday by paginated  ==================
export const loadAllWeeklyHolidayPaginated = createAsyncThunk(
  "WeeklyHoliday/loadAllWeeklyHolidayPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`weekly-holiday?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All WeeklyHoliday  =============================
export const loadAllWeeklyHoliday= createAsyncThunk("WeeklyHoliday/loadAllWeeklyHoliday", async () => {
  try {
    const { data } = await axios.get(`weekly-holiday?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single WeeklyHoliday ============================
export const loadSingleWeeklyHoliday = createAsyncThunk(
  "WeeklyHoliday/loadSingleWeeklyHoliday",
  async (id) => {
    try {
      const { data } = await axios.get(`weekly-holiday/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add WeeklyHoliday ====================================
export const addWeeklyHoliday = createAsyncThunk("WeeklyHoliday/addWeeklyHoliday", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `weekly-holiday`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New WeeklyHoliday Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update WeeklyHoliday ================================
export const updateWeeklyHoliday = createAsyncThunk(
  "WeeklyHoliday/updateWeeklyHoliday",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `weekly-holiday/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "WeeklyHoliday Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);


// 6 ================== delete Weekly holiday  ===============================
export const deleteWeeklyHoliday = createAsyncThunk("weeklyHoliday/deleteWeeklyHoliday", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `weekly-holiday/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `Weekly Holiday Delete Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});


const weeklyHolidaySlice = createSlice({
  name: "WeeklyHoliday",
  initialState,
  reducers:{
    editWeeklyHoliday: (state, action) => {
        state.weeklyHoliday = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 1 ================== get WeeklyHoliday by paginated ==================
    builder.addCase(loadAllWeeklyHolidayPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllWeeklyHolidayPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllWeeklyHoliday;
      state.total = action.payload.data.totalWeeklyHoliday;
    });

    builder.addCase(loadAllWeeklyHolidayPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  WeeklyHoliday ==================
    builder.addCase(loadAllWeeklyHoliday.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllWeeklyHoliday.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllWeeklyHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  WeeklyHoliday ==================
    builder.addCase(loadSingleWeeklyHoliday.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleWeeklyHoliday.fulfilled, (state, action) => {
      state.loading = false;
      state.WeeklyHoliday = action.payload.data;
    });

    builder.addCase(loadSingleWeeklyHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add WeeklyHoliday ==================
    builder.addCase(addWeeklyHoliday.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addWeeklyHoliday.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addWeeklyHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  WeeklyHoliday ==================
    builder.addCase(updateWeeklyHoliday.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateWeeklyHoliday.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateWeeklyHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

   
  },
});

export default weeklyHolidaySlice.reducer;
export const {editWeeklyHoliday}=weeklyHolidaySlice.actions;
