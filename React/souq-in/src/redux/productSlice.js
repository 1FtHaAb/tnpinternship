import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpInstance from "../api/httpInstance";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await httpInstance.get("/products");
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch";
      });
  },
});

export default productSlice.reducer;
export const { setSearchTerm } = productSlice.actions;