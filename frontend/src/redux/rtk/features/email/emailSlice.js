import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  email: null,
  total: null,
  error: "",
  loading: false,
};

export const loadAllEmailPaginated = createAsyncThunk(
  "email/loadAllEmailPaginated",
  async (arg) => {
    try {
      let query = queryGenerator(arg);
      const { data } = await axios.get(`email?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllEmail = createAsyncThunk("email/loadAllEmail", async () => {
  try {
    const { data } = await axios.get(`email?query=all`);
    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});

export const loadSingleEmail = createAsyncThunk(
  "email/loadSingleEmail",
  async (id) => {
    try {
      const { data } = await axios.get(`email/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addEmail = createAsyncThunk("email/addEmail", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `email`,
      data: values,
    });

    return successHandler(data, "Email Created Successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const updateEmail = createAsyncThunk(
  "email/updateEmail",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `email/${id}`,
        data: values,
      });
      return successHandler(data, "Email Updated Successfully");
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const deleteEmail = createAsyncThunk(
  "email/deleteEmail",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `email/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Email ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteManyEmail = createAsyncThunk(
  "email/deleteManyEmail",
  async (arg) => {
    try {
      const { data } = await axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `email?query=deletemany`,
        data: arg,
      });
      return successHandler(data, "Email Deleted Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    clearEmail: (state) => {
      state.email = null;
    },
    clearEmailList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 0 ====== builders for loadAllEmail ======
    builder.addCase(loadAllEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });
    // 1) ====== builders for loadAllEmailPaginated ======
    builder.addCase(loadAllEmailPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllEmailPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllEmail;
      state.total = action.payload?.data?.totalEmail;
    });
    // 2) ====== builders for addEmail ======
    builder.addCase(addEmail.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addEmail.fulfilled, (state) => {
      state.loading = false;
    });
    // 3) ====== builders for loadSingleEmail ======
    builder.addCase(loadSingleEmail.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action?.payload?.data;
    });
    // 5) ====== builders for deleteEmail ======
    builder.addCase(deleteEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteEmail.fulfilled, (state) => {
      state.loading = false;
    });
    // 6) ====== builders for deleteManyEmail ======
    builder.addCase(deleteManyEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteManyEmail.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export default emailSlice.reducer;
export const { clearEmail, clearEmailList } = emailSlice.actions;
