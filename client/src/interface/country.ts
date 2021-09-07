interface IData {
    name: string;
    currencies?: [
        {
            code: string;
        }
    ];
    timezones?: string;

    flag?: string;
    capital?: string;
    population?: number;
    region?: string;
}

export default interface InterfaceCountry {
    countries: IData[];
}
export type ICountry = {
    name: string;
    currencies?: [
        {
            code: string;
        }
    ];
    timezones?: string;

    flag?: string;
    capital?: string;
    population?: number;
    region?: string;
};
export type ICountryState = {
    // In `status` we will watch
    // if todos are being loaded.
    status: 'loading' | 'idle';

    // `error` will contain an error message.
    error: string | null;
    list: ICountry[];
};
