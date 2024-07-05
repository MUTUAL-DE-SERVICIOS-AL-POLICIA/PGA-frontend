import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        user: {},
    },
    reducers: {
        onLogin: (state, { payload }) => {
            
            state.status = 'authenticated';
            state.user = payload;
            //console.log(state.status)
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.user = {};
        },
    }
});

export const { onLogin, onLogout } = authSlice.actions;