// src/store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  startDate: string;
  endDate: string;
}

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: [] as Booking[],
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.push(action.payload);
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      return state.filter((booking) => booking.id !== action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const { id, startDate, endDate } = action.payload;
      const index = state.findIndex((booking) => booking.id === id);
      if (index !== -1) {
        state[index] = { id, startDate, endDate };
      }
    },
  },
});

export const { addBooking, deleteBooking, updateBooking } = bookingsSlice.actions;

const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
