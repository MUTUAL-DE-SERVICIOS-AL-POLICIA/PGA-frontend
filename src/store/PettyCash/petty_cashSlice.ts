import { createSlice } from "@reduxjs/toolkit";

export const petty_cashSlice = createSlice({
    name: 'petty_cash',
    initialState: {
        petty_cashes: null as any[] | null,
        products: null as any[] | null,
        flag: false,
    },
    reducers: {
        setPettyCash: (state, action) => {
            state.petty_cashes = action.payload.petty_cashes;
        },
        setProduct: (state, action) => {
            state.products = action.payload.products;
        },
        refreshPettyCash: (state) => {
            state.flag = !state.flag
        },
    },
});

export const { setPettyCash, setProduct, refreshPettyCash } = petty_cashSlice.actions;