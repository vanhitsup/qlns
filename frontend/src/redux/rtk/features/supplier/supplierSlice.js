import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  supplier: null,
  error: "",
  loading: false,
  info: null,
};

export const loadSuppliers = createAsyncThunk(
  "supplier/loadSuppliers",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`supplier?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addSupplier = createAsyncThunk(
  "supplier/addSupplier",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `supplier/`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "Supplier Added successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const updateSupplier = createAsyncThunk(
  "supplier/updateSupplier",
  async ({ id, values }) => {
    try {
      const data = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `supplier/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Supplier Update Success");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const deleteSupplier = createAsyncThunk(
  "supplier/deleteSupplier",
  async ({id, status}) => {

    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `supplier/${id}`,

        data: {
          status: status ? status : "false",
        },
      });
      return successHandler(
        data,
        `Supplier ${status === "true" ? "show" : "hide"} Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadSupplier = createAsyncThunk(
  "supplier/loadSupplier",
  async (id) => {
    try {
      const { data } = await axios.get(`supplier/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
export const loadSupplierReport = createAsyncThunk(
  "supplier/loadSupplierReport",
  async (id) => {
    try {
      const { data } = await axios.get(`supplier?query=report`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    clearSupplier: (state) => {
      state.supplier = null;
    },
    clearSupplierList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadSuppliers ======

    builder.addCase(loadSuppliers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSuppliers.fulfilled, (state, action) => {
      state.loading = false;
      if (Array.isArray(action.payload.data)) {
        state.list = action.payload?.data;
      } else {
        state.list = action.payload?.data?.getAllSupplier;
        state.total = action.payload?.data?.totalSupplier;
      }
    });

    builder.addCase(loadSuppliers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSupplier ======

    builder.addCase(addSupplier.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSupplier.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      if (action.payload.data) {
        const list = [...state.list];
        list.push(action?.payload?.data);
        state.list = list;
      } else {
        const list = [...state.list];
        state.list = list;
      }
    });

    builder.addCase(addSupplier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for deleteSupplier ======

    builder.addCase(deleteSupplier.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteSupplier.fulfilled, (state, action) => {
      state.loading = false;

      const filterSupplier = state.list.filter(
        (sup) => sup.id !== parseInt(action.payload.id) && sup
      );

      state.list = filterSupplier;
    });

    builder.addCase(deleteSupplier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for loadSupplier ======

    builder.addCase(loadSupplier.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSupplier.fulfilled, (state, action) => {
      state.loading = false;
      state.supplier = action?.payload?.data;
    });

    builder.addCase(loadSupplier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) builders for Update Supplier
    builder.addCase(updateSupplier.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSupplier.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateSupplier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(loadSupplierReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadSupplierReport.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data?.allSupplier;
      state.info = action.payload.data?.grandData;
    });
    builder.addCase(loadSupplierReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default supplierSlice.reducer;
export const { clearSupplier,clearSupplierList} = supplierSlice.actions;
