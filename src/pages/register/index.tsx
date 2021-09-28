import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, useHistory } from 'react-router-dom';
import logging from '../../app/logging';
import { CreateAccount } from '../../modules/auth';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from '@firebase/auth';
import { auth } from '../../app/firebase';
import { useSelector } from 'react-redux';
import { errorSelector, isFireSelector } from '../../selector/auth';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// import { login } from '../../slices/userSlice';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// import { register } from '../../slices/userSlice';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://imak-tech.netlify.app/">
                iMak-Tech
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const RegisterPage: React.FunctionComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const fireSelector = useSelector(isFireSelector);
    const [registering, setRegistering] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    // const dispatch = useDispatch();

    const errorSelect = useSelector(errorSelector);
    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };
    const signUpWithEmailAndPassword = () => {
        if (error !== '') setError('');
        setRegistering(true);
        if (password === confirm) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (result) => {
                    const auth = getAuth();
                    logging.info(result);
                    sendEmailVerification(result.user);
                    const user = result.user;
                    const displayUsername = name;
                    if (user) {
                        updateProfile(result.user, {
                            displayName: displayUsername
                        });
                        const uid = user.uid;
                        const name = displayUsername;
                        const email = user.email;
                        if (name) {
                            try {
                                const fire_token = await user.getIdToken();

                                /**if we get a token, auth with the backup */

                                CreateAccount(uid, name, email, fire_token, (error, _user) => {
                                    if (error) {
                                        setSnackBarOpen(true);
                                        setError(error);
                                        setRegistering(false);
                                    } else if (_user) {
                                        // dispatch(login({ user: _user, fire_token: fire_token }));
                                        logging.info(_user);

                                        history.push('/');
                                    }
                                });
                            } catch (error) {
                                setSnackBarOpen(true);
                                setError('Invalid token.');
                                logging.error(error);
                                setRegistering(false);
                            }
                        } else {
                            setSnackBarOpen(true);
                            setError('Something went wrong, try again later');
                            setRegistering(false);
                        }
                    } else {
                        setSnackBarOpen(true);
                        setError('Oops!!! Something went wrong please try again');
                        setRegistering(false);
                    }
                    auth.signOut();
                })
                .catch((error) => {
                    logging.error(error);
                    if (error.code === 'auth/invalid-email') {
                        setSnackBarOpen(true);
                        setError('Invalid email, please try again!');
                    } else if (error.code.includes('auth/weak-password')) {
                        setSnackBarOpen(true);
                        setError('Please enter a stronger password.');
                    } else if (error.code.includes('auth/email-already-in-use')) {
                        setSnackBarOpen(true);
                        setError('Email already in use.');
                    } else {
                        setSnackBarOpen(true);
                        setError('Unable to register.  Please try again later.');
                    }

                    setRegistering(false);
                });
        } else {
            setSnackBarOpen(true);
            setError('Password does not match');
        }
    };

    if (fireSelector) {
        return <Redirect to="/countries" />;
    }
    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        signUpWithEmailAndPassword();
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(event) => setName(event.target.value)}
                                autoComplete="fname"
                                name="displayName"
                                variant="outlined"
                                required
                                fullWidth
                                id="displayName"
                                label="Username"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                error={errorSelect?.message === undefined ? false : true}
                                onChange={(event) => setEmail(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                onChange={(event) => setPassword(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(event) => setConfirm(event.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                error={errorSelect?.message === undefined ? false : true}
                                id="confirmPassword"
                                label="Confrim Password"
                                name="confirmPassword"
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
                        </Grid>
                    </Grid>
                    <Button disabled={registering} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => history.push('/')} href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
};
export default RegisterPage;
