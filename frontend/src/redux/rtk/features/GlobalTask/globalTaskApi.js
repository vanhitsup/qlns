import { apiSlice } from "@/redux/rtk/features/apiSlice/apiSlice";
import { toastHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (id) => ({
        url: `task/${id}`,
      }),
      providesTags: ["Task"],
    }),
    getTasks: builder.query({
      query: (arg) => {
        const query = queryGenerator(arg);
        return {
          url: `task?${query}`,
        };
      },
      providesTags: ["Tasks"],
    }),

    addProjectTask: builder.mutation({
      query: (values) => ({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `task`,
        body: values,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          toastHandler("ProjectTask added successfully", "success");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Tasks"],
    }),

    deleteProjectTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
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
        // pessimistic user cache update
        try {
          await queryFulfilled;
          toastHandler("Deleted ProjectTask successful", "warning");
        } catch (err) {
          toastHandler("Something went wrong, Please try again", "warning");
        }
      },
      invalidatesTags: ["Task", "Tasks"],
    }),
  }),
});

export const {
  useGetTaskQuery,
  useGetTasksQuery,
  useAddProjectTaskMutation,
  useDeleteProjectTaskMutation,
} = taskApi;
