import { configureStore } from '@reduxjs/toolkit';
import orphanagesReducer from './orphanagesSlice';

const store = configureStore({
  reducer: {
    orphanages: orphanagesReducer,
  },
});

export default store;
