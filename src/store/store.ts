import { configureStore } from '@reduxjs/toolkit';
import { authSlice, supplierSlice, classifierSlice, groupSlice, materialSlice, note_entrySlice, typeSlice, note_requestSLice } from '.';

export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        suppliers:supplierSlice.reducer,
        classifiers: classifierSlice.reducer,
        groups: groupSlice.reducer,
        materials: materialSlice.reducer,
        types: typeSlice.reducer,
        note_entries: note_entrySlice.reducer,
        note_requests: note_requestSLice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    })
})