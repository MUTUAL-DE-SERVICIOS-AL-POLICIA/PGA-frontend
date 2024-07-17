import { createSlice } from "@reduxjs/toolkit";
import { MaterialModel } from "../../models";

export const materialSlice = createSlice({
    name: 'material',
    initialState: {
        materials: <MaterialModel[] | null>null || [],
        leakedMaterials: [],
        flag: false,
        materialview: []
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
        },
        setMater: (state, action) => {
            state.materialview = action.payload.material;
        }
    }
});

export const { setMaterial, refreshMaterial, setMater,
    //leakedMaterials
    setLeakedMaterials, setClearLeakedMaterials, clearMaterials } = materialSlice.actions;