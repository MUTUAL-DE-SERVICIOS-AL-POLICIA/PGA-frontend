import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user_request',
    initialState: {
        user_requests: [] as any[],
        user_uniques: [] as any[],
        directories: [] as any[],
        flag: false
    },
    reducers: {
        setUserRequest: (state, action) => {
            state.user_requests = action.payload.user_requests;
        },
        setUserUnique: (state, action) => {
            state.user_uniques = action.payload.user_uniques;
        },
        setDirectory: (state, action) => {
            state.directories = action.payload.directories;
        },
        refreshUserRequest: (state) => {
            state.flag = !state.flag;
        },
    }
});

export const { setUserRequest, refreshUserRequest, setUserUnique, setDirectory } = userSlice.actions;
