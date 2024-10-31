import { createSlice } from "@reduxjs/toolkit";
import { NoteRequestModel } from "../../models/NoteRequestModel";

export const note_requestSLice = createSlice({
    name: 'note_request',
    initialState: {
        note_requests: <NoteRequestModel[] | null>null || [],
        note_requests_petty_cashs: <NoteRequestModel[] | null>null || [],
        flag: false
    },
    reducers: {
        setNoteRequest: (state, action) => {
            state.note_requests = action.payload.note_requests;
        },
        setNoteRequestPettyCash: (state, action) => {
            state.note_requests_petty_cashs = action.payload.note_requests_petty_cashs;
        },
        refreshNoteRequest: (state) => {
            state.flag = !state.flag
        },
    }
});

export const { setNoteRequest, refreshNoteRequest, setNoteRequestPettyCash } = note_requestSLice.actions;