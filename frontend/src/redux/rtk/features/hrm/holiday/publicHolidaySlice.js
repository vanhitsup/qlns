import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  publicHoliday: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get PublicHoliday by paginated  ==================
export const loadAllPublicHolidayPaginated = createAsyncThunk(
  "PublicHoliday/loadAllPublicHolidayPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`public-holiday?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All PublicHoliday  =============================
export const loadAllPublicHoliday= createAsyncThunk("PublicHoliday/loadAllPublicHoliday", async () => {
  try {
    const { data } = await axios.get(`public-holiday?query=all`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 3 ================== load Single PublicHoliday ============================
export const loadSinglePublicHoliday = createAsyncThunk(
  "PublicHoliday/loadSinglePublicHoliday",
  async (id) => {
    try {
      const { data } = await axios.get(`public-holiday/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add PublicHoliday ====================================
export const addPublicHoliday = createAsyncThunk("PublicHoliday/addPublicHoliday", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `public-holiday`,
      data: {
        ...values,
      },
    });

    return successHandler(data, "New Public Holiday Added Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// 5 ================== update PublicHoliday ================================
export const updatePublicHoliday = createAsyncThunk(
  "PublicHoliday/updatePublicHoliday",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `public-holiday/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Public Holiday Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);


// 6 ================== delete Public holiday  ===============================
export const deletePublicHoliday = createAsyncThunk("PublicHoliday/deletePublicHoliday", async ({id,status}) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `public-holiday/${id}`,
      data: {
        status: status ? status : "false",
      },
    });

    return successHandler(data, `Public Holiday Delete Successfully`);
  } catch (error) {
    return errorHandler(error, true);
  }
});

const publicHolidaySlice = createSlice({
  name: "PublicHoliday",
  initialState,
  reducers:{
    editPublicHoliday: (state, action) => {
        state.publicHoliday = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 1 ================== get PublicHoliday by paginated ==================
    builder.addCase(loadAllPublicHolidayPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllPublicHolidayPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllPublicHoliday;
      state.total = action.payload.data.totalPublicHoliday;
    });

    builder.addCase(loadAllPublicHolidayPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  PublicHoliday ==================
    builder.addCase(loadAllPublicHoliday.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllPublicHoliday.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllPublicHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  PublicHoliday ==================
    builder.addCase(loadSinglePublicHoliday.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSinglePublicHoliday.fulfilled, (state, action) => {
      state.loading = false;
      state.PublicHoliday = action.payload.data;
    });

    builder.addCase(loadSinglePublicHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add PublicHoliday ==================
    builder.addCase(addPublicHoliday.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addPublicHoliday.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addPublicHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  PublicHoliday ==================
    builder.addCase(updatePublicHoliday.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updatePublicHoliday.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updatePublicHoliday.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

   
  },
});

export default publicHolidaySlice.reducer;
export const {editPublicHoliday}= publicHolidaySlice.actions
