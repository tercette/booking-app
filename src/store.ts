// src/store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState, saveState } from './utils/localStorage';

export interface Booking {
  id: string;
  name: string
  startDate: string;
  endDate: string;
}

const initialState: Booking[] = loadState() || [];

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.push(action.payload);
      saveState(state);
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      return state.filter((booking) => booking.id !== action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const { id, name, startDate, endDate } = action.payload;
      const index = state.findIndex((booking) => booking.id === id);
      if (index !== -1) {
        state[index] = { id, name, startDate, endDate };
        saveState(state);
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

// Adiciona um listener para salvar o estado no localStorage sempre que houver mudanças
store.subscribe(() => {
  saveState(store.getState().bookings);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
