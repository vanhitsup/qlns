import { toastHandler } from "@/utils/functions";
import { apiSlice } from "../../apiSlice/apiSlice";
import { addPayslip } from "./payrollSlice";
import queryGenerator from "@/utils/queryGenarator";

export const payrollApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayrolls: builder.query({
      query: () => ({
        url: `payroll/all`,
      }),
      providesTags: ["Payrolls"],
    }),

    getPayslips: builder.query({
      query: (arg) => {
        const query = queryGenerator(arg);
        return {
          url: `payroll?${query}`,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addPayslip(data));
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      providesTags: ["PaySlips"],
    }),

    getPayslipForPaymentMonthWise: builder.query({
      query: (arg) => {
        const query = queryGenerator(arg, false);
        return { url: `payroll/all?${query}` };
      },
      providesTags: ["PaySlipsByMonth"],
    }),

    getPayroll: builder.query({
      query: (id) => ({
        url: `payroll/${id}`,
      }),
      providesTags: ["Payroll"],
    }),

    getUserPayroll: builder.query({
      query: (id) => ({
        url: `payroll/user/${id}`,
      }),
      providesTags: ["PayrollUser"],
    }),

    addPayroll: builder.mutation({
      query: ({ values, month, year }) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `payroll?salaryMonth=${month}&salaryYear=${year}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Payroll added successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: [
        "Payrolls",
        "PaySlips",
        "PaySlipsByMonth",
        "PayrollUser",
      ],
    }),

    updatePayroll: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `payroll/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("Payroll updated successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: [
        "Payrolls",
        "Payroll",
        "PaySlips",
        "PaySlipsByMonth",
        "PayrollUser",
      ],
    }),

    deletePayroll: builder.mutation({
      query: (id) => ({
        url: `payroll/${id}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: {
          status: "false",
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          toastHandler("Deleted Payroll successful", "warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: [
        "Payrolls",
        "Payroll",
        "PaySlips",
        "PaySlipsByMonth",
        "PayrollUser",
      ],
    }),
  }),
});

export const {
  useGetPayrollsQuery,
  useGetPayslipsQuery,
  useGetPayslipForPaymentMonthWiseQuery,
  useGetPayrollQuery,
  useAddPayrollMutation,
  useUpdatePayrollMutation,
  useDeletePayrollMutation,
  useGetUserPayrollQuery,
} = payrollApi;
