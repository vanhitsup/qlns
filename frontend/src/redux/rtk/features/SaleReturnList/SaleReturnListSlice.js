import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  total: null,
  error: "",
  loading: false,
  returnSale:null,
};

// ============ loadAllSale Return =================
export const loadAllSaleReturn = createAsyncThunk(
  "sale/saleReturnList",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`return-sale-invoice?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
//============= loadSingle sale return ===============
export const loadSingleSaleReturn = createAsyncThunk(
  "sale/singleSaleReturn",
  async (id) => {
    try {
      const { data } = await axios.get(`return-sale-invoice/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addReturnSale = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `return-sale-invoice/`,
      data: {
        ...values,
      },
    });
     return successHandler(data);
    } catch (error) {
      return errorHandler(error , true);
    }
}
  

const SaleReturnListSlice = createSlice({
  name: "SaleReturnSlice",
  initialState,
  reducers: {
    clearSaleReturn:(state)=>{
      state.returnSale = null;
    },
    clearSaleReturnList:(state)=>{
      state.list = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllSaleReturn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadAllSaleReturn.fulfilled, (state, action) => {
      state.loading = false;
      state.total = action.payload?.data?.aggregations._count;
      state.list = action.payload?.data?.allSaleInvoice;
    });
    builder.addCase(loadAllSaleReturn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    });

    //============get single sale return =========================
    builder.addCase(loadSingleSaleReturn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadSingleSaleReturn.fulfilled, (state, action) => {
      state.loading = false;
      state.returnSale = action.payload?.data;
    });
    builder.addCase(loadSingleSaleReturn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message;
    })
  }
});

export default SaleReturnListSlice.reducer;
export const {clearSaleReturnList , clearSaleReturn} = SaleReturnListSlice.actions;
