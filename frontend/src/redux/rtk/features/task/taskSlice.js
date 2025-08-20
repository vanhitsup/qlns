import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  task: null,
  edit: null,
  error: "",
  total: null,
  loading: false,
};

// ===============ADD_task==========================
export const addSingleTask = createAsyncThunk(
  "task/addSingleTask",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `task`,
        data: values,
      });
      return successHandler(data, "Task Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// ================DELETE_task========================
export const deleteTask = createAsyncThunk(
  "task/deleteTask ",
  async ({ id, status }) => {
    try {
      const data = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `crm-task/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Task ${status === "true" ? "Show" : "Hide"} Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

//================= DELETE Many_contact==================
export const deleteManyTask = createAsyncThunk(
  "contact/deleteManyTask ",
  async (data) => {
    try {
      const data = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `task?query=deletemany`,
        data: data,
      });

      return successHandler(data, "Selected Task Delete Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

//================== task_DETAILS======================
export const loadSingleTask = createAsyncThunk(
  "task/loadSingleTask",
  async (id) => {
    try {
      const { data } = await axios.get(`crm-task/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// ==================load all task====================
export const loadAllTask = createAsyncThunk("task/loadAllTask", async () => {
  try {
    const { data } = await axios.get(`task?query=all`);
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});

// loadAllTask paginated
export const loadAllTaskPaginated = createAsyncThunk(
  "task/loadAllTaskPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`crm-task?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",

        url: `crm-task/${id}`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "Task Update Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTask: (state) => {
      state.task = null;
    },
    editTask: (state, action) => {
      state.edit = action.payload;
    },
    removeEditTask: (state) => {
      state.edit = null;
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAlltask ======

    builder.addCase(loadAllTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTask.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });

    builder.addCase(loadAllTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for loadAllTaskPaginated ======

    builder.addCase(loadAllTaskPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllTaskPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllTask;
      state.total = action.payload?.data.totalTask;
    });

    builder.addCase(loadAllTaskPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSingleTask  ======

    builder.addCase(addSingleTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSingleTask.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSingleTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingletask ======

    builder.addCase(loadSingleTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleTask.fulfilled, (state, action) => {
      state.loading = false;
      state.task = action.payload.data;
    });

    builder.addCase(loadSingleTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for task ======

    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteTask  ======

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 4) ====== builders for deleteTask  ======

    builder.addCase(deleteManyTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteManyTask.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteManyTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default taskSlice.reducer;
export const { clearTask, editTask, removeEditTask } = taskSlice.actions;
