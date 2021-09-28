import { createSelector } from 'reselect';
import { RootState } from '../app/store';
import { AuthState } from '../slices/userSlice';

//extract states of authentication using selector

export const authSelector: (state: RootState) => AuthState = (state: RootState) => state.auth;

export const userDataSelector = createSelector(authSelector, (auth) => {
    return auth.user;
});

export const isFireSelector = createSelector(authSelector, (auth) => {
    return auth.fire_token;
});

export const isUserAuthenticatedSelector = createSelector(authSelector, (auth) => {
    return auth.authenticated;
});
export const isLoading = createSelector(authSelector, (auth) => {
    return auth.loading;
});

export const errorSelector = createSelector(authSelector, (auth) => {
    return auth.error;
});
