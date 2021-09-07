import React, { useState } from 'react';

import { alpha, Box, Button, Grid, makeStyles, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import InterfaceCountry from '../../../interface/country';
import CourseCard from '../../../components/card';
import SearchBar from 'material-ui-search-bar';
import { fetchCountries } from '../../../slices/countrySlice';
import { getAllValidation } from '../../../modules/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '../../../selector/country';
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

const AllCountriesPage: React.FunctionComponent = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [openSearch, setOpenSearch] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch();
    const countrySelector = useSelector(getAllCountries);
    const fireSelector = useSelector(isFireSelector);
    const history = useHistory();

    const handleLoadCountries = () => {
        if (fireSelector) {
            setLoading(true);
            getCountries();
            setTimeout(() => {
                setLoading(false);
            }, 500);
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

    const hadleCancel = () => {
        setOpenSearch(false);
    };
    const handleChange = (value: React.SetStateAction<string>) => {
        if (value === '') {
            hadleCancel();
        }
        setSearch(value);
    };
    const getCountries = async () => {
        try {
            await getAllValidation(fireSelector, (error, countries) => {
                if (error) {
                    return error;
                } else if (countries) {
                    dispatch(fetchCountries({ countries: countries } as unknown as InterfaceCountry));
                    setLoading(false);
                }
            });
        } catch (error) {
            setError(`Unable to retrieve blog`);
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
                <Alert onClose={handleCloseSnack} severity="info">
                    Please login to proceed
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
                onCancelSearch={() => hadleCancel()}
            />
            <Button onClick={handleLoadCountries}>Load All Country</Button>
            <Grid container className={classes.marginGird} spacing={2}>
                {countrySelector.map((country, index) => {
                    return <CourseCard key={index} arrayData={country} loading={loading} />;
                })}
            </Grid>
        </Box>
    );
};

export default AllCountriesPage;
