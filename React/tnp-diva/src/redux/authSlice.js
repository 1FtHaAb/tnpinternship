import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("username");

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      if (userData.password !== "123456") {
        throw new Error("Invalid Password");
      }
      localStorage.setItem("username", userData.username);
      return userData.username;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  username: storedUser || "",
  isLoggedIn: storedUser ? true : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = "";
      state.isLoggedIn = false;

      localStorage.removeItem("username");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.username = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;