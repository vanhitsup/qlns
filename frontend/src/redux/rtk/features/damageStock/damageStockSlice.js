import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  damageStock: null,
  error: "",
  loading: false,
  edit: false,
  statement: null,
  total: 0,
};

// ADD_VAT_TAX
export const addDamageStock = createAsyncThunk(
  "damageStock/addDamageStock",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `damage-stock/`,
        data: {
          ...values,
        },
      });
      return successHandler(data, "Damage Stock Added");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// UPDATE_VAT_TAZ
export const updateDamageStock = createAsyncThunk(
  "damageStock/UpdateDamageStock",
  async ({ id, values }, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `damage-stock/${id}`,
        data: values,
      });
      dispatch(
        loadAllDamageStockPaginated({ status: true, page: 1, count: 10 })
      );
      return successHandler(data, "DamageStock Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// DELETE_VAT_TAZ
export const deleteDamageStock = createAsyncThunk(
  "damageStock/DeleteDamageStock",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `damage-stock/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Damage Stock ${
          status === "true" ? "is activate" : "deleted"
        } successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// VAT_TAZ_DETAILS
export const loadSingleDamageStock = createAsyncThunk(
  "damageStock/loadSingleDamageStock",
  async (id) => {
    try {
      const { data } = await axios.get(`damage-stock/${id}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

// Load all VAT_TAX
export const loadAllDamageStock = createAsyncThunk(
  "damageStock/loadAllDamageStock",
  async () => {
    try {
      const { data } = await axios.get(`damage-stock?query=all`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
//Load All VAT_TAX for Paginated
export const loadAllDamageStockPaginated = createAsyncThunk(
  "damageStock/loadAllDamageStockPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`damage-stock?${query}`);
      return successHandler(data);
    } catch (error) {
      errorHandler(error);
    }
  }
);

const damageStockSlice = createSlice({
  name: "damageStock",
  initialState,
  reducers: {
    editDamageStock: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearDamageStock: (state) => {
      state.damageStock = null;
    },
    clearDamageStockList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllDamageStock ======

    builder.addCase(loadAllDamageStock.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllDamageStock.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllDamageStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 1) ====== builders for loadAllDamageStockPaginated ======

    builder.addCase(loadAllDamageStockPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllDamageStockPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllDamageStock;
      state.total = action.payload?.data?.totalDamageStock;
    });

    builder.addCase(loadAllDamageStockPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addDamageStock ======

    builder.addCase(addDamageStock.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addDamageStock.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addDamageStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 3) ===== builders for update Vat Tax ===========
    builder.addCase(updateDamageStock.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateDamageStock.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateDamageStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    // 4) ====== builders for loadSingleDamageStock ======

    builder.addCase(loadSingleDamageStock.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleDamageStock.fulfilled, (state, action) => {
      state.loading = false;
      state.damageStock = action?.payload?.data;
    });

    builder.addCase(loadSingleDamageStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6) ====== builders for deleteDamageStock ======

    builder.addCase(deleteDamageStock.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteDamageStock.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteDamageStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });
  },
});

export default damageStockSlice.reducer;
export const { clearDamageStock, editDamageStock, clearDamageStockList } =
  damageStockSlice.actions;
