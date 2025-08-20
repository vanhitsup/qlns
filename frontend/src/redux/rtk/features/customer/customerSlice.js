import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "./../../../../utils/queryGenarator";
const initialState = {
  list: null,
  customer: null,
  info: null,
  total: null,
  error: "",
  loading: false,
};

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `customer`,
        data: values,
      });
      return successHandler(data, "Register Successfully Done and Sent Email");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `customer/${id}`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async ({id, status}) => {

    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `customer/${id}`,

        data: {
          status: status ? status : "false",
        },
      });
      return successHandler(
        data,
        `Customer ${status === "true" ? "show" : "hide"} Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadSingleCustomer = createAsyncThunk(
  "customer/loadSingleCustomer",
  async (id) => {
    try {
      const { data } = await axios.get(`customer/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadSingleCustomerEcom = createAsyncThunk(
  "customer/loadSingleCustomerEcom",

  async () => {
    try {
      const id = localStorage.getItem("id");
      const { data } = await axios.get(`e-commerce/profile/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllCustomer = createAsyncThunk(
  "customer/loadAllCustomer",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`customer?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadCustomerReport = createAsyncThunk(
  "customer/loadCustomerReport",
  async () => {
    try {
      const { data } = await axios.get(`customer?query=report`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addUser = createAsyncThunk("customer/addUser", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `customer/login`,
      data: {
        ...values,
      },
    });
    // localStorage.setItem("access-token", data.token);
    // localStorage.setItem("role", data.role);
    // localStorage.setItem("user", data.username);
    // localStorage.setItem("id", data.id);
    // localStorage.setItem("isLogged", true);
    return successHandler(data, "Login Successfully Done");
  } catch (error) {
    return errorHandler(error, true);
  }
});

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    clearCustomer: (state) => {
      state.customer = null;
    },
    clearCustomerList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllCustomer ======

    builder.addCase(loadAllCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllCustomer.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload?.data)) {
        state.list = action.payload?.data;
      } else {
        state.list = action.payload?.data.getAllCustomer;
        state.total = action.payload?.data.totalCustomer;
      }
    });

    builder.addCase(loadAllCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addCustomer ======

    builder.addCase(addCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleCustomer ======

    builder.addCase(loadSingleCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customer = action.payload?.data;
    });

    builder.addCase(loadSingleCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleCustomerEcom ======

    builder.addCase(loadSingleCustomerEcom.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleCustomerEcom.fulfilled, (state, action) => {
      state.loading = false;
      state.customer = action.payload?.data;
    });

    builder.addCase(loadSingleCustomerEcom.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteCustomer ======

    builder.addCase(deleteCustomer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(loadCustomerReport.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadCustomerReport.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data?.allCustomer;
      state.info = action.payload.data?.grandData;
    });

    builder.addCase(loadCustomerReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default customerSlice.reducer;
export const { clearCustomer ,clearCustomerList} = customerSlice.actions;
