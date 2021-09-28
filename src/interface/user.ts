import {} from '@reduxjs/toolkit';

export default interface IUser {
    _id: string;
    uid: string;
    displayName: string;
    email: string;
    // password: string;
}

export const DEFAULT_USER: IUser = {
    _id: '',
    uid: '',
    displayName: '',
    email: ''
    // password: ''
};

export const DEFAULT_FIRE_TOKEN = '';
