import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";
import queryGenerator from "../../../../utils/queryGenarator";

const initialState = {
  list: null,
  sale: null,
  total: null,
  error: "",
  loading: false,
  info: null,
  singleCommission:null,
};

export const addSale = createAsyncThunk("sale/addSale", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `sale-invoice/`,
      data: {
        ...values,
      },
    });

    const respData = {
      ...data.createdInvoice,
      customer: data.customer,
    };

    return successHandler(respData, "New product sold");
  } catch (error) {
    return errorHandler(error, true);
  }
});
export const paymentSaleCommission = createAsyncThunk("sale/paymentSaleCommission", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `payment-sale-commission`,
      data: {
        ...values,
      },
    });


    return successHandler(data, "Commission payment successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

// Ecomerce Add Order

export const addEcomOrder = createAsyncThunk(
  "sale/addEcomOrder",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `e-commerce/orders/create-order`,
        data: {
          ...values,
        },
      });

      const respData = {
        newData: {
          ...data.createdInvoice,
          customer: data.customer,
        },
        createdInvoiceId: data.createdInvoice.id,
        message: "success",
      };

      return respData;
    } catch (error) {
      return {
        message: "error",
      };
    }
  }
);

export const deleteSale = createAsyncThunk("sale/deleteSale", async (id) => {
  try {
    const { data } = await axios({
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `sale-invoice/${id}`,
      data: {
        status: "false",
      },
    });

    return successHandler(data, "Sale deleted");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const loadSingleSale = createAsyncThunk(
  "sale/loadSingleSale",
  async (id) => {
    try {
      const { data } = await axios.get(`sale-invoice/${id}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const loadAllSale = createAsyncThunk("sale/loadAllSale", async (arg) => {
  try {
    const query = queryGenerator(arg);
    const { data } = await axios.get(`sale-invoice?${query}`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});

// Load all ecom orders

export const loadAllEcomOrders = createAsyncThunk(
  "sale/loadAllEcomOrders",
  async () => {
    // fetching id from local storage
    const id = localStorage.getItem("id");
    try {
      const { data } = await axios.get(`e-commerce/orders/order-details/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);
// send invoice by Email
export const sendSaleInvoice = createAsyncThunk(
  "sale/sendSaleInvoice",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `email-invoice?type=saleinvoice`,
        data: values,
      });

      const respData = {
        ...data.createdInvoice,
        customer: data.customer,
      };

      return successHandler(respData, "Send Invoice Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadAllSaleReport = createAsyncThunk("sale/loadAllSaleReport",
  async (arg) => {
  try {
    const query = queryGenerator(arg, false);
    const { data } = await axios.get(`sale-invoice?${query}`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});


export const loadAllSalesCommission = createAsyncThunk("sale/loadAllSalesCommission",
  async (arg) => {
  try {
    const query = queryGenerator(arg);
    const { data } = await axios.get(`sale-commission?${query}`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});
export const loadSingleSalesCommission = createAsyncThunk("sale/loadSingleSalesCommission",
  async (arg) => {
  try {
    const { data } = await axios.get(`/sale-commission/user/${arg}`);

    return successHandler(data);
  } catch (error) {
    return errorHandler(error);
  }
});

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    clearSale: (state) => {
      state.sale = null;
    },
    clearSaleList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllSale ======

    builder.addCase(loadAllSale.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllSale.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data?.getAllSaleInvoice;
      state.total = action.payload?.data?.aggregations;
    });

    builder.addCase(loadAllSale.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for ecomorders ======

    builder.addCase(loadAllEcomOrders.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllEcomOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
      state.total = action.payload?.data?.aggregations;
    });

    builder.addCase(loadAllEcomOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addSale ======

    builder.addCase(addSale.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addSale.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addSale.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 2) ====== builders for commission payment ======

    builder.addCase(paymentSaleCommission.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(paymentSaleCommission.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(paymentSaleCommission.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    //  ====== builders for addEcomOrder ======

    builder.addCase(addEcomOrder.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addEcomOrder.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.list)) {
        state.list = [];
      }
      const list = [...state.list];
      list.push(action.payload.newData);
      state.list = list;
    });

    builder.addCase(addEcomOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for loadSingleSale ======

    builder.addCase(loadSingleSale.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleSale.fulfilled, (state, action) => {
      state.loading = false;
      state.sale = action.payload?.data;
    });

    builder.addCase(loadSingleSale.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 3) ====== builders for load All Sales Commission ======

    builder.addCase(loadAllSalesCommission.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllSalesCommission.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data;
    });

    builder.addCase(loadAllSalesCommission.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 3) ====== builders for load Single Sales Commission ======

    builder.addCase(loadSingleSalesCommission.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleSalesCommission.fulfilled, (state, action) => {
      state.loading = false;
      state.singleCommission = action.payload?.data;
    });

    builder.addCase(loadSingleSalesCommission.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for deleteSale ======

    builder.addCase(deleteSale.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteSale.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteSale.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // 4) ====== builders for sale Report ======

    builder.addCase(loadAllSaleReport.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllSaleReport.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data?.getAllSaleInvoice;
      state.info = action.payload.data?.aggregations?.sum;
    });

    builder.addCase(loadAllSaleReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default saleSlice.reducer;
export const { clearSale ,clearSaleList} = saleSlice.actions;
