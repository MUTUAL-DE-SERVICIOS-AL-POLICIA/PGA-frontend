import { createSlice } from "@reduxjs/toolkit";

export const note_entrySlice = createSlice({
    name: 'note_entry',
    initialState: {
        note_entries: <any>[],
        shoppingCart: <any>[],
        flag: false
    },
    reducers:{
        setShoppingCart: (state, action) => {
            state.shoppingCart = action.payload.shoppingCart;
        },
        setNoteEntry : (state, action)=>{
            state.note_entries = action.payload.note_entries;
        }
    }
});

export const {setShoppingCart, setNoteEntry} = note_entrySlice.actions;