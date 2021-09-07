import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import { userSlice } from '../slices/userSlice';
import { slotSlice } from '../slices/slotSLice';
import { countrySlice } from '../slices/countrySlice';
import { countryNameSlice } from '../slices/countryNameSlice';

import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
    reducer: {
        auth: userSlice.reducer,
        slot: slotSlice.reducer,
        country: countrySlice.reducer,
        countryName: countryNameSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
