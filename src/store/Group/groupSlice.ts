import { createSlice } from "@reduxjs/toolkit";
import { GroupModel } from "../../models";

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groups: <GroupModel[] | null>null,
        flag: false
    },
    reducers: {
        setGroup: (state, action) => {
            state.groups = action.payload.groups
        }
    }
});

export const { setGroup } = groupSlice.actions;