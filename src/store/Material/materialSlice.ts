import { createSlice } from "@reduxjs/toolkit";
import { MaterialModel } from "../../models";

export const materialSlice = createSlice({
    name: 'material',
    initialState: {
        materials: <MaterialModel[] | null>null,
        flag: false
    },
    reducers: {
        setMaterial: (state, action) => {
            state.materials = action.payload.materials;
        },
        refreshMaterial: (state) => {
            state.flag = !state.flag
        }
    }
});

export const { setMaterial, refreshMaterial } = materialSlice.actions;