import { createSlice } from "@reduxjs/toolkit";

export const report_kardexSlice = createSlice({
    name: 'report_kardex',
    initialState: {
        report_kardexs: <any[] | null>null || [],
        flag: false,
    },
    reducers: {
        setReportKardex: (state, action) => {
            state.report_kardexs = action.payload.report_kardexs;
        },
        refreshReportKardex: (state) => {
            state.flag = !state.flag
        },
    }
});


export const { setReportKardex, refreshReportKardex } = report_kardexSlice.actions;