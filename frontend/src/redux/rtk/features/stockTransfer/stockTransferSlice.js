import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  stockTransfer: null,
  error: "",
  loading: false,
  edit: false,
  total: 0,
};

// ADD_VAT_TAX
export const addStockTransfer = createAsyncThunk(
  "stockTransfer/addStockTransfer",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `stock-transfer`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "StockTransfer Created Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const updateStockTransfer = createAsyncThunk(
  "stockTransfer/UpdateStockTransfer",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `stock-transfer/${id}`,
        data: values,
      });
      dispatch(
        loadAllStockTransferPaginated({ status: true, page: 1, count: 10 })
      );
      return successHandler(data, "Stock Transfer Update Success");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const updateTransferStatus = createAsyncThunk(
  "stockTransfer/updateTransferStatus",
  async (values) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `stock-transfer`,
        data: values,
      });
      return successHandler(data, "Stock Transfer Status Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const deleteStockTransfer = createAsyncThunk(
  "stockTransfer/DeleteStockTransfer",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `stock-transfer/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Vat/Tax ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// VAT_TAZ_DETAILS
export const loadSingleStockTransfer = createAsyncThunk(
  "stockTransfer/loadSingleStockTransfer",
  async (id) => {
    try {
      const { data } = await axios.get(`stock-transfer/${id}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

// Load all VAT_TAX
export const loadAllStockTransfer = createAsyncThunk(
  "stockTransfer/loadAllStockTransfer",
  async () => {
    try {
      const { data } = await axios.get(`stock-transfer?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
//Load All VAT_TAX for Paginated
export const loadAllStockTransferPaginated = createAsyncThunk(
  "stockTransfer/loadAllStockTransferPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg, false);
      const { data } = await axios.get(`stock-transfer?${query}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

const stockTransferSlice = createSlice({
  name: "stockTransfer",
  initialState,
  reducers: {
    editStockTransfer: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearStockTransfer: (state) => {
      state.stockTransfer = null;
    },
    clearStockTransferList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllStockTransfer ======

    builder.addCase(loadAllStockTransfer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllStockTransfer.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllStockTransfer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllStockTransferPaginated ======

    builder.addCase(loadAllStockTransferPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      loadAllStockTransferPaginated.fulfilled,
      (state, action) => {
        state.loading = false;
        state.list = action.payload?.data?.getAllStockTransfer;
        state.total = action.payload?.data?.totalStockTransfer;
      }
    );

    builder.addCase(loadAllStockTransferPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addStockTransfer ======

    builder.addCase(addStockTransfer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addStockTransfer.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addStockTransfer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 3) ===== builders for update Vat Tax ===========
    builder.addCase(updateStockTransfer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateStockTransfer.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateStockTransfer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 4) ====== builders for loadSingleStockTransfer ======

    builder.addCase(loadSingleStockTransfer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleStockTransfer.fulfilled, (state, action) => {
      state.loading = false;
      state.stockTransfer = action?.payload?.data;
    });

    builder.addCase(loadSingleStockTransfer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for deleteStockTransfer ======

    builder.addCase(deleteStockTransfer.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteStockTransfer.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export default stockTransferSlice.reducer;
export const { clearStockTransfer, editStockTransfer, clearStockTransferList } =
  stockTransferSlice.actions;
