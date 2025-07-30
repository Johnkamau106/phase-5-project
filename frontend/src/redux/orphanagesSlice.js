import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchOrphanages = createAsyncThunk(
  'orphanages/fetchOrphanages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orphanages');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data || 'Error fetching orphanages');
    }
  }
);

const orphanagesSlice = createSlice({
  name: 'orphanages',
  initialState: {
    orphanages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrphanages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrphanages.fulfilled, (state, action) => {
        state.loading = false;
        state.orphanages = action.payload;
      })
      .addCase(fetchOrphanages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrphanages = (state) => state.orphanages.orphanages;

export default orphanagesSlice.reducer;
