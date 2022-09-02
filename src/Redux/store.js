import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import followReducer from "./followSlice";
import followSlice from "./followSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    follow: followSlice,
  },
});
