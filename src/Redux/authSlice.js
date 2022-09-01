import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useFirebase } from "../../useFirebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
  loading: true,
  error: false,
  loggedIn: false,
  authData: null,
};

// ======== Actions ===========
export const login = createAsyncThunk("auth/login", async (loginData) => {
  const { email, password } = loginData;
  try {
    const { auth } = useFirebase();
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.data;
  } catch (e) {
    throw Error(e);
  }
});

// ========== Slice ===========
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("logging out");
      const { auth } = useFirebase();
      signOut(auth);
      state.loggedIn = false;
      state.error = false;
      state.authData = null;
      state.loading = false;
    },
    resetError: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = true;
      state.error = false;
      state.authData = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.loggedIn = false;
      state.error = false;
      state.authData = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.error = true;
      state.authData = null;
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout, resetError } = authSlice.actions;

export default authSlice.reducer;
