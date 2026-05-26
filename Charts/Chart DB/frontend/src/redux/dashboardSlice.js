import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const resultsFromStorage = localStorage.getItem("results");

const initialState = {
  results: resultsFromStorage ? JSON.parse(resultsFromStorage) : null,
  loading: false,
  error: null,
};

export const fetchResults = createAsyncThunk(
  "dashboard/fetchResults",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/results",
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchResults.fulfilled,
        (state, action) => {
          state.loading = false;
          state.results = action.payload;

          localStorage.setItem(
            "results",
            JSON.stringify(action.payload)
          );
        }
      )
      .addCase(
        fetchResults.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default dashboardSlice.reducer;