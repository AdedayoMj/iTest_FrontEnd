import config from '../app/config';
import axios from 'axios';
import logging from '../app/logging';
import IUser from '../interface/user';
import { auth } from '../app/firebase';
import { AuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import ICountry from '../interface/country';

//promise function to trigger firebase google popup

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SignInWithSocialMedia = (provider: AuthProvider) =>
    new Promise<UserCredential>((resolve, reject) => {
        signInWithPopup(auth, provider)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
    });

//function to authenticate the user login using fire_token provided by firebase
//callbacks will throw an error if not authenticated or send a json file of the user's record
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Authenticate = async (uid: string, name: string, email: string | null, fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${config.server.url}/users/login`,
            data: {
                uid,
                name,
                email
            },
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 201 || response.status === 304) {
            logging.info('Successfully authenticated.');
            callback(null, response.data.user);
        } else {
            logging.warn('Unable to authenticate.');
            callback('Unable to authenticate.', null);
        }
    } catch (error) {
        logging.error(error);
        callback('Unable to authenticate.', null);
    }
};

//function to register user the firebase token provided by firebase against backend server
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const CreateAccount = async (uid: string, name: string, email: string | null, fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${config.server.url}/users/register`,
            data: {
                uid,
                name,
                email
            },
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 201 || response.status === 304) {
            logging.info('Successfully authenticated.');
            callback(null, response.data.user);
        } else {
            logging.warn('Unable to authenticate.');
            callback('Unable to authenticate.', null);
        }
    } catch (error) {
        logging.error(error);
        callback('Unable to authenticate.', null);
    }
};
//function to validate the firebase token provided by firebase against backend server
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Validate = async (fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${config.server.url}/users/validate`,
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 304) {
            logging.info('Successfully validated.');
            callback(null, response.data.user);
        } else {
            logging.warn(response);
            callback('Unable to validate.', null);
        }
    } catch (error) {
        logging.error(error);
        callback('Unable to validate.', null);
    }
};
//function to validate and get all countries data with the firebase token provided by firebase against backend server
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllValidation = async (fire_token: string | null | undefined, callback: (error: string | null, countries: ICountry | null) => void) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${config.server.url}/countries`,
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 304) {
            logging.info('Successfully validated.');
            callback(null, response.data.countries);
        } else {
            logging.warn(response);
            callback('Unable to validate.', null);
        }
    } catch (error) {
        logging.error(error);
        callback('Unable to validate.', null);
    }
};

//function to validate and get specific countries data using query with
//the firebase token provided by firebase against backend server
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllValidationByName = async (fire_token: string | null | undefined, searchCountry: string, callback: (error: string | null, countries: ICountry | null) => void) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${config.server.url}/countries/country/${searchCountry}`,
            headers: { Authorization: `Bearer ${fire_token}` }
        });

        if (response.status === 200 || response.status === 304) {
            logging.info('Successfully validated.');
            callback(null, response.data.countries);
        } else {
            logging.warn(response);
            callback('Unable to validate.', null);
        }
    } catch (error) {
        logging.error(error);
        callback('Unable to validate.', null);
    }
};
