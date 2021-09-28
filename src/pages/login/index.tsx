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
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
// import ErrorText from '../../components/error_text';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/userSlice';
import { useSelector } from '../../app/store';
import { isFireSelector } from '../../selector/auth';
import { Authenticate, SignInWithSocialMedia as SocialMediaPopup } from '../../modules/auth';
import { AuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import logging from '../../app/logging';
import { auth, provider } from '../../app/firebase';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    google: {
        padding: 10,
        marginTop: 40,
        marginBottom: 40,
        color: 'white',
        backgroundColor: '#db4a39'
    }
}));

const LoginPage: React.FunctionComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const fireSelector = useSelector(isFireSelector);

    // const errorSelect = useSelector(errorSelector);
    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };
    const dispatch = useDispatch();

    const signInWithSocialMedia = (provider: AuthProvider) => {
        if (error !== '') setError('');
        setAuthenticating(true);
        SocialMediaPopup(provider)
            .then(async (result) => {
                logging.info(result);

                const user = result.user;
                if (user) {
                    const uid = user.uid;
                    const name = user.displayName;
                    const email = user.email;

                    if (name) {
                        try {
                            const fire_token = await user.getIdToken();

                            /**if we get a token, auth with the backup */

                            Authenticate(uid, name, email, fire_token, (error, _user) => {
                                if (error) {
                                    setError(error);
                                    setAuthenticating(false);
                                } else if (_user) {
                                    dispatch(login({ user: _user, fire_token: fire_token }));

                                    history.push('/countries');
                                }
                            });
                        } catch (error) {
                            setError('Invalid token.');
                            logging.error(error);
                            setAuthenticating(false);
                        }
                    } else {
                        /**
                         * We can set these manually with a new form
                         * For example, the Twitter provider sometimes
                         * does not provide a username as some users sign
                         * up with a phone number.  Here you could ask
                         * them to provide a name that would be displayed
                         * on this website.
                         * */
                        setError('The identify provider is missing a display name.');
                        setAuthenticating(false);
                    }
                } else {
                    setError('The social media provider does not have enough information. Please try a different provider.');
                    setAuthenticating(false);
                }
            })
            .catch((error) => {
                logging.error(error);
                setAuthenticating(false);
                setError(error.message);
            });
    };

    const signInWithEmailPassword = () => {
        if (error !== '') setError('');

        setAuthenticating(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                logging.info(result);
                const user = result.user;
                if (user) {
                    const uid = user.uid;
                    const name = user.displayName;
                    const email = user.email;
                    const verify = user.emailVerified;
                    if (verify === true) {
                        if (name) {
                            try {
                                const fire_token = await user.getIdToken();

                                /**if we get a token, auth with the backup */

                                Authenticate(uid, name, email, fire_token, (error, _user) => {
                                    if (error) {
                                        setError(error);
                                        setSnackBarOpen(true);
                                        setAuthenticating(false);
                                    } else if (_user) {
                                        dispatch(login({ user: _user, fire_token: fire_token }));
                                        history.push('/');
                                    }
                                });
                            } catch (error) {
                                setError('Invalid token.');
                                setSnackBarOpen(true);
                                logging.error(error);
                                setAuthenticating(false);
                            }
                        }
                        setAuthenticating(false);
                    } else {
                        setError('Please verify your email address');
                        setAuthenticating(false);
                        setSnackBarOpen(true);
                    }
                } else {
                    setError('Oops!!! Something went wrong please try again');
                    setAuthenticating(false);
                    setSnackBarOpen(true);
                }
            })
            .catch((error) => {
                logging.error(error);
                setAuthenticating(false);
                setSnackBarOpen(true);
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid email, please try again!');
                } else if (error.code === 'auth/user-not-found') {
                    setError('User does not exist, please try again!');
                } else if (error.code === 'auth/invalid-password') {
                    setError('Incorrect password, please try again!');
                } else if (error.code === 'auth/wrong-password') {
                    setError('Incorrect password, please try again!');
                }
            });
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
                <Alert onClose={handleCloseSnack} severity="warning">
                    {error}
                </Alert>
            </Snackbar>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Button onClick={() => signInWithSocialMedia(provider)} fullWidth variant="contained" className={classes.google} disabled={authenticating}>
                    Sign In Google
                </Button>
                <hr style={{ width: 200, color: 'white' }} />
                <form
                    className={classes.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        signInWithEmailPassword();
                    }}
                >
                    <TextField
                        onChange={(event) => setEmail(event.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        error={error ? true : false}
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />

                    <TextField
                        variant="outlined"
                        onChange={(event) => setPassword(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        error={error ? true : false}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/* <div>
                        <ErrorText error={error} />
                    </div> */}

                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                    <Button disabled={authenticating} type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link onClick={() => setSnackBarOpen(true)} variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={() => history.push('/register')} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};
export default LoginPage;
