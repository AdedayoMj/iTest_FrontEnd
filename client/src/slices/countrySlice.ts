import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICountry, ICountryState } from '../interface/country';

const initialState = {
    list: [],
    error: null,
    status: 'idle'
} as ICountryState;

interface countCountry {
    countries: ICountry[];
}

export const fetchCountries = createAsyncThunk<ICountry[], countCountry>('getAllCountries', async (req, thunkAPI) => {
    try {
        const countries = req.countries;
        const data: ICountry[] = countries;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error });
    }
});

export const countrySlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        // ...
    },

    // In `extraReducers` we declare
    // all the actions:
    extraReducers: (builder) => {
        // When we send a request,
        // `fetchCountries.pending` is being fired:
        builder.addCase(fetchCountries.pending, (state) => {
            // At that moment,
            // we change status to `loading`
            // and clear all the previous errors:
            state.status = 'loading';
            state.error = null;
        });

        // When a server responses with the data,
        // `fetchCountries.fulfilled` is fired:
        builder.addCase(fetchCountries.fulfilled, (state, { payload }) => {
            // We add all the new todos into the state
            // and change `status` back to `idle`:
            state.list.push(...payload);
            state.status = 'idle';
        });

        // When a server responses with an error:
        builder.addCase(fetchCountries.rejected, (state) => {
            // We show the error message
            // and change `status` back to `idle` again.
            // if (payload) state.error = payload.message;
            state.status = 'idle';
        });
    }
});
