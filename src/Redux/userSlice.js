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
  loading: true,
  error: false,
  userData: null,
  posts: [],
};

// ======== Actions ===========

/* Get the user data */
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const { auth, db } = useFirebase();
    const response = await getDoc(doc(db, "users", auth.currentUser.uid));
    return response.data();
  } catch (e) {
    throw Error(e);
  }
});

/* Get the user's posts */
export const fetchUserPosts = createAsyncThunk(
  "user/fetchUserPosts",
  async () => {
    try {
      const { auth, db } = useFirebase();
      const q = query(
        collection(db, "posts", auth.currentUser.uid, "userPosts")
      );
      let docList = [];
      const querySnapshot = await getDocs(q, orderBy("creationDate", "desc"));
      querySnapshot.forEach((doc) => {
        const newDoc = { id: doc.id, data: doc.data() };
        docList = [...docList, newDoc];
      });
      return docList;
    } catch (e) {
      console.log(e);
    }
  }
);

// ========== Slice ===========
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.userData = action.payload;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
      state.error = false;
      state.userData = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = null;
    });
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchUserPosts.pending, (state, action) => {
      state.loading = true;
      state.error = false;
      state.posts = [];
    });
    builder.addCase(fetchUserPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.posts = [];
    });
  },
});

// Action creators are generated for each case reducer function
// export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
