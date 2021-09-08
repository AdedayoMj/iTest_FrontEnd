import { signOut } from '@firebase/auth';
import IUser, { DEFAULT_FIRE_TOKEN, DEFAULT_USER } from '../interface/user';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';

import { auth } from '../app/firebase';

export interface AuthState {
    user: IUser | null;
    authenticated?: boolean;
    fire_token?: string | null;
    error?: SerializedError;
    loading?: boolean;
}

const initialState: AuthState = {
    user: DEFAULT_USER,
    fire_token: DEFAULT_FIRE_TOKEN,
    authenticated: undefined,
    error: undefined,
    loading: false
};

interface PayLoad {
    user: IUser;
    fire_token: string;
}

//dispatch login function to access api using google popup
export const login = createAsyncThunk<AuthState, PayLoad>('login', async (req, thunkAPI) => {
    try {
        localStorage.setItem(req.fire_token, 'fire_token');
        const user = req.user;
        const fire_token = req.fire_token;
        return { user, fire_token } as PayLoad;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error });
    }
});

//logout function
export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
    try {
        await signOut(auth)
            .then(() => {
                localStorage.removeItem('fire_token');
                return initialState;
            })
            .catch((error) => {
                return thunkAPI.rejectWithValue({ error: error });
                // An error happened.
            });
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error });
    }
});

export const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.fire_token = action.payload.fire_token;
            state.authenticated = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(logout.fulfilled, (state) => {
            localStorage.removeItem('fire_token');
            state.authenticated = false;
            state.user = initialState.user;
            state.fire_token = initialState.fire_token;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.error = action.error;
        });
    }
});
