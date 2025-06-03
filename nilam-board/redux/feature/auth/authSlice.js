
import authServices from "@/service/authService";
import notifications from "@/utils/notification-toast/Notification";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const accessToken = Cookies.get("accessToken");
const refreshToken = Cookies.get("refreshToken");

const initialState = {
  authenticated: accessToken ? true : false,
  message: "",
  loading: false,
  error: "",
  success: "",
  accessToken: accessToken ? accessToken : null,
  userInfo: null,
};

export const login = createAsyncThunk("auth/login", async (loginCredential) => {
  const response = await authServices.login(loginCredential);
  let userInfo, authenticated, accessToken, message;
  if (response?.status === 200) {
    authenticated = true;
    accessToken = response?.data?.data?.accessToken;
    message = response?.data?.message;
    notifications.success(message, "top-right");
    Cookies.set("accessToken", accessToken);
  } else {
    notifications.error(response, "top-right");
  }
  return { userInfo, authenticated, accessToken, message };
});

export const logout = createAsyncThunk("auth/logout", async (userId) => {
  const response = await authServices.logout(userId);
  let userInfo, authenticated, message;
  console.log("logout", response);
  if (response?.status === 200) {
    message = response?.data?.message;
    authenticated = false;
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    notifications.success(message, "top-right");
  }
  return { authenticated };
});

export const getUserProfile = createAsyncThunk("auth/getUser", async () => {
  const response = await authServices.getUserProfile();
  console.log("response", response);
  let userInfo;
  if (response?.status === 200) {
    userInfo = response?.data?.data;
  }
  return { userInfo };
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("action", action);
        state.message = action.payload.message;
        state.loading = false;
        state.error = "";
        state.userInfo = action.payload.userInfo;
        state.authenticated = action.payload.authenticated;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.message = "Faild";
        state.error = action.error.message;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        console.log("action", action);
        state.loading = false;
        state.error = "";
        state.userInfo = action.payload.userInfo;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.message = "Faild";
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.authenticated = action.payload.authenticated;
        state.userInfo = null;
        state.accessToken = "";
        state.refreshToken = "";
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.message = "Faild";
        state.error = action.error.message;
      });
  },
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
