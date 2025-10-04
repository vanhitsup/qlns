import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  errorHandler,
  nameRender,
  successHandler,
} from "../../../../../utils/functions";
import queryGenerator from "../../../../../utils/queryGenarator";

const initialState = {
  list: null,
  user: null,
  error: null,
  loading: false,
  total: 0,
};

export const addStaff = createAsyncThunk("user/addStaff", async (values) => {
  console.log(values);
  try {
    // Check if there are any file uploads (including arrays and nested objects)
    const containsFile = (val) => {
      if (!val) return false;
      if (val instanceof File || (typeof File !== 'undefined' && val instanceof Blob)) return true;
      if (Array.isArray(val)) return val.some(containsFile);
      if (typeof val === 'object') return Object.values(val).some(containsFile);
      return false;
    };

    const hasFiles = containsFile(values);

    let requestData;
    let headers;

    if (hasFiles) {
      // Use FormData for file uploads
      const formData = new FormData();
      
      // Flatten nested objects and arrays and append to FormData using PHP-style keys
      const flattenObject = (obj, prefix = '') => {
        Object.keys(obj || {}).forEach((key) => {
          const value = obj[key];
          const newKey = prefix ? `${prefix}[${key}]` : key;

          if (value === undefined || value === null) return;

          if (value instanceof File || (typeof File !== 'undefined' && value instanceof Blob)) {
            formData.append(newKey, value);
          } else if (Array.isArray(value)) {
            value.forEach((v) => {
              if (v instanceof File || (typeof File !== 'undefined' && v instanceof Blob)) {
                formData.append(`${newKey}[]`, v);
              } else if (typeof v === 'object' && v !== null) {
                // For array of objects
                flattenObject(v, `${newKey}[]`);
              } else {
                formData.append(`${newKey}[]`, v);
              }
            });
          } else if (typeof value === 'object') {
            flattenObject(value, newKey);
          } else {
            formData.append(newKey, value);
          }
        });
      };
      
      flattenObject(values);
      requestData = formData;
      headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      };
    } else {
      // Use JSON for non-file data
      requestData = { ...values };
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      };
    }

    const { data } = await axios({
      method: "post",
      headers,
      url: `user/register`,
      data: requestData,
    });

    return successHandler(data, "Staff Added successfully");
  } catch (error) {
    return errorHandler(error, true);
  }
});

export const updateStaff = createAsyncThunk(
  "user/updateStaff",
  async ({ id, values }) => {
    try {
      // Detect if payload contains any File/Blob to switch to multipart
      const containsFile = (val) => {
        if (!val) return false;
        if (typeof File !== 'undefined' && (val instanceof File || val instanceof Blob)) return true;
        if (Array.isArray(val)) return val.some(containsFile);
        if (typeof val === 'object') return Object.values(val).some(containsFile);
        return false;
      };

      const hasFiles = containsFile(values);

      let requestData;
      let headers;

      if (hasFiles) {
        const formData = new FormData();

        const flattenObject = (obj, prefix = '') => {
          Object.keys(obj || {}).forEach((key) => {
            const value = obj[key];
            const newKey = prefix ? `${prefix}[${key}]` : key;

            if (value === undefined || value === null) return;

            if (typeof File !== 'undefined' && (value instanceof File || value instanceof Blob)) {
              formData.append(newKey, value);
            } else if (Array.isArray(value)) {
              value.forEach((v) => {
                if (typeof File !== 'undefined' && (v instanceof File || v instanceof Blob)) {
                  formData.append(`${newKey}[]`, v);
                } else if (typeof v === 'object' && v !== null) {
                  flattenObject(v, `${newKey}[]`);
                } else {
                  formData.append(`${newKey}[]`, v);
                }
              });
            } else if (typeof value === 'object') {
              flattenObject(value, newKey);
            } else {
              formData.append(newKey, value);
            }
          });
        };

        flattenObject(values);
        requestData = formData;
        headers = {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        };
      } else {
        requestData = { ...values };
        headers = {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        };
      }

      const { data } = await axios({
        method: "put",
        headers,
        url: `user/${id}`,
        data: requestData,
      });

      return successHandler(data, "Staff updated successfully");
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);
export const deleteStaff = createAsyncThunk(
  "user/deleteStaff",
  async ({ id, status }) => {
    try {
      // Normalize boolean-like to backend values if needed
      const mapStatus = (s) => {
        if (s === 'true') return 'inactive';
        if (s === 'false') return 'active';
        return s;
      };
      const { data } = await axios({
        method: "patch",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        url: `user/${id}`,
        data: {
          status: status ? mapStatus(status) : "inactive",
        },
      });

      return successHandler(
        data,
        `Staff ${status === "true" ? "is activate" : "deleted"} successfully`
      );
    } catch (error) {
      return errorHandler(error, true);
    }
  }
);

export const loadSingleStaff = createAsyncThunk(
  "user/loadSingleStaff",
  async (id) => {
    try {
      const { data } = await axios.get(`user/${id}`);
      return {
        data,
        message: "success",
      };
    } catch (error) {
      return errorHandler(error, false);
    }
  }
);

export const loadAllStaff = createAsyncThunk(
  "user/loadAllStaff",
  async (arg) => {
    try {
      const query = queryGenerator(arg, false);
      const { data } = await axios.get(`user?${query}`);
      return successHandler(data);
    } catch (error) {
      return errorHandler(error);
    }
  }
);

export const addUser = createAsyncThunk("user/addUser", async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/login`,
      data: values,
    });

    localStorage.setItem("access-token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("roleId", data.roleId);
    localStorage.setItem("user", nameRender(data));
    localStorage.setItem("id", data.id);
    localStorage.setItem("isLogged", true);

    return successHandler(data, "Login Successfully Done");
  } catch (error) {
    return errorHandler(error, true);
  }
});
export const logOut = createAsyncThunk("user/addUser", async () => {
  try {
    const id = Number(localStorage.getItem("id"));
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `user/logout`,
      data: { id },
    });
    localStorage.clear();
    window.location.href = "/admin/auth/login";
    return successHandler(data, "LogOut Successfully Done");
  } catch (error) {
    return errorHandler(error, true);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    clearUserList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    // 1) ====== builders for loadAllStaff ======

    builder.addCase(loadAllStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadAllStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload?.data.getAllUser;
      state.total = action.payload?.data.totalUser;
    });

    builder.addCase(loadAllStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 2) ====== builders for addStaff ======

    builder.addCase(addStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addStaff.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 3) ====== builders for addUser ======

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;

      if (!Array.isArray(state.user)) {
        state.user = [];
      }
      const user = [...state.user];
      user.push(action.payload?.data);
      state.user = user;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 4) ====== builders for loadSingleStaff ======

    builder.addCase(loadSingleStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loadSingleStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });

    builder.addCase(loadSingleStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // 5) ====== builders for deleteStaff ======

    builder.addCase(deleteStaff.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteStaff.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default userSlice.reducer;
export const { clearUser, clearUserList } = userSlice.actions;
