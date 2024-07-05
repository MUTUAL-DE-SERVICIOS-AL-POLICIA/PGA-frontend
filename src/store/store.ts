import { configureStore } from '@reduxjs/toolkit';
import { authSlice, supplierSlice, classifierSlice, groupSlice, materialSlice } from '.';

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        suppliers:supplierSlice.reducer,
        classifiers: classifierSlice.reducer,
        groups: groupSlice.reducer,
        materials: materialSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
})