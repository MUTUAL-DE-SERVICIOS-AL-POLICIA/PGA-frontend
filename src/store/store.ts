import { configureStore } from '@reduxjs/toolkit';
import { authSlice, supplierSlice, classifierSlice } from '.';

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        suppliers:supplierSlice.reducer,
        classifiers: classifierSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
})