import { createSlice } from "@reduxjs/toolkit";

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState:{
        suppliers: null,
        flag: false
    },
    reducers:{
        setSupplier: (state, action)=>{
            state.suppliers = action.payload.suppliers
        }
    }
});

export const { setSupplier } = supplierSlice.actions;