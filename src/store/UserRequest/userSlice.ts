import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user_request',
    initialState: {
        user_requests: <any[] | null>null || [],
        user_uniques: <any[] | null>null || [],
        flag: false
    },
    reducers: {
        setUserRequest: (state, action) => {
            state.user_requests = action.payload.user_requests;
        },
        setUserUnique: (state, action) => {
            state.user_uniques = action.payload.user_uniques;
        },
        refreshUserRequest: (state) => {
            state.flag = !state.flag
        },
    }
});

export const { setUserRequest, refreshUserRequest, setUserUnique } = userSlice.actions;