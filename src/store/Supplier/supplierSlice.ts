import { createSlice } from "@reduxjs/toolkit";
import { SupplierModel } from "../../models";

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState:{
        suppliers: <SupplierModel[] | null>null,
        flag: false
    },
    reducers:{
        setSupplier: (state, action)=>{
            state.suppliers = action.payload.suppliers
        },
        addSupplier: (state, action)=>{
            state.suppliers = [...state.suppliers!, action.payload.supplier]
        },
        refreshSupplier: (state,/* action*/)=>{
            state.flag = !state.flag
        }
    }
});

export const { setSupplier, addSupplier, refreshSupplier } = supplierSlice.actions;