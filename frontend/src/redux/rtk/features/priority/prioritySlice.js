import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  priority: null,
  total: null,
  error: "",
  loading: false,
  edit: null,
};

export const loadAllPriorityPaginated = createAsyncThunk(
  "taskPriority/loadAllPriorityPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`priority?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const loadAllPriority = createAsyncThunk(
  "taskPriority/loadAllPriority",
  async () => {
    try {
      const { data } = await axios.get(`priority?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const loadSinglePriority = createAsyncThunk(
  "taskPriority/loadSinglePriority",
  async (id) => {
    try {
      const { data } = await axios.get(`priority/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const addPriority = createAsyncThunk(
  "taskPriority/addPriority",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `priority`,
        data: values,
      });

      return successHandler(data, "Priority Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  },
);

export const updatePriority = createAsyncThunk(
  "taskPriority/updatePriority",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `priority/${id}`,
        data: values,
      });
      return successHandler(data, "Priority Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  },
);

export const deletePriority = createAsyncThunk(
  "taskPriority/deletePriority",
  async (id) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `priority/${id}`,
      });

      return successHandler(data, `Priority Deleted Successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  },
);

export const deleteManyPriority = createAsyncThunk(
  "taskPriority/deleteManyPriority",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `priority?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Priorities Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  },
);

const prioritySlice = createSlice({
  name: "priority",
  initialState,
  reducers: {
    clearPriority: (state) => {
      state.taskPriority = null;
    },
    clearPriorityList: (state) => {
      state.list = [];
    },
    editPriority: (state, action) => {
      state.edit = action.payload;
    },
    clearPriorityEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllPriorityPaginated ======
    builder.addCase(loadAllPriorityPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllPriorityPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllPriority;
      state.total = action.payload?.data?.totalPriority;
    });
    // 2) ====== builders for addPriority ======
    builder.addCase(addPriority.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addPriority.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSinglePriority ======
    builder.addCase(loadSinglePriority.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSinglePriority.fulfilled, (state, action) => {
      state.loading = false;
      state.taskPriority = action?.payload?.data;
    });
    // 4) ====== builders for updatePriority ======
    builder.addCase(updatePriority.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePriority.fulfilled, (state) => {
      state.loading = false;
    });
    // 5) ====== builders for deletePriority ======
    builder.addCase(deletePriority.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePriority.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyPriority ======
    builder.addCase(deleteManyPriority.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyPriority.fulfilled, (state) => {
      state.loading = false;
    });
    // 7) ====== builders for loadAllPriority ======
    builder.addCase(loadAllPriority.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllPriority.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
  },
});

export default prioritySlice.reducer;
export const {
  clearPriority,
  clearPriorityList,
  editPriority,
  clearPriorityEdit,
} = prioritySlice.actions;
