import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useFirebase } from "../../useFirebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  orderBy,
  query,
} from "firebase/firestore";

const initialState = {
  following: [],
  loading: false,
  error: false,
};

// ======== Actions ===========

/* Follow a user */
export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId) => {}
);

/* UnFollow a user */
export const unFollowUser = createAsyncThunk(
  "follow/followUser",
  async (userId) => {}
);

/* Check if we are following a user */
export const isFollowed = createAsyncThunk(
  "follow/followUser",
  async (userId) => {}
);

// ========== Slice ===========
export const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(followUser.fulfilled, (state, action) => {
      state.following = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.following = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.following = [];
      state.loading = false;
      state.error = true;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { fetchUser } = userSlice.actions;

export default followSlice.reducer;
