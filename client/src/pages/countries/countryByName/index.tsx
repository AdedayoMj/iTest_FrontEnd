import React, { useEffect, useState } from 'react';

import { alpha, Box, Grid, makeStyles, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import InterfaceCountry from '../../../interface/country';
import CourseCard from '../../../components/card';
import SearchBar from 'material-ui-search-bar';
import { fetchCountriesByName } from '../../../slices/countryNameSlice';
import { getAllValidationByName } from '../../../modules/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountriesByName, selectNameStatus } from '../../../selector/country';
import { isFireSelector } from '../../../selector/auth';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme: Theme) => ({
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.type === 'dark' ? alpha(theme.palette.common.white, 0.15) : grey[500],
        '&:hover': {
            backgroundColor: theme.palette.type === 'dark' ? alpha(theme.palette.common.white, 0.25) : grey[700]
        },
        marginLeft: 0,

        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 500
        }
    },
    marginGird: {
        marginTop: 20
    }
}));

const CountryByNamePage: React.FunctionComponent = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [searchCountry, setSearch] = useState('');
    const [alertOpen, setAlertOpen] = useState('info');
    const [error, setError] = useState<string>('');

    const countrySelector = useSelector(getAllCountriesByName);
    const loadStatus = useSelector(selectNameStatus);
    const fireSelector = useSelector(isFireSelector);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (value: React.SetStateAction<string>) => {
        // if (value === '') {
        //     hadleCancel();
        // }
        setSearch(value);
    };

    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
        history.push('/');
    };
    const getCountries = async () => {
        if (fireSelector) {
            setLoading(true);
            try {
                if (searchCountry !== '') {
                    await getAllValidationByName(fireSelector, searchCountry, (error, countries) => {
                        if (error) {
                            console.log(error);

                            setTimeout(() => {
                                setLoading(false);
                            }, 500);
                            return error;
                        } else if (countries) {
                            setTimeout(() => {
                                setLoading(false);
                            }, 500);

                            dispatch(fetchCountriesByName({ countries: countries } as unknown as InterfaceCountry));
                            setLoading(false);
                        }
                    });
                } else {
                    setAlertOpen('warning');
                    setSnackBarOpen(true);
                    console.log('Search field is required');
                }
            } catch (error) {
                setError(`Unable to retrieve blog`);
            }
        } else {
            setAlertOpen('info');
            setSnackBarOpen(true);
        }
    };

    return (
        <Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
            >
                {alertOpen !== 'info' ? (
                    <Alert onClose={handleCloseSnack} severity="warning">
                        Search field required
                    </Alert>
                ) : (
                    <Alert onClose={handleCloseSnack} severity="info">
                        Please proceed to login
                    </Alert>
                )}
            </Snackbar>
            <SearchBar
                onChange={(value) => handleChange(value)}
                onRequestSearch={() => getCountries()}
                style={{
                    margin: '0 auto',
                    maxWidth: 800
                }}
                className={classes.search}
                // onCancelSearch={() => hadleCancel()}
            />
            {loadStatus === 'idle' ? (
                <Grid container className={classes.marginGird} spacing={2}>
                    {countrySelector.map((country, index) => {
                        return <CourseCard key={index} arrayData={country} loading={loading} />;
                    })}
                </Grid>
            ) : (
                <Box>Search forcountries</Box>
            )}
        </Box>
    );
};

export default CountryByNamePage;
