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
        }
    }
});

export const {setShoppingCart} = note_entrySlice.actions;