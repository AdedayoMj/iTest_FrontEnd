import React, { useState } from 'react';

import { alpha, Box, Button, Grid, makeStyles, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import InterfaceCountry from '../../../interface/country';
import CourseCard from '../../../components/card';
import SearchBar from 'material-ui-search-bar';
import { fetchCountries, resetFetchCountries } from '../../../slices/countrySlice';

import { useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import { getAllCountries } from '../../../selector/country';
import { isFireSelector } from '../../../selector/auth';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import config from '../../../app/config';
import logging from '../../../app/logging';
import ErrorText from '../../../components/error_text';

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

const AllCountriesPage: React.FunctionComponent = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(10);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch();

    const countryPreSelect = useSelector(getAllCountries);
    const countrySelector = search === '' ? countryPreSelect : countryPreSelect.filter((country) => country.name.includes(search));
    const fireSelector = useSelector(isFireSelector);
    const history = useHistory();

    const handleLoadCountries = () => {
        if (fireSelector) {
            setLoading(true);
            getCountries();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            handleOpenSnackbar();
        }
    };
    const handleOpenSnackbar = () => {
        setSnackBarOpen(true);
    };
    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
        history.push('/');
    };

    const handleChange = (value: React.SetStateAction<string>) => {
        setSearch(value);
    };
    const getCountries = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}/countries`,
                headers: { Authorization: `Bearer ${fireSelector}` }
            });
            dispatch(resetFetchCountries());

            if (response.status === 200 || response.status === 304) {
                logging.info('Successfully validated.');
                const { countries } = response.data;
                const countryData = countries.splice(0, limit);

                dispatch(fetchCountries({ countries: countryData } as unknown as InterfaceCountry));
            } else {
                logging.warn(response);
                setError('Unable to validate.');
            }
        } catch (error) {
            setError(`Unable to retrieve countries`);
        }
    };
    const handleLimitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLimit(event.target.value as number);
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
                <Alert onClose={handleCloseSnack} severity="info">
                    Please login to proceed, to gain access
                </Alert>
            </Snackbar>
            <SearchBar
                onChange={(value) => handleChange(value)}
                // onRequestSearch={() => hadleOpenSearch()}
                style={{
                    margin: '0 auto',
                    maxWidth: 800
                }}
                className={classes.search}
            />
            <ErrorText error={error} />
            <Button onClick={handleLoadCountries}>Load All Country</Button>{' '}
            <Select native value={limit} onChange={handleLimitChange} label="Age">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={40}>40</option>
                <option value={80}>80</option>
                <option value={130}>130</option>
                <option value={200}>200</option>
            </Select>
            <Grid container className={classes.marginGird} spacing={2}>
                {countrySelector.map((country, index) => {
                    return <CourseCard key={index} arrayData={country} loading={loading} />;
                })}
            </Grid>
        </Box>
    );
};

export default AllCountriesPage;
