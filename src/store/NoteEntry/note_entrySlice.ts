import { createSlice } from "@reduxjs/toolkit";
import { NoteEntryModel } from "../../models";

export const note_entrySlice = createSlice({
    name: 'note_entry',
    initialState: {
        note_entries: <NoteEntryModel[] | null>null || [],
        note_entrie_revisions: <NoteEntryModel[] | null>null || [],
        shoppingCart: <any>[],
        flag: false
    },
    reducers: {
        setShoppingCart: (state, action) => {
            state.shoppingCart = action.payload.shoppingCart;
        },
        setNoteEntry: (state, action) => {
            state.note_entries = action.payload.note_entries;
        },
        setNoteEntryRevision: (state, action) => {
            state.note_entrie_revisions = action.payload.note_entrie_revisions;
        },
        refreshNoteEntry: (state) => {
            state.flag = !state.flag
        },
    }
});

export const { setShoppingCart, setNoteEntry, refreshNoteEntry, setNoteEntryRevision } = note_entrySlice.actions;