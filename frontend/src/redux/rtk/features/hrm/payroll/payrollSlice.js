import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {
    clearPayroll: (state) => {
      state.payslip = null;
    },
    addPayslip: (state, { payload }) => {
      state.list = payload.map((item) => ({
        ...item,
        totalPayable: item.salaryPayable + item.bonus - (item.deduction || 0),
      }));
    },

    updatePayslip: (state, { payload: { userId, value, key } }) => {
      state.list = state.list.map((item) => {
        if (item.userId === userId) {
          const updatedItem = {
            ...item,
            [key]: value,
          };
          updatedItem.totalPayable =
            (updatedItem.salaryPayable || 0) +
            (updatedItem.bonus || 0) -
            (updatedItem.deduction || 0);

          return updatedItem;
        }
        return item;
      });
    },
  },
});

export default payrollSlice.reducer;
export const { clearPayroll, updatePayslip, addPayslip } = payrollSlice.actions;
