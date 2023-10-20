import { configureStore } from '@reduxjs/toolkit';

import { translateSlice } from './slices/translateSlice';

export default configureStore({
  reducer: {

    translateState: translateSlice.reducer,
  },
});