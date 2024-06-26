    import { createSlice } from "@reduxjs/toolkit";
    import { ClassifierModel } from "../../models";

    export const classifierSlice = createSlice({
        name: 'classifier',
        initialState: {
            classifiers: <ClassifierModel[]  | null>null,
            flag: false
        },
        reducers: {
            setClassifier:(state, action)=>{
                state.classifiers = action.payload.classifiers
            },
            refreshClassifier:(state, /* action */)=>{
                state.flag = !state.flag
            }
        }
    });

    export const { setClassifier, refreshClassifier } = classifierSlice.actions;