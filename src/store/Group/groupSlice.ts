import { createSlice } from "@reduxjs/toolkit";
import { GroupModel } from "../../models";

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groups: <GroupModel[] | null>null,
        allGroups: [],
        allgroupsWithMaterial:[],
        flag: false
    },
    reducers: {
        setGroup: (state, action) => {
            state.groups = action.payload.groups
        },
        setAllGroup: (state, action) => {
            state.allGroups = action.payload.allGroups
        },
        setGroupMaterial:(state, action)=> {
            state.allgroupsWithMaterial = action.payload.allgroupsWithMaterial
        }
    }
});

export const { setGroup,setGroupMaterial, setAllGroup } = groupSlice.actions;