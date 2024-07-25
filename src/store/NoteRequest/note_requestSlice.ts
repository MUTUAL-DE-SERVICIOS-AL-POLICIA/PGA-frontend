import { createSlice } from "@reduxjs/toolkit";
import { NoteRequestModel } from "../../models/NoteRequestModel";

export const note_requestSLice = createSlice({
    name: 'note_request',
    initialState: {
        note_requests: <NoteRequestModel[] | null>null || [],
        flag: false
    },
    reducers: {
        setNoteRequest: (state, action) => {
            state.note_requests = action.payload.note_requests;
        },
        refreshNoteRequest: (state) => {
            state.flag = !state.flag
        },
    }
});

export const { setNoteRequest, refreshNoteRequest } = note_requestSLice.actions;