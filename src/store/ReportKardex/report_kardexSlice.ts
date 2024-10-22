import { createSlice } from "@reduxjs/toolkit";

export const report_kardexSlice = createSlice({
    name: 'report_kardex',
    initialState: {
        report_kardexs: null as any[] | null,
        report_ValuedPhys: null as any[] | null,
        report_ValuedPhy_Consolids: null as any[] | null,
        managements: null as any[] | null,
        flag: false,
    },
    reducers: {
        setReportKardex: (state, action) => {
            state.report_kardexs = action.payload.report_kardexs;
        },
        setReportValued: (state, action) => {
            state.report_ValuedPhys = action.payload.report_ValuedPhys;
        },
        setReportValuedConsolid: (state, action) => {
            state.report_ValuedPhy_Consolids = action.payload.report_ValuedPhy_Consolids;
        },
        setManagement: (state, action) => {
            state.managements = action.payload.managements;
        },
        refreshReportKardex: (state) => {
            state.flag = !state.flag
        },
    }
});

export const { setReportKardex, refreshReportKardex, setReportValued, setReportValuedConsolid, setManagement } = report_kardexSlice.actions;