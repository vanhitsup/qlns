import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { errorHandler, successHandler } from "../../../../utils/functions";

const initialState = {
  list: null,
  total: null,
  error: "",
  info:null,
  loading: false,
  edit:false
};

// 1 .======================= loadALLDimensionUnit ==========================
export const loadALLDimensionUnit = createAsyncThunk(
  "payment/loadALLDimensionUnit",
  async (arg) => {
    try {
      const { data } = await axios.get(`/dimension-unit`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

// 2 .======================= AddDimensionUnit ==========================
export const addDimensionUnit = createAsyncThunk(
  "payment/AddDimensionUnit",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `dimension-unit`,
        data: values,
      });

      return successHandler(data, "Dimension Unit Added Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// 3 .======================= updateDimensionUnit ==========================
export const updateDimensionUnit = createAsyncThunk(
  "payment/updateDimensionUnit",
  async ({id,values}) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `dimension-unit/${id}`,
        data: values,
      });

      return successHandler(data, "Dimension Unit Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
// 4 .======================= deleteDimensionUnit ==========================
export const deleteDimensionUnit = createAsyncThunk(
  "payment/deleteDimensionUnit",
  async ({id, status}) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `dimension-unit/${id}`,
         data: {
                status: status ? status : "false",
        },
      });
      return successHandler(data, `Dimension Unit deleted successfully`);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const DimensionUnitSlice = createSlice({
  name: "DimensionUnit",
    initialState,
   reducers: {
    editDimensionUnit: (state, action) => {
      if (action.payload) {
        state.edit = action.payload;
      } else {
        state.edit = false;
      }
    },
    clearDimensionUnitList: (state, action) => {
      state.list = [];
    }
  },
  extraReducers: (builder) => {
    // 1 .======================= loadALLDimensionUnit ==========================
    builder.addCase(loadALLDimensionUnit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadALLDimensionUnit.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data
    });

    builder.addCase(loadALLDimensionUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

   
    // 2 .======================= AddDimensionUnit ==========================
    builder.addCase(addDimensionUnit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addDimensionUnit.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addDimensionUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 .======================= updateManualPayment ==========================
    builder.addCase(updateDimensionUnit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateDimensionUnit.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateDimensionUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 .======================= deleteManualPayment ==========================
    builder.addCase(deleteDimensionUnit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteDimensionUnit.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteDimensionUnit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
   
  },
});

export default DimensionUnitSlice.reducer;
export const { editDimensionUnit ,clearDimensionUnitList} = DimensionUnitSlice.actions;
