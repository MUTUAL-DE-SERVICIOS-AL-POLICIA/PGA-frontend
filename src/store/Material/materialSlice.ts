import { createSlice } from "@reduxjs/toolkit";
import { MaterialModel } from "../../models";

export const materialSlice = createSlice({
    name: 'material',
    initialState: {
        materials: <MaterialModel[] | null>null || [],
        leakedMaterials: [],
        flag: false
    },
    reducers: {
        setMaterial: (state, action) => {
            state.materials = action.payload.materials;
        },
        refreshMaterial: (state) => {
            state.flag = !state.flag
        },
        setLeakedMaterials: (state, action) => {
            state.leakedMaterials = action.payload.materials;
        },
        setClearLeakedMaterials: (state) => {
            state.leakedMaterials = [];
        },
        clearMaterials: (state) => {
            state.materials = null || []
            state.leakedMaterials = []
        }
    }
});

export const { setMaterial, refreshMaterial,
    //leakedMaterials
    setLeakedMaterials, setClearLeakedMaterials, clearMaterials } = materialSlice.actions;