import { createAction, createSlice } from '@reduxjs/toolkit';

export interface SlotState {
    total: number;
}
//initial state
const initialState: SlotState = {
    total: 20
};

//dispatch function for increment and decrement of coins
export const addWins = createAction<number>('addWins');
export const removeWins = createAction<number>('removeWins');
export const resetSlot = createAction('resetSlot');

export const slotSlice = createSlice({
    name: 'slotMachine',
    initialState,
    reducers: {},
    // "builder callback API", for incremental and decrease coins
    extraReducers: (builder) => {
        builder.addCase(addWins, (state, action) => {
            state.total += action.payload;
        });
        builder.addCase(removeWins, (state, action) => {
            state.total -= action.payload;
        });
        builder.addCase(resetSlot, (state) => {
            state.total = initialState.total;
        });
    }
});
