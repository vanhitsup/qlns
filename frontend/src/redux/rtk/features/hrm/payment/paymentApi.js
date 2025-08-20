import { toastHandler } from "@/utils/functions";
import { apiSlice } from "../../apiSlice/apiSlice";
import { payrollApi } from "../payroll/payrollApi";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getPayments: builder.query({
    //   query: () => ({
    //     url: `assigned-task?query=all`,
    //   }),
    //   providesTags: ["Payments"],
    // }),

    // getPayment: builder.query({
    //   query: (id) => ({
    //     url: `payroll/payment/${id}`,
    //   }),
    // }),

    addPayment: builder.mutation({
      query: ({ id, values }) => ({
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `payroll/payment/${id}`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            payrollApi.endpoints.getPayslipForPaymentMonthWise.initiate()
          );
          toastHandler("Payments added successfully", "success");
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
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useAddPaymentMutation,
  // useUpdatePaymentMutation,
  // useDeletePaymentMutation,
} = paymentApi;
