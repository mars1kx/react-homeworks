import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMealsApi } from '../../__mocks__/api';
import { MealsState, Meal } from '../types';

const initialState: MealsState = {
  meals: [],
  loading: false,
  error: null,
};

export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async (_, { rejectWithValue }) => {
    try {
      const { url } = getMealsApi();
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data as Meal[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default mealsSlice.reducer; 