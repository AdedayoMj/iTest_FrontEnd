import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICountry, ICountryState } from '../interface/country';

//initial state
const initialState = {
    list: [],
    error: null,
    status: 'idle'
} as ICountryState;

interface NameCountry {
    countries: ICountry[];
}
//asyncthunk dispatch function to fetch countries info from the backend server using query
export const fetchCountriesByName = createAsyncThunk<ICountry[], NameCountry>('fetchCountriesByName', async (req, thunkAPI) => {
    try {
        const countries = req.countries;
        const data: ICountry[] = countries;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error });
    }
});

export const resetCountryState = createAction('resetCountryState');

export const countryNameSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        // ...
    },

    // In `extraReducers` we declare
    // all the actions:
    extraReducers: (builder) => {
        // When we send a request,
        // `fetchCountriesByName.pending` is being fired:
        builder.addCase(fetchCountriesByName.pending, (state) => {
            // At that moment,
            // we change status to `loading`
            // and clear all the previous errors:
            state.status = 'loading';
            state.error = null;
        });

        // When a server responses with the data,
        // `fetchCountriesByName.fulfilled` is fired:
        builder.addCase(fetchCountriesByName.fulfilled, (state, { payload }) => {
            // We add all the new todos into the state
            // and change `status` back to `idle`:
            state.list.push(...payload);
            state.status = 'idle';
        });

        // When a server responses with an error:
        builder.addCase(fetchCountriesByName.rejected, (state) => {
            // We show the error message
            // and change `status` back to `idle` again.
            // if (payload) state.error = payload.message;
            state.status = 'idle';
        });
        builder.addCase(resetCountryState, (state) => {
            // We show the error message
            // and change `status` back to `idle` again.
            // if (payload) state.error = payload.message;
            state.list = initialState.list;
        });
    }
});
