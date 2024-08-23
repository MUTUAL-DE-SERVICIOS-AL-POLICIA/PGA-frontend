import { createSlice } from "@reduxjs/toolkit";

export const report_kardexSlice = createSlice({
    name: 'report_kardex',
    initialState: {
        report_kardexs: <any[] | null>null || [],
        report_ValuedPhys: <any[] | null>null || [],
        flag: false,
    },
    reducers: {
        setReportKardex: (state, action) => {
            state.report_kardexs = action.payload.report_kardexs;
        },
        setReportValued: (state, action) => {
            state.report_ValuedPhys = action.payload.report_ValuedPhys;
        },
        refreshReportKardex: (state) => {
            state.flag = !state.flag
        },
    }
});

export const { setReportKardex, refreshReportKardex, setReportValued } = report_kardexSlice.actions;