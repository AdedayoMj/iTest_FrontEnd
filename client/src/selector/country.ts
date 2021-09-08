import { RootState } from '../app/store';

//extract states of api cpountry infomation using selector

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectStatus = (state: RootState) => state.country.status;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllCountries = (state: RootState) => state.country.list;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllCountriesByName = (state: RootState) => state.countryName.list;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const selectNameStatus = (state: RootState) => state.countryName.status;
