import { errorHandler, successHandler } from "@/utils/functions";
import queryGenerator from "@/utils/queryGenarator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: null,
  announcement: null,
  total: null,
  error: "",
  loading: false,
};

// 1 ================== get All Announcement by paginated  ==================
export const loadAllAnnouncementPaginated = createAsyncThunk(
  "announcement/loadAllAnnouncementPaginated",
  async (arg) => {
    try {
      const query = queryGenerator(arg);
      const { data } = await axios.get(`announcement?${query}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 2 ================== load All Announcement  =============================
export const loadAllAnnouncement = createAsyncThunk(
  "announcement/loadAllAnnouncement",
  async () => {
    try {
      const { data } = await axios.get(`announcement?query=all`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 3 ================== load Single Announcement ============================
export const loadSingleAnnouncement = createAsyncThunk(
  "announcement/loadSingleAnnouncement",
  async (id) => {
    try {
      const { data } = await axios.get(`announcement/${id}`);

      return successHandler(data);
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 4 ================== Add Announcement ====================================
export const addAnnouncement = createAsyncThunk(
  "Announcement/addAnnouncement",
  async (values) => {
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `announcement`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "New Announcement Added Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 5 ================== update Announcement ================================
export const updateAnnouncement = createAsyncThunk(
  "Announcement/updateAnnouncement",
  async ({ id, values }) => {
    try {
      const { data } = await axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `announcement/${id}`,
        data: {
          ...values,
        },
      });

      return successHandler(data, "Announcement Updated Successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

// 6 ================== delete Announcement ===============================
export const deleteAnnouncement = createAsyncThunk(
  "Announcement/deleteAnnouncement",
  async ({ id, status }) => {
    try {
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `announcement/${id}`,
        data: {
          status: status ? status : "false",
        },
      });

      return successHandler(
        data,
        `Announcement ${status === "true" ? "show" : "hide"} Successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  extraReducers: (builder) => {
    // 1 ================== get Announcement by paginated ==================
    builder.addCase(loadAllAnnouncementPaginated.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAnnouncementPaginated.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data.getAllAnnouncement;
      state.total = action.payload.data.totalAnnouncement;
    });

    builder.addCase(loadAllAnnouncementPaginated.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2 ================== get all  Announcement ==================
    builder.addCase(loadAllAnnouncement.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
    });

    builder.addCase(loadAllAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3 ================== get single  Announcement ==================
    builder.addCase(loadSingleAnnouncement.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      state.announcement = action.payload.data;
    });

    builder.addCase(loadSingleAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4 ================== add Announcement ==================
    builder.addCase(addAnnouncement.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5 ================== update  Announcement ==================
    builder.addCase(updateAnnouncement.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 6 ================== delete Announcement ==================
    builder.addCase(deleteAnnouncement.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default announcementSlice.reducer;
