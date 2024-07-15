import { createSlice } from "@reduxjs/toolkit";
import { NoteEntryModel } from "../../models";

export const note_entrySlice = createSlice({
    name: 'note_entry',
    initialState: {
        note_entries: <NoteEntryModel[] | null>null || [],
        shoppingCart: <any>[],
        flag: false
    },
    reducers:{
        setShoppingCart: (state, action) => {
            state.shoppingCart = action.payload.shoppingCart;
        },
        setNoteEntry : (state, action)=>{
            state.note_entries = action.payload.note_entries;
        },
        refreshNoteEntry: (state) => {
            state.flag = !state.flag
        },
    }
});

export const {setShoppingCart, setNoteEntry, refreshNoteEntry} = note_entrySlice.actions;