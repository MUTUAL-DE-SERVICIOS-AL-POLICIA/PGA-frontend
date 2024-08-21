import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        dashboards: null,
        table_boards: <any[] | null>null || [],
        flag: false,
    },
    reducers: {
        setDashboard: (state, action) => {
            state.dashboards = action.payload.dashboards;
        },
        setTableDashboard: (state, action) => {
            state.table_boards = action.payload.table_boards;
        },
        refreshDashboard: (state) => {
            state.flag = !state.flag
        },
    }
});

export const { setDashboard, setTableDashboard, refreshDashboard } = dashboardSlice.actions;