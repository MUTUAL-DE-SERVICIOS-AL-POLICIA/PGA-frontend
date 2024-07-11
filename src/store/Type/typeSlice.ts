import { createSlice } from "@reduxjs/toolkit";

export const typeSlice = createSlice({
    name: 'type',
    initialState: {
        types: [],
    },
    reducers: {
        setTypes: (state, action) => {
            state.types = action.payload.types
        },
        clearTypes: (state) => { 
            state.types = [] 
        }
    }
});

export const {setTypes, clearTypes} = typeSlice.actions;