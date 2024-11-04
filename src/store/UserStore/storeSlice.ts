import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
    name: 'user_store',
    initialState: {
        user_stores: [] as any[],
        flag: false
    },
    reducers: {
        setUserStore: (state, action) => {
            state.user_stores = action.payload.user_stores;
        },
        refreshUserStore: (state) => {
            state.flag = !state.flag;
        },
    }
});

export const { setUserStore, refreshUserStore } = storeSlice.actions;
