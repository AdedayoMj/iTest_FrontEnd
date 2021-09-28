import { createSelector } from 'reselect';
import { RootState } from '../app/store';
import { SlotState } from '../slices/slotSLice';

//extract states of slot machine wins using selector

export const slotSelector: (state: RootState) => SlotState = (state: RootState) => state.slot;

export const totalTally = createSelector(slotSelector, (slot) => {
    return slot.total;
});
